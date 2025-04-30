import React, { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";
import { Settings } from "lucide-react";
import { SidebarMenuButton } from "./sidebar";

import { Tabs } from "@/components/ui/tabs";

import PreferenceTab from "../tabs/preference-tab";
import TabList from "../tab-list";
import GeneralTab from "../tabs/general-tab";
import AccountTab from "../tabs/account-tab";

export default function SettingDialogue({
  isSettingsOpen,
  setIsSettingsOpen,
}: {
  isSettingsOpen: boolean;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton className="flex sm:cursor-pointer items-center gap-2 hover:bg-zinc-300 rounded-sm dark:hover:bg-zinc-800 transition-all">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="!max-w-[1140] !p-0 w-full h-10/12">
        <DialogTitle className="hidden">Accounts</DialogTitle>
        <Tabs
          defaultValue="Preferences"
          orientation="vertical"
          className="flex flex-row dark:bg-neutral-900 h-full"
        >
          <TabList />
          <div className="flex-1 rounded-r-md p-10 overflow-auto">
            <AccountTab />
            <PreferenceTab />
            <GeneralTab />
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
