import { UserDetails } from "@/modules/user/components/ui/user-details";
import { EventSection } from "./event-content";

export const EventPage = () => {
  return (
    <div className="min-h-screen w-full bg-background px-4 py-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="flex items-center justify-between">
          <UserDetails />
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Upcoming Events
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Browse events available to your tier and below.
            </p>
          </div>
        </div>
        <EventSection />
      </div>
    </div>
  );
};
