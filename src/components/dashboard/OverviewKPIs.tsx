import { KPICard } from "@/components/ui/KPICard";
import { useStore } from "@/store/useStore";

export function OverviewKPIs() {
  const { alerts } = useStore();
  const openAlerts = alerts.filter((a) => a.status === "Open").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
      <KPICard
        title="Active_Incidents"
        value={openAlerts}
        delta={12.5}
        isPositiveGood={false}
        accent="secondary"
      />
      <KPICard
        title="Cameras_Online"
        value="42/45"
        delta={-2.1}
        isPositiveGood={true}
        progress={93.3}
        accent="primary"
      />
      <KPICard
        title="Avg_Response_Time"
        value="4m 12s"
        delta={-15}
        isPositiveGood={true}
        accent="primary"
      />
      <KPICard
        title="Total_Detections_Today"
        value="1,248"
        delta={8.4}
        isPositiveGood={false}
        accent="primary"
      />
    </div>
  );
}
