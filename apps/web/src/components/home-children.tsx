"use client";
import React from "react";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";
import { ChevronsRight } from "lucide-react";

export default function HomeChildren({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toggleSidebar, open } = useSidebar();

  return (
    <div className="w-full">
      {!open && (
        <div className="w-full sticky top-0 left-0 bg-gray-50">
          <Button
            onClick={toggleSidebar}
            className="sm:cursor-pointer"
            variant={"ghost"}
            size={"icon"}
          >
            <ChevronsRight />
          </Button>
        </div>
      )}
      {children}
    </div>
  );
}
