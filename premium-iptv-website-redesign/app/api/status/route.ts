import { getSupabaseAdmin } from "../../lib/supabase-admin";
import { jsonError } from "../../lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return jsonError("Status monitoring is not configured.", 503);

  const [{ data: current, error: statusError }, { data: incidents, error: incidentsError }, { data: uptime, error: uptimeError }] =
    await Promise.all([
      supabase
        .from("service_status")
        .select("status, message, updated_at, maintenance_start, maintenance_end")
        .eq("id", 1)
        .maybeSingle(),
      supabase
        .from("service_incidents")
        .select("id, title, impact, status, summary, started_at, resolved_at")
        .eq("is_public", true)
        .order("started_at", { ascending: false })
        .limit(20),
      supabase
        .from("service_uptime_history")
        .select("day, availability_percent")
        .order("day", { ascending: false })
        .limit(90),
    ]);

  if (statusError || incidentsError || uptimeError) {
    console.error("Could not load service status:", statusError?.message, incidentsError?.message, uptimeError?.message);
    return jsonError("Service status is temporarily unavailable.", 503);
  }

  return Response.json(
    { current, incidents: incidents ?? [], uptime: uptime ?? [] },
    { headers: { "Cache-Control": "no-store" } },
  );
}
