import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { SidebarMenuButton } from "./sidebar";
import { Search } from "lucide-react";

export default function SearchDialog({
  isSearchOpen,
  setIsSearchOpen,
}: {
  isSearchOpen: boolean;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton className="flex sm:cursor-pointer items-center gap-2 hover:bg-zinc-300 rounded-sm dark:hover:bg-zinc-800 transition-all">
          <Search className="w-4 h-4" />
          <span>Search</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Find what you&apos;re looking for
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border rounded"
            autoFocus
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
