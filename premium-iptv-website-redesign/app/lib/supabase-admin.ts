import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { validateSupabaseEnvironment } from "./supabase-config";

type SupabaseConfiguration = {
  url: string;
  serviceRoleKey: string;
} | null;

type EnvSnapshot = {
  rawUrl: string | undefined;
  rawServiceRoleKey: string | undefined;
  allowLocalHttp: boolean;
};

let cachedSnapshot: EnvSnapshot | undefined;
let validatedConfiguration: SupabaseConfiguration | undefined;
let cachedAdminClient: SupabaseClient | null | undefined;
let configurationStatus: "ready" | "missing" | "invalid" | undefined;
let configurationIssues: Array<{
  variable: "SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY";
  reason: "missing" | "invalid_format";
}> = [];

function isSnapshotCurrent(next: EnvSnapshot): boolean {
  return Boolean(
    cachedSnapshot &&
      cachedSnapshot.rawUrl === next.rawUrl &&
      cachedSnapshot.rawServiceRoleKey === next.rawServiceRoleKey &&
      cachedSnapshot.allowLocalHttp === next.allowLocalHttp,
  );
}

export function resetSupabaseAdminCache() {
  cachedSnapshot = undefined;
  validatedConfiguration = undefined;
  cachedAdminClient = undefined;
  configurationStatus = undefined;
  configurationIssues = [];
}

function getValidatedConfiguration(): SupabaseConfiguration {
  const snapshot: EnvSnapshot = {
    rawUrl: process.env.SUPABASE_URL,
    rawServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    allowLocalHttp: process.env.NODE_ENV !== "production",
  };

  if (validatedConfiguration !== undefined && isSnapshotCurrent(snapshot)) {
    return validatedConfiguration;
  }

  cachedSnapshot = snapshot;
  cachedAdminClient = undefined;

  const result = validateSupabaseEnvironment(
    snapshot.rawUrl,
    snapshot.rawServiceRoleKey,
    snapshot.allowLocalHttp,
  );
  if (result.sanitizedVariables.length > 0) {
    console.warn("Trimmed whitespace or stripped non-ASCII/control characters from Supabase environment variables.", {
      variables: result.sanitizedVariables,
    });
  }
  if (!result.config) {
    configurationIssues = result.issues;
    console.error("Supabase environment validation failed.", { issues: result.issues });
    configurationStatus = result.issues.some((issue) => issue.reason === "missing") ? "missing" : "invalid";
    validatedConfiguration = null;
    cachedAdminClient = null;
    return validatedConfiguration;
  }

  configurationStatus = "ready";
  configurationIssues = [];
  console.info("Supabase environment validated.", {
    host: new URL(result.config.url).host,
    serviceRoleKeyFormat: result.config.serviceRoleKeyFormat,
  });
  validatedConfiguration = {
    url: result.config.url,
    serviceRoleKey: result.config.serviceRoleKey,
  };
  return validatedConfiguration;
}

export function getSupabaseConfigurationStatus() {
  getValidatedConfiguration();
  return configurationStatus ?? "invalid";
}

export function getSupabaseConfigurationIssues() {
  getValidatedConfiguration();
  return configurationIssues;
}

export function getSupabaseServiceRoleKey() {
  return getValidatedConfiguration()?.serviceRoleKey ?? null;
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const config = getValidatedConfiguration();
  if (!config) return null;

  if (cachedAdminClient) {
    return cachedAdminClient;
  }

  cachedAdminClient = createClient(config.url, config.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

  return cachedAdminClient;
}
