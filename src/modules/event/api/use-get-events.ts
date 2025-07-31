import { getEvents } from "@/action";
import { useQuery } from "@tanstack/react-query";

export const useGetEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      try {
        const response = await getEvents();
        if (!response) {
          throw new Error("Failed to fetch events");
        }
        return response.events;
      } catch (error) {
        throw new Error(
          `Error fetching events: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    },
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
