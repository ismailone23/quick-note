"use client";
import React from "react";
import { TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "next-auth/react";
import { Settings, Settings2 } from "lucide-react";

export default function TabList() {
  const { data } = useSession();
  const tabItems = [
    {
      title: data?.user.name as string,
      icon: Settings2,
      type: "u",
    },
    {
      title: "Preferences",
      icon: Settings2,
      type: "g",
    },
    {
      title: "General",
      icon: Settings,
      type: "g",
    },
  ];
  return (
    <TabsList className="flex flex-col h-full w-64 items-start justify-start gap-1 p-2 bg-muted/50 rounded-l-md rounded-r-none">
      <div className="space-y-1 w-full">
        <h1 className="text-xs font-medium text-gray-600 pl-4">Account</h1>
        {tabItems.map((t, i) => (
          <TabsTrigger
            key={i}
            value={t.title}
            className={`w-full justify-start gap-2 px-4 py-1 text-sm ${t.type === "u" ? "font-medium" : "font-normal"}  rounded-sm
              data-[state=active]:bg-gray-200 data-[state=active]:border-none border-none data-[state=active]:shadow-none data-[state=active]:font-medium
              h-auto`}
          >
            {t.type === "u" ? (
              <Avatar className="w-5 h-5">
                <AvatarFallback>{data?.user.name?.charAt(0)}</AvatarFallback>
                <AvatarImage src={data?.user.image as string} />
              </Avatar>
            ) : (
              <t.icon className="w-4 h-4" />
            )}
            {t.title}
          </TabsTrigger>
        ))}
      </div>
    </TabsList>
  );
}
