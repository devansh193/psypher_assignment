import { Heart, Calendar, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import clsx from "clsx";

interface EventCardProps {
  title: string;
  description: string;
  eventDate: Date;
  time: string;
  location: string;
  price: number;
  tags: string[];
  imageUrl: string;
  tier: "free" | "silver" | "gold" | "platinum";
}

const tierColorMap: Record<EventCardProps["tier"], string> = {
  free: "bg-gray-300 text-black",
  silver: "bg-slate-300 text-black",
  gold: "bg-[#EFBF04] text-black",
  platinum: "bg-gradient-to-r from-[#B9163C] to-[#B41737] text-white",
};

export const EventCard = ({
  title,
  time,
  location,
  price,
  tags,
  description,
  eventDate,
  imageUrl,
  tier,
}: EventCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border shadow-md group aspect-[3/2]">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />

      <div
        className={clsx(
          "absolute left-2 top-2 z-20 rounded-full px-3 py-1 text-xs font-semibold shadow-sm",
          tierColorMap[tier]
        )}
      >
        {tier.toUpperCase()}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-20 size-8 rounded-full bg-black/70 text-white hover:bg-black"
      >
        <Heart className="size-4" />
      </Button>

      <div className="absolute bottom-0 z-20 w-full p-4 text-white space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm line-clamp-2 text-muted-foreground">
          {description}
        </p>
        <div className="text-xs opacity-80 mt-2 space-y-0.5">
          <p className="flex items-center gap-1">
            <Calendar className="size-3" />{" "}
            {eventDate.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            at {time}
          </p>
          {location && (
            <p className="flex items-center gap-1">
              <MapPin className="size-3" /> {location}
            </p>
          )}
          <p>{price === 0 ? "Free" : `₹${price.toLocaleString()}`}</p>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-white/20 backdrop-blur text-xs px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const EventCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border shadow-md group aspect-[3/2] animate-pulse bg-muted">
      <div className="absolute inset-0 bg-muted-foreground/10" />
      <div className="absolute left-2 top-2 z-20 h-5 w-16 rounded-full bg-gray-300" />
      <div className="absolute right-2 top-2 z-20 size-8 rounded-full bg-gray-400" />
      <div className="absolute bottom-0 z-20 w-full p-4 space-y-2">
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-5/6 rounded" />

        <div className="space-y-1 mt-2">
          <Skeleton className="h-2 w-1/2" />
          <Skeleton className="h-2 w-1/3" />
          <Skeleton className="h-2 w-1/4" />
        </div>

        <div className="flex gap-2 flex-wrap mt-3">
          <Skeleton className="h-4 w-12 rounded-full" />
          <Skeleton className="h-4 w-10 rounded-full" />
          <Skeleton className="h-4 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
};
