import { afterEach, describe, expect, it, vi } from "vitest";
import { validateSupabaseEnvironment } from "../app/lib/supabase-config";
import {
  getSupabaseAdmin,
  getSupabaseConfigurationIssues,
  getSupabaseConfigurationStatus,
  resetSupabaseAdminCache,
} from "../app/lib/supabase-admin";

function buildJwt(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${body}.signature_part`;
}

describe("validateSupabaseEnvironment", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    resetSupabaseAdminCache();
  });

  it("reports missing variables when URL and key are absent", () => {
    const result = validateSupabaseEnvironment(undefined, undefined);
    expect(result.config).toBeNull();
    expect(result.issues).toEqual([
      { variable: "SUPABASE_URL", reason: "missing" },
      { variable: "SUPABASE_SERVICE_ROLE_KEY", reason: "missing" },
    ]);
  });

  it("accepts a valid HTTPS supabase.co URL and modern sb_secret_ key", () => {
    const result = validateSupabaseEnvironment(
      "https://abcdefghijklm.supabase.co/",
      "sb_secret_validKey_123-XYZ",
    );
    expect(result.issues).toEqual([]);
    expect(result.config).toEqual({
      url: "https://abcdefghijklm.supabase.co",
      serviceRoleKey: "sb_secret_validKey_123-XYZ",
      serviceRoleKeyFormat: "secret",
    });
  });

  it("accepts a legacy JWT with role=service_role and rejects anon JWTs", () => {
    const serviceJwt = buildJwt({ role: "service_role", iss: "supabase" });
    const anonJwt = buildJwt({ role: "anon", iss: "supabase" });

    const valid = validateSupabaseEnvironment("https://proj.supabase.co", serviceJwt);
    expect(valid.config?.serviceRoleKeyFormat).toBe("service_role_jwt");

    const invalid = validateSupabaseEnvironment("https://proj.supabase.co", anonJwt);
    expect(invalid.config).toBeNull();
    expect(invalid.issues).toEqual([
      { variable: "SUPABASE_SERVICE_ROLE_KEY", reason: "invalid_format" },
    ]);
  });

  it("strips invisible Unicode control/format characters and trims whitespace", () => {
    const result = validateSupabaseEnvironment(
      "  \u200Bhttps://proj.supabase.co\uFEFF  ",
      " \u200Bsb_secret_abc123\u00A0 ",
    );
    expect(result.sanitizedVariables).toEqual(["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"]);
    expect(result.config?.url).toBe("https://proj.supabase.co");
    expect(result.config?.serviceRoleKey).toBe("sb_secret_abc123");
  });

  it("rejects non-Supabase hosts, HTTP in production, and URLs with paths/queries", () => {
    expect(validateSupabaseEnvironment("https://example.com", "sb_secret_abc").config).toBeNull();
    expect(validateSupabaseEnvironment("http://proj.supabase.co", "sb_secret_abc", true).config).toBeNull();
    expect(validateSupabaseEnvironment("http://localhost:54321", "sb_secret_abc", false).config).toBeNull();
    expect(validateSupabaseEnvironment("http://localhost:54321", "sb_secret_abc", true).config?.url).toBe(
      "http://localhost:54321",
    );
    expect(
      validateSupabaseEnvironment("https://proj.supabase.co/rest/v1", "sb_secret_abc").config,
    ).toBeNull();
    expect(
      validateSupabaseEnvironment("https://proj.supabase.co?foo=bar", "sb_secret_abc").config,
    ).toBeNull();
  });

  it("caches the Supabase admin client as a singleton across calls", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SUPABASE_URL", "https://singletonproj.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "sb_secret_singleton_12345");

    const first = getSupabaseAdmin();
    const second = getSupabaseAdmin();
    expect(first).not.toBeNull();
    expect(second).toBe(first);
    expect(getSupabaseConfigurationStatus()).toBe("ready");
    expect(getSupabaseConfigurationIssues()).toEqual([]);
  });
});
