"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SendIcon } from "lucide-react";
import OauthProviders from "@/components/helpers/OauthProviders";

export default function PageClient() {
  return (
    <div className="w-full h-screen py-16 flex items-center justify-center p-2">
      <Card className="max-w-[350px] w-full">
        <CardHeader>
          <CardTitle>Quicke Note</CardTitle>
          <CardDescription>
            Let&apos;s log you in to start yout journey with quick note
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="example@email.com" />
              </div>
              <Button className="sm:cursor-pointer">
                Continue with Email <SendIcon />
              </Button>
              <div className="flex w-full space-x-2 items-center">
                <span className="w-full h-0 border"></span>
                <p>OR</p>
                <span className="w-full h-0 border"></span>
              </div>
            </div>
          </form>
        </CardContent>
        <OauthProviders />
      </Card>
    </div>
  );
}
