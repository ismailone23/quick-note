"use client";
import React from "react";
import { SidebarMenu, SidebarMenuItem } from "../ui/sidebar";
import { useTRPC } from "@/trpc/react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useLoading } from "@/providers/loading-provider";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";

export default function NotesList() {
  const pathname = usePathname();
  const { handleNavigation } = useLoading();

  const trpc = useTRPC();
  const {
    data: notes,
    error,
    isFetching,
  } = useQuery(trpc.note.getNotes.queryOptions());
  if (!isFetching && error) {
    return toast.error("failed to fetch notes", { description: error.message });
  }

  return (
    <SidebarMenu className="mb-2">
      {!isFetching &&
        notes &&
        notes.map((note, i) => (
          <SidebarMenuItem
            key={i}
            onClick={() => handleNavigation(`/workspace/notes/${note.slug}`)}
            className={`w-full px-2 sm:hover:cursor-pointer line-clamp-1 hover:bg-neutral-200 hover:dark:bg-zinc-800 ${pathname.includes(note.slug) && "bg-zinc-200 dark:bg-zinc-800"} rounded-sm`}
          >
            <div className="w-full flex items-center justify-between">
              <h1>📄 {note.noteTitle}</h1>
              <Button
                className="sm:cursor-pointer"
                variant={"ghost"}
                size={"icon"}
              >
                <Ellipsis className="w-5 h-5" />
              </Button>
            </div>
          </SidebarMenuItem>
        ))}
    </SidebarMenu>
  );
}
