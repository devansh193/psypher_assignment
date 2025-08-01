import { UserDetails } from "@/modules/user/components/ui/user-details";
import { EventSection } from "./event-content";

export const EventPage = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-8">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Events
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Browse and manage upcoming events
              </p>
            </div>
            <div className="flex gap-2">
              <UserDetails />
            </div>
          </header>
          <EventSection />
        </div>
      </div>
    </div>
  );
};
