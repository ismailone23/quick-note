"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TabsContent } from "../ui/tabs";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export default function PreferenceTab() {
  const { setTheme, resolvedTheme, themes } = useTheme();

  return (
    <TabsContent value="Preferences" className="m-0">
      <h1 className="font-medium dark:text-gray-300">Preferences</h1>
      <Separator className="my-4" />
      <div className="flex w-full justify-between">
        <div className="flex space-y-1 flex-col">
          <h1 className="text-sm">Appearence</h1>
          <p className="text-xs dark:text-gray-400 font-normal text-gray-600">
            Customize how Quick-Note looks on your device.
          </p>
        </div>
        <Select
          onValueChange={(value) => setTheme(value)}
          defaultValue={resolvedTheme}
        >
          <SelectTrigger className="w-auto border-none shadow-none hover:bg-gray-200">
            <SelectValue placeholder="Light" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {themes.map((theme, i) => (
                <SelectItem value={theme} key={i}>
                  {theme === "system" ? "Use system settings" : theme}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-10">
        <h1 className="font-medium dark:text-gray-300">Privacy</h1>
        <Separator className="my-4" />
        <div className="flex w-full justify-between">
          <div className="flex space-y-1 flex-col">
            <Label
              htmlFor="profile-discoveribility"
              className="dark:text-gray-300"
            >
              Profile discoverability
            </Label>
            <p className="text-xs dark:text-gray-400 font-normal text-gray-600">
              Users with your email can see your name and profile picture when
              inviting you to a new workspace.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-300"
              id="profile-discoveribility"
            />
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
