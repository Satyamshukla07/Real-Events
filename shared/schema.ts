import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // Wedding, Corporate, Private, Luxury
  features: text("features").array().notNull(),
  startingPrice: decimal("starting_price", { precision: 10, scale: 2 }),
  duration: text("duration"), // "3-4 hours", "Full Day", etc.
  iconType: text("icon_type").notNull(), // For neon icons
  videoUrl: text("video_url"),
  imageUrl: text("image_url"),
  isPopular: boolean("is_popular").default(false),
});

export const portfolio = pgTable("portfolio", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  eventType: text("event_type").notNull(),
  location: text("location").notNull(),
  date: timestamp("date").notNull(),
  images: text("images").array().notNull(),
  videoUrl: text("video_url"),
  clientName: text("client_name"),
  attendeeCount: integer("attendee_count"),
  budget: decimal("budget", { precision: 12, scale: 2 }),
  tags: text("tags").array().notNull(),
  isFeatured: boolean("is_featured").default(false),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientName: text("client_name").notNull(),
  clientTitle: text("client_title"),
  company: text("company"),
  content: text("content").notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  eventType: text("event_type").notNull(),
  date: timestamp("date").notNull(),
  avatar: text("avatar"),
  location: text("location"),
});

export const team = pgTable("team", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  image: text("image"),
  specialties: text("specialties").array().notNull(),
  experience: integer("experience"), // years
  email: text("email"),
  linkedin: text("linkedin"),
  isLeadership: boolean("is_leadership").default(false),
});

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  eventType: text("event_type").notNull(),
  status: text("status").notNull(), // upcoming, ongoing, completed
  ticketPrice: decimal("ticket_price", { precision: 10, scale: 2 }),
  capacity: integer("capacity"),
  image: text("image"),
  isPublic: boolean("is_public").default(true),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertPortfolioSchema = createInsertSchema(portfolio).omit({
  id: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

export const insertTeamSchema = createInsertSchema(team).omit({
  id: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type Portfolio = typeof portfolio.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Team = typeof team.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;
