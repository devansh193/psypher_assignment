import { getEvents } from "@/action";
import { getQueryClient } from "@/lib/get-query-client";
import { EventPage } from "@/modules/event/components/ui/event-page";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventPage />
    </HydrationBoundary>
  );
};
export default Page;
