// import type { Metadata } from "next";
import "../styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import AuthProvider from "@/providers/auth-providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_ENV === "production"
      ? "https://quick-note.io"
      : "http://localhost:3000"
  ),
  title: "quick-note",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <SessionProvider>
            <TRPCReactProvider>
              <Toaster />
              {children}
            </TRPCReactProvider>
          </SessionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
