import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { relations } from "drizzle-orm";

export const notes = pgTable("note", (t) => ({
  id: t.uuid("note_id").defaultRandom().primaryKey().notNull().unique(),
  slug: t.varchar("note_slug").notNull(),
  noteTitle: t.text("note_title").notNull(),
  noteDescription: t.text("note_description"),
  coverImage: t.text("cover_image"),
  titleImage: t.json("title_image").$type<{
    type: "emoji" | "image";
    value: string;
  }>(),
  authorId: t
    .uuid("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  isPublic: t.boolean("is_public").default(false),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
}));
export type Note = typeof notes.$inferSelect;
export const notesUserRelation = relations(notes, ({ one }) => ({
  user: one(users, { fields: [notes.authorId], references: [users.id] }),
}));
