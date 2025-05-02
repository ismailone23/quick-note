import { notes } from "@workspace/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export function generateUniqueString(length: number = 12): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uniqueString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueString += characters[randomIndex];
  }
  return uniqueString;
}

export const noteRoute = createTRPCRouter({
  getNotes: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return await ctx.db
      .select()
      .from(notes)
      .where(eq(notes.authorId, userId))
      .orderBy(desc(notes.updatedAt));
  }),
  getNoteDetails: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input: { slug } }) => {
      const userId = ctx.session.user.id;
      const [isAuthor] = await ctx.db
        .select()
        .from(notes)
        .where(and(eq(notes.authorId, userId), eq(notes.slug, slug)));
      if (!isAuthor)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You dont have the permission to do this action",
        });
      return isAuthor;
    }),
  createNote: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input: { title } }) => {
      const userId = ctx.session.user.id;
      const slug = generateUniqueString(16);
      const [newNote] = await ctx.db
        .insert(notes)
        .values({
          authorId: userId,
          noteTitle: title,
          slug,
        })
        .returning();

      if (!newNote)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create note. Internal server error.",
        });
      return newNote;
    }),

  updateNote: protectedProcedure
    .input(
      z.object({
        title: z.string().optional(),
        slug: z.string(),
        noteDescription: z.string().optional(),
        coverImage: z.string().url().optional(),
      })
    )
    .mutation(
      async ({ ctx, input: { slug, title, coverImage, noteDescription } }) => {
        const userId = ctx.session.user.id;
        const [isAuthor] = await ctx.db
          .select()
          .from(notes)
          .where(and(eq(notes.authorId, userId), eq(notes.slug, slug)));
        if (!isAuthor)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "You dont have the permission to do this action",
          });
        const [updatedNote] = await ctx.db
          .update(notes)
          .set({
            noteTitle: title ?? isAuthor.noteTitle,
            coverImage: coverImage ?? isAuthor.coverImage,
            noteDescription: noteDescription ?? isAuthor.noteDescription,
          })
          .where(and(eq(notes.slug, slug), eq(notes.authorId, userId)))
          .returning();
        if (!updatedNote)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "failed to update note",
          });
        return updatedNote;
      }
    ),
  deleteNote: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input: { slug } }) => {
      const userId = ctx.session.user.id;
      const [isAuthor] = await ctx.db
        .select()
        .from(notes)
        .where(and(eq(notes.authorId, userId), eq(notes.slug, slug)));
      if (!isAuthor)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You dont have the permission to do this action",
        });
      return await ctx.db
        .delete(notes)
        .where(and(eq(notes.authorId, userId), eq(notes.slug, slug)));
    }),
});
