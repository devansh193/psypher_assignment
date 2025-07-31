import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

export const tierEnum = pgEnum("tier", ["free", "silver", "gold", "platinum"]);

export const eventTable = pgTable("event", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
  price: text("price").notNull(),
  tags: text("tags").array(),
  description: text("description").notNull(),
  eventDate: timestamp("event_name").notNull(),
  image_url: text("image_url").notNull(),
  tier: tierEnum("tier").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
