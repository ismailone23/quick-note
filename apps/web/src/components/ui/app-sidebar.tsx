"use client";
import { ChevronsLeft, Home, Inbox } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
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

const generalItems = [
  {
    title: "Home",
    url: "/workspace",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
];

export function AppSidebar() {
  const { data } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  console.log(pathname);

  return (
    <Sidebar>
      <SidebarContent className="dark:bg-neutral-900">
        <SidebarGroup>
          <SidebarMenu className="w-full py-1 hover:bg-gray-300 px-2 rounded-sm">
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
              {generalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`hover:bg-gray-300 ${pathname === item.url && "bg-gray-300"} transition-all translate-0.5`}
                  >
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SearchDialog
                  isSearchOpen={isSearchOpen}
                  setIsSearchOpen={setIsSearchOpen}
                />
              </SidebarMenuItem>
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
