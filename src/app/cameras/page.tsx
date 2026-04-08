import { CameraInventory } from "@/components/cameras/CameraInventory";

export default function CamerasPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-primary" />
          <h1 className="text-3xl font-display font-bold tracking-tighter uppercase text-foreground">
            SENSOR_MANAGEMENT
          </h1>
        </div>
        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mt-2">
          Configure and monitor multi-node telemetry stream status
        </p>
      </div>
      
      <CameraInventory />
    </div>
  );
}
