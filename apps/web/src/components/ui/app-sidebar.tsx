"use client";
import { ChevronsLeft, Home } from "lucide-react";
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

import { useState } from "react";
import { Button } from "./button";
import SettingDialogue from "./setting-dialogue";
import SearchDialog from "./search-dialog";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const { data } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent className="dark:bg-neutral-900">
        <SidebarGroup>
          <SidebarMenu className="w-full py-1 hover:bg-zinc-300 dark:hover:bg-zinc-800 rounded-sm px-2">
            <div className="w-full flex items-center space-x-2 justify-between">
              <div className="w-full flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>{data?.user.name?.charAt(0)}</AvatarFallback>
                  <AvatarImage src={data?.user.image as string} />
                </Avatar>
                <h1 className="line-clamp-1 text-sm leading-snug">
                  {data?.user.name}
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
                  className={`hover:bg-zinc-300 dark:hover:bg-zinc-800 rounded-sm ${pathname === "/workspace" && "bg-zinc-300 dark:bg-zinc-800"} transition-all translate-0.5`}
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
            <SidebarGroupLabel>Private</SidebarGroupLabel>
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
