import WorkspaceContainer from "@/components/workspace-container";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <WorkspaceContainer>{children}</WorkspaceContainer>
      </main>
    </SidebarProvider>
  );
}
