import { IncidentFilters } from "@/components/incidents/IncidentFilters";
import { IncidentTable } from "@/components/incidents/IncidentTable";

export default function IncidentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-primary" />
          <h1 className="text-3xl font-display font-bold tracking-tighter uppercase text-foreground">
            INCIDENTS_ARCHIVE
          </h1>
        </div>
        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mt-2">
          Deep telemetry log for historical littering event analysis
        </p>
      </div>
      
      <div className="space-y-6">
        <IncidentFilters />
        <IncidentTable />
      </div>
    </div>
  );
}
