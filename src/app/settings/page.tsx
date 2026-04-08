import { SettingsTabs } from "@/components/settings/SettingsTabs";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-primary" />
          <h1 className="text-3xl font-display font-bold tracking-tighter uppercase text-foreground">
            SYSTEM_DIRECTIVES
          </h1>
        </div>
        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mt-2">
          Operational parameters and administrative override console
        </p>
      </div>
      
      <SettingsTabs />
    </div>
  );
}
