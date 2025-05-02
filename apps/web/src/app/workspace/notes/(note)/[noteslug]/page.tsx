"use client";
import { useTRPC } from "@/trpc/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { ChevronsRight, Loader2Icon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useDebounceCallback } from "usehooks-ts";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function NoteSlug() {
  const { noteslug } = useParams();
  const trpc = useTRPC();
  const { toggleSidebar, open } = useSidebar();
  const [isSaving, setIsSaving] = useState(false);
  const handleSidebar = useCallback(() => {
    if (!open) {
      toggleSidebar();
    }
  }, [toggleSidebar, open]);

  const {
    data: note,
    error,
    isPending,
    isError,
  } = useQuery(
    trpc.note.getNoteDetails.queryOptions({ slug: noteslug as string })
  );

  const queryClient = useQueryClient();

  const updateNoteMut = useMutation(
    trpc.note.updateNote.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.note.getNotes.queryKey(),
        });
        setIsSaving(false);
      },
      onError: (error) => {
        setIsSaving(false);
        toast.error("Failed to update note", {
          description: error.message,
        });
      },
    })
  );

  const debouncedTitle = useDebounceCallback((title: string) => {
    setIsSaving(true);
    updateNoteMut.mutate({ slug: noteslug as string, title });
  }, 500);
  const debouncedDescription = useDebounceCallback(
    (noteDescription: string) => {
      setIsSaving(true);
      updateNoteMut.mutate({ slug: noteslug as string, noteDescription });
    },
    500
  );

  if (isPending) {
    return (
      <div className="flex w-full h-screen flex-1 items-center justify-center">
        <Loader2Icon className="size-6 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="w-full flex flex-col overflow-hidden">
      <div className="w-full h-12 bg-zinc-100 flex justify-between pr-2 items-center">
        <Button onClick={handleSidebar} size={"icon"} variant={"ghost"}>
          <ChevronsRight className="w-5" />
        </Button>
        {isSaving && <Label>Saving....</Label>}
        <Input
          defaultValue={note.noteTitle}
          onChangeCapture={(e) => debouncedTitle(e.currentTarget.value)}
          placeholder="Note title goes here...."
          className="border-none rounded-none shadow-none focus-visible:ring-[0]"
        />
        <Button>Aciton</Button>
      </div>
      <ScrollArea className="w-full flex-1 h-[100%-48px]">
        <Textarea
          defaultValue={note.noteDescription ?? ""}
          onChangeCapture={(e) => debouncedDescription(e.currentTarget.value)}
          className="w-full h-full focus-visible:ring-0 border-none shadow-none resize-none"
          placeholder="Descriptive note goes here... Lorem Ipsum Dolor...."
        />
      </ScrollArea>
    </div>
  );
}
