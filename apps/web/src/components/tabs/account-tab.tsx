"use client";
import React, { useCallback, useRef, useState } from "react";
import { TabsContent } from "../ui/tabs";
import { useSession } from "next-auth/react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function AccountTab() {
  const { data } = useSession();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [preferredName, setPreferredName] = useState<string>(
    data?.user.name ?? ""
  );
  const [preview, setPreview] = useState<string | null>(
    data?.user.image ?? null
  );

  const handleAvatarClick = () => {
    inputRef.current?.click();
  };

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  return (
    <TabsContent
      value={data?.user.name as string}
      className="m-0 flex flex-col"
    >
      <h1 className="font-medium text-md dark:text-gray-300">Account</h1>
      <Separator className="my-4" />
      <div className="flex w-full gap-2 flex-col">
        <div className="flex gap-4">
          <div onClick={handleAvatarClick} className="cursor-pointer">
            <Avatar className="w-16 h-16">
              {preview ? (
                <AvatarImage src={preview} alt="Profile" />
              ) : (
                <AvatarFallback>
                  {data?.user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
          </div>

          <Input
            type="file"
            id="profile-pic-input"
            accept="image/*"
            ref={inputRef}
            onChange={onFileChange}
            className="hidden"
          />
          <div className="flex flex-col gap-1">
            <Label
              className="text-xs font-normal dark:text-gray-400"
              htmlFor="preferred-name"
            >
              Preferred name
            </Label>
            <Input
              id="preferred-name"
              className="border-gray-300 dark:text-gray-300 !w-64 shadow-none focus-visible:ring-1 bg-gray-100 dark:border-zinc-800 h-7 rounded-sm"
              defaultValue={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
            />
          </div>
        </div>
        <div className="max-w-20">
          <Label
            htmlFor="profile-pic-input"
            className="text-sm font-normal text-blue-500 cursor-pointer"
          >
            Add photo
          </Label>
        </div>
        <div className="mt-10">
          <h1 className="font-medium text-md dark:text-gray-300">
            Account security
          </h1>
          <Separator className="my-4" />
          <div className="flex flex-col w-full">
            <div className="flex w-full justify-between">
              <div className="flex flex-col space-y-0.5">
                <h1 className="text-sm dark:text-gray-300">Email</h1>
                <p className="text-xs dark:text-gray-400 text-gray-600">
                  {data?.user.email}
                </p>
              </div>
              <Button
                variant={"outline"}
                className="dark:text-gray-300"
                size={"sm"}
              >
                Change email
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h1 className="font-medium text-md dark:text-gray-300">Support</h1>
          <Separator className="my-4" />
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex sm:hover:cursor-pointer justify-between">
                <div className="w-full flex flex-col gap-1">
                  <h1 className="text-sm text-red-400">Delete my account</h1>
                  <p className="text-xs dark:text-gray-400 text-start">
                    Permanently delete the account and remove access from all
                    workspaces.
                  </p>
                </div>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="sm:hover:cursor-pointer"
                >
                  <ChevronRight className="text-gray-500" />
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Delete your entire account permanently?
                </DialogTitle>
                <DialogDescription className="text-center">
                  This action cannot be undone. This will permanently delete
                  your entire account. All private workspaces will be deleted,
                  and you will be removed from all shared workspaces.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col w-full items-start space-y-2">
                <Label htmlFor="email" className="text-right">
                  Please type in your email to confirm.
                </Label>
                <Input
                  id="email"
                  placeholder={data?.user.email ?? ""}
                  className="col-span-3"
                />
              </div>
              <DialogFooter>
                <div className="flex space-y-2 flex-col w-full">
                  <Button type="submit" variant={"destructive"}>
                    Permenently delete account
                  </Button>
                  <DialogClose asChild>
                    <Button type="submit" variant={"ghost"}>
                      Cancel
                    </Button>
                  </DialogClose>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </TabsContent>
  );
}
