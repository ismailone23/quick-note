"use client";
import { ChevronsLeft, Home, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

import { useCallback, useState } from "react";
import { Button } from "./button";
import SettingDialogue from "./setting-dialogue";
import SearchDialog from "./search-dialog";
import { usePathname, useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NotesList from "../notes/notes-list";
import { useTRPC } from "@/trpc/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function AppSidebar() {
  const { data } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const user = data?.user;
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const createNoteMut = useMutation(
    trpc.note.createNote.mutationOptions({
      onMutate: () => {
        const toastId = toast.loading("Loading...");
        return {
          toastId,
        };
      },
      onSuccess: (data, _vars, ctx) => {
        toast.success("Note Created Successfully", {
          id: ctx.toastId,
        });
        queryClient.invalidateQueries({
          queryKey: trpc.note.getNotes.queryKey(),
        });
        router.push(`/workspace/notes/${data.slug}`);
      },
      onError: (error, _vars, ctx) => {
        toast.error("Failed to create note", {
          description: error.message,
          id: ctx?.toastId,
        });
      },
    })
  );

  const handleNewNote = useCallback(() => {
    createNoteMut.mutate({ title: "new page" });
  }, [createNoteMut]);

  return (
    <Sidebar>
      <SidebarContent className="dark:bg-neutral-900">
        <SidebarGroup>
          <SidebarMenu className="w-full py-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-sm px-2">
            <div className="w-full flex items-center space-x-2 justify-between">
              <div className="w-full flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  <AvatarImage src={user?.image as string} />
                </Avatar>
                <h1 className="line-clamp-1 text-sm leading-snug">
                  {user?.name}
                </h1>
              </div>
              <Button
                onClick={toggleSidebar}
                className="sm:cursor-pointer"
                variant={"ghost"}
                size={"icon"}
              >
                <ChevronsLeft />
              </Button>
            </div>
          </SidebarMenu>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-sm ${pathname === "/workspace" && "bg-zinc-200 dark:bg-zinc-800"} transition-all translate-0.5`}
                >
                  <Link href={"/workspace"} className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SearchDialog
                  isSearchOpen={isSearchOpen}
                  setIsSearchOpen={setIsSearchOpen}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel className="w-full justify-between flex">
              Private{" "}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={handleNewNote}>
                    <Plus className="w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Create new note</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </SidebarGroupLabel>
            <NotesList /> {/*  */}
            <SidebarMenu>
              <SidebarMenuItem>
                <SettingDialogue
                  isSettingsOpen={isSettingsOpen}
                  setIsSettingsOpen={setIsSettingsOpen}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
