import React, { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";
import { Settings, Settings2 } from "lucide-react";
import { SidebarMenuButton } from "./sidebar";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useSession } from "next-auth/react";
import { Separator } from "./separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Switch } from "./switch";
import { Label } from "./label";

export default function SettingDialogue({
  isSettingsOpen,
  setIsSettingsOpen,
}: {
  isSettingsOpen: boolean;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
}) {
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
    <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="!max-w-[1140] !p-0 bg-white w-full h-10/12">
        <DialogTitle className="hidden">Accounts</DialogTitle>
        <Tabs
          defaultValue="account"
          orientation="vertical"
          className="flex flex-row h-full"
        >
          <TabsList className="flex flex-col h-full w-64 items-start justify-start gap-1 p-2 bg-muted/50 rounded-l-md rounded-r-none">
            <div className="space-y-1 w-full">
              <h1 className="text-xs font-medium text-gray-600 pl-4">
                Account
              </h1>
              {tabItems.map((t, i) => (
                <TabsTrigger
                  key={i}
                  value={t.title}
                  className={`w-full justify-start gap-3 px-4 py-1 text-sm ${t.type === "u" ? "font-medium" : "font-normal"}  rounded-sm
                        data-[state=active]:bg-gray-200 data-[state=active]:shadow-none data-[state=active]:font-medium
                        h-auto`}
                >
                  {t.type === "u" ? (
                    <Avatar className="w-5 h-5">
                      <AvatarFallback>
                        {data?.user.name?.charAt(0)}
                      </AvatarFallback>
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
          <div className="flex-1 p-10 overflow-auto">
            <TabsContent value={data?.user.name as string} className="m-0">
              {data?.user.email}
            </TabsContent>
            <TabsContent value="Preferences" className="m-0">
              <h1 className="font-medium">Preferences</h1>
              <Separator className="my-4" />
              <div className="flex w-full justify-between">
                <div className="flex space-y-1 flex-col">
                  <h1 className="text-sm">Appearence</h1>
                  <p className="text-xs  font-normal text-gray-600">
                    Customize how Quick Note looks on your device.
                  </p>
                </div>
                <Select defaultValue="system">
                  <SelectTrigger className="w-auto border-none shadow-none hover:bg-gray-200">
                    <SelectValue placeholder="Light" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="system">Use system setting</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-10">
                <h1 className="font-medium">Privacy</h1>
                <Separator className="my-4" />
                <div className="flex w-full justify-between">
                  <div className="flex space-y-1 flex-col">
                    <Label htmlFor="profile-discoveribility">
                      Profile discoverability
                    </Label>
                    <p className="text-xs  font-normal text-gray-600">
                      Users with your email can see your name and profile
                      picture when inviting you to a new workspace.
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
              <div></div>
            </TabsContent>
            <TabsContent value="General" className="m-0">
              General Tab
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
