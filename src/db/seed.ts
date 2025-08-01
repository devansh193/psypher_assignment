import "dotenv/config";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eventTable } from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in the environment variables.");
}

const client = postgres(process.env.DATABASE_URL, { prepare: false });
const db = drizzle({ client });

const seedEvents = async () => {
  console.log("🌱 Seeding events...");

  const now = new Date();

  const sampleEvents = [
    {
      id: randomUUID(),
      title: "Free Community Meetup",
      description:
        "Join our monthly community meetup open to all members. Network, learn, and share experiences with fellow developers.",
      eventDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
      time: "18:00",
      location: "Community Center",
      price: "0",
      image_url:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
      tier: "free" as const,
    },
    {
      id: randomUUID(),
      title: "Silver Workshop: Advanced JavaScript",
      description:
        "Deep dive into advanced JavaScript concepts including closures, prototypes, and async programming patterns.",
      eventDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
      time: "14:00",
      location: "Tech Hub",
      price: "20",
      tags: ["JavaScript", "Workshop"],

      image_url:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
      tier: "silver" as const,
    },
    {
      id: randomUUID(),
      title: "Gold Tier Exclusive: React Masterclass",
      description:
        "Comprehensive React masterclass covering hooks, context, performance optimization, and testing strategies.",
      eventDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      time: "10:00",
      location: "Online",
      price: "50",
      tags: ["React", "Masterclass"],

      image_url:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      tier: "gold" as const,
    },
    {
      id: randomUUID(),
      title: "Gold Developer Conference",
      description:
        "Full-day conference featuring industry leaders discussing the latest trends in web development and cloud architecture.",
      eventDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      time: "09:00",
      location: "Convention Center",
      price: "100",
      tags: ["Conference", "Web Development"],
      image_url:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      tier: "gold" as const,
    },
    {
      id: randomUUID(),
      title: "Platinum VIP Networking Dinner",
      description:
        "Exclusive networking dinner with C-suite executives and tech leaders. Limited to 20 participants.",
      eventDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      time: "19:00",
      location: "Luxury Restaurant",
      price: "200",
      tags: ["Networking", "Dinner"],

      image_url:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
      tier: "platinum" as const,
    },
    {
      id: randomUUID(),
      title: "Free Beginner Coding Bootcamp",
      description:
        "Introduction to programming concepts and web development basics. Perfect for those just starting their coding journey.",
      eventDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
      time: "11:00",
      location: "Local Library",
      price: "0",
      tags: ["Coding", "Bootcamp"],

      image_url:
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800",
      tier: "free" as const,
    },
    {
      id: randomUUID(),
      title: "Silver API Design Workshop",
      description:
        "Learn best practices for designing RESTful APIs, GraphQL implementation, and API security fundamentals.",
      eventDate: new Date(now.getTime() + 16 * 24 * 60 * 60 * 1000), // 16 days from now
      time: "15:00",
      location: "Online",
      price: "30",
      tags: ["API", "Workshop"],

      image_url:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
      tier: "silver" as const,
    },
    {
      id: randomUUID(),
      title: "Platinum Private Mentorship Session",
      description:
        "One-on-one mentorship session with industry veterans. Personalized career guidance and technical expertise.",
      eventDate: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from now
      time: "16:00",
      location: "Virtual",
      price: "150",
      tags: ["Mentorship", "Career Guidance"],
      image_url:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
      tier: "platinum" as const,
    },
  ];

  try {
    // Clear existing events (optional - remove if you want to keep existing data)
    console.log("🗑️  Clearing existing events...");
    await db.delete(eventTable);

    // Insert new events
    console.log("📝 Inserting sample events...");
    await db.insert(eventTable).values(sampleEvents);

    console.log(`✅ Successfully seeded ${sampleEvents.length} events!`);
    console.log("📊 Event breakdown:");
    console.log(
      `   - Free tier: ${
        sampleEvents.filter((e) => e.tier === "free").length
      } events`
    );
    console.log(
      `   - Silver tier: ${
        sampleEvents.filter((e) => e.tier === "silver").length
      } events`
    );
    console.log(
      `   - Gold tier: ${
        sampleEvents.filter((e) => e.tier === "gold").length
      } events`
    );
    console.log(
      `   - Platinum tier: ${
        sampleEvents.filter((e) => e.tier === "platinum").length
      } events`
    );
  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error;
  } finally {
    // Close the database connection
    await client.end();
    console.log("🔒 Database connection closed");
  }
};

// Run the seeding function
seedEvents()
  .then(() => {
    console.log("🎉 Seeding completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Seeding failed:", error);
    process.exit(1);
  });
