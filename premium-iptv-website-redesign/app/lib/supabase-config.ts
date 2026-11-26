type SupabaseEnvironmentVariable = "SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY";
type ServiceRoleKeyFormat = "secret" | "service_role_jwt";

type SupabaseConfig = {
  url: string;
  serviceRoleKey: string;
  serviceRoleKeyFormat: ServiceRoleKeyFormat;
};

type SupabaseEnvironmentIssue = {
  variable: SupabaseEnvironmentVariable;
  reason: "missing" | "invalid_format";
};

type SupabaseEnvironmentResult = {
  config: SupabaseConfig | null;
  sanitizedVariables: SupabaseEnvironmentVariable[];
  issues: SupabaseEnvironmentIssue[];
};

const hiddenCharacters = /[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]/gu;

function normalizeEnvironmentValue(raw: string | undefined) {
  if (raw === undefined) return { value: "", changed: false };
  const value = raw.replace(hiddenCharacters, "").trim();
  return { value, changed: value !== raw };
}

function normalizeSupabaseUrl(value: string, allowLocalHttp: boolean) {
  if (!/^[\x20-\x7E]+$/.test(value)) return null;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();
  const isLocalHost = host === "localhost" || host === "127.0.0.1" || host === "[::1]";
  const isSupabaseHost = host.endsWith(".supabase.co") && host.length > ".supabase.co".length;
  const validProtocol = url.protocol === "https:" || (allowLocalHttp && isLocalHost && url.protocol === "http:");

  if (
    (!isSupabaseHost && !isLocalHost) ||
    !validProtocol ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    (url.pathname !== "" && url.pathname !== "/") ||
    (url.port && !isLocalHost)
  ) {
    return null;
  }

  return url.origin;
}

function getServiceRoleKeyFormat(value: string): ServiceRoleKeyFormat | null {
  if (!/^[\x21-\x7E]+$/.test(value)) return null;
  if (/^sb_secret_[A-Za-z0-9_-]+$/.test(value)) return "secret";

  const segments = value.split(".");
  if (segments.length !== 3 || !segments.every((segment) => /^[A-Za-z0-9_-]+$/.test(segment))) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(segments[1], "base64url").toString("utf8")) as { role?: unknown };
    return payload.role === "service_role" ? "service_role_jwt" : null;
  } catch {
    return null;
  }
}

export function validateSupabaseEnvironment(
  rawUrl: string | undefined,
  rawServiceRoleKey: string | undefined,
  allowLocalHttp = false,
): SupabaseEnvironmentResult {
  const normalizedUrl = normalizeEnvironmentValue(rawUrl);
  const normalizedKey = normalizeEnvironmentValue(rawServiceRoleKey);
  const sanitizedVariables: SupabaseEnvironmentVariable[] = [];
  const issues: SupabaseEnvironmentIssue[] = [];

  if (normalizedUrl.changed) sanitizedVariables.push("SUPABASE_URL");
  if (normalizedKey.changed) sanitizedVariables.push("SUPABASE_SERVICE_ROLE_KEY");

  let url: string | null = null;
  if (!normalizedUrl.value) {
    issues.push({ variable: "SUPABASE_URL", reason: "missing" });
  } else {
    url = normalizeSupabaseUrl(normalizedUrl.value, allowLocalHttp);
    if (!url) issues.push({ variable: "SUPABASE_URL", reason: "invalid_format" });
  }

  let serviceRoleKeyFormat: ServiceRoleKeyFormat | null = null;
  if (!normalizedKey.value) {
    issues.push({ variable: "SUPABASE_SERVICE_ROLE_KEY", reason: "missing" });
  } else {
    serviceRoleKeyFormat = getServiceRoleKeyFormat(normalizedKey.value);
    if (!serviceRoleKeyFormat) {
      issues.push({ variable: "SUPABASE_SERVICE_ROLE_KEY", reason: "invalid_format" });
    }
  }

  if (!url || !serviceRoleKeyFormat || issues.length > 0) {
    return { config: null, sanitizedVariables, issues };
  }

  return {
    config: {
      url,
      serviceRoleKey: normalizedKey.value,
      serviceRoleKeyFormat,
    },
    sanitizedVariables,
    issues,
  };
}
