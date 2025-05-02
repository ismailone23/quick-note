"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { ChevronsRight } from "lucide-react";
import React from "react";

export default function Page() {
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
      <div className="">
        <h1>Recent visits</h1>
      </div>
    </div>
  );
}
