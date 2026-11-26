"use client";

import { useEffect, useState } from "react";

type StatusSnapshot = {
  current: {
    status: "operational" | "degraded" | "outage" | "maintenance";
    message: string;
    updated_at: string;
    maintenance_start: string | null;
    maintenance_end: string | null;
  } | null;
  incidents: {
    id: string;
    title: string;
    impact: "minor" | "major" | "critical";
    status: string;
    summary: string;
    started_at: string;
    resolved_at: string | null;
  }[];
  uptime: { day: string; availability_percent: number | null }[];
};

const statusLabels = {
  operational: "Operational",
  degraded: "Degraded performance",
  outage: "Service disruption",
  maintenance: "Maintenance",
};

export default function StatusFeed() {
  const [snapshot, setSnapshot] = useState<StatusSnapshot | null>(null);
  const [unavailable, setUnavailable] = useState("");

  useEffect(() => {
    fetch("/api/status", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) {
          const result = await response.json() as { message?: string };
          throw new Error(result.message || "Status is unavailable.");
        }
        setSnapshot((await response.json()) as StatusSnapshot);
      })
      .catch((error: unknown) => setUnavailable(error instanceof Error ? error.message : "Status is unavailable."));
  }, []);

  const current = snapshot?.current;
  return (
    <div className="space-y-8">
      <section>
        <h2>Current service status</h2>
        {unavailable ? (
          <p role="status" className="mt-3 rounded-xl bg-amber-50 p-4 font-semibold text-amber-900">
            {unavailable} For current service information, message us on <a className="underline" href="https://wa.me/447473970663" target="_blank" rel="noopener noreferrer">WhatsApp at +44 7473 970663</a>.
          </p>
        ) : current ? (
          <div className="mt-3 rounded-xl bg-mist p-4">
            <p className="font-extrabold text-ink">
              <span aria-hidden="true" className={`mr-2 inline-block h-2.5 w-2.5 rounded-full ${current.status === "operational" ? "bg-[#16a34a]" : current.status === "outage" ? "bg-red-600" : "bg-amber-500"}`} />
              {statusLabels[current.status]}
            </p>
            <p className="mt-2">{current.message}</p>
            <time className="mt-2 block text-xs" dateTime={current.updated_at}>
              Last updated {new Date(current.updated_at).toLocaleString()}
            </time>
            {current.status === "maintenance" && current.maintenance_start && (
              <p className="mt-2">
                Scheduled window: {new Date(current.maintenance_start).toLocaleString()}
                {current.maintenance_end ? ` – ${new Date(current.maintenance_end).toLocaleString()}` : ""}
              </p>
            )}
          </div>
        ) : (
          <p role="status" className="mt-3 rounded-xl bg-amber-50 p-4 font-semibold text-amber-900">
            Status monitoring has not been configured. Contact support for a current service update.
          </p>
        )}
      </section>

      <section>
        <h2>Recent incidents and maintenance</h2>
        {unavailable ? <p className="mt-3">Incident history is unavailable right now.</p> : !snapshot ? <p className="mt-3">Loading incident history…</p> : snapshot.incidents.length === 0 ? (
          <p className="mt-3">No incident records are currently published.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {snapshot.incidents.map((incident) => (
              <li key={incident.id} className="rounded-xl border border-line p-4">
                <p className="font-bold text-ink">{incident.title} <span className="text-xs font-semibold uppercase text-slate-soft">· {incident.impact} impact · {incident.status}</span></p>
                <p className="mt-2">{incident.summary}</p>
                <time className="mt-2 block text-xs" dateTime={incident.started_at}>{new Date(incident.started_at).toLocaleString()}</time>
                {incident.resolved_at && <p className="mt-1 text-xs">Resolved {new Date(incident.resolved_at).toLocaleString()}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Uptime history</h2>
        {unavailable ? <p className="mt-3">Uptime history is unavailable right now.</p> : !snapshot ? <p className="mt-3">Loading history…</p> : snapshot.uptime.length === 0 ? (
          <p className="mt-3">No uptime measurements have been published. Historical percentages will appear here after monitoring data is connected.</p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead><tr className="border-b border-line"><th scope="col" className="p-3">Date</th><th scope="col" className="p-3">Availability</th></tr></thead>
              <tbody>
                {snapshot.uptime.map((day) => (
                  <tr key={day.day} className="border-b border-line">
                    <td className="p-3">{day.day}</td>
                    <td className="p-3">{day.availability_percent === null ? "Not reported" : `${day.availability_percent.toFixed(2)}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
