import "server-only";

import { createClient } from "@supabase/supabase-js";
import { validateSupabaseEnvironment } from "./supabase-config";

type SupabaseConfiguration = {
  url: string;
  serviceRoleKey: string;
} | null;

let validatedConfiguration: SupabaseConfiguration | undefined;

function getValidatedConfiguration(): SupabaseConfiguration {
  if (validatedConfiguration !== undefined) return validatedConfiguration;

  const result = validateSupabaseEnvironment(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    process.env.NODE_ENV !== "production",
  );
  if (result.sanitizedVariables.length > 0) {
    console.warn("Trimmed whitespace or stripped non-ASCII/control characters from Supabase environment variables.", {
      variables: result.sanitizedVariables,
    });
  }
  if (!result.config) {
    console.error("Supabase environment validation failed.", { issues: result.issues });
    validatedConfiguration = null;
    return validatedConfiguration;
  }

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

export function getSupabaseServiceRoleKey() {
  return getValidatedConfiguration()?.serviceRoleKey ?? null;
}

export function getSupabaseAdmin() {
  const config = getValidatedConfiguration();
  if (!config) return null;

  return createClient(config.url, config.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}
