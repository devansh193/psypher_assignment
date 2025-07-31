"use client";

import { getEvents } from "@/action";
import { useQuery } from "@tanstack/react-query";
import { EventCard, EventCardSkeleton } from "./event-card";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const EventSection = () => {
  return (
    <Suspense fallback={<EventSectionSkeleton />}>
      <ErrorBoundary fallback={<div>Error loading events</div>}>
        <EventSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const EventSectionSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
};

const EventSectionSuspense = () => {
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data?.events.map((event) => (
        <EventCard
          key={event.id}
          title={event.title}
          description={event.description}
          eventDate={event.eventDate}
          time={event.time}
          location={event.location}
          price={10}
          tags={event.tags || []}
          imageUrl={event.image_url}
          tier={event.tier}
        />
      ))}
    </div>
  );
};
