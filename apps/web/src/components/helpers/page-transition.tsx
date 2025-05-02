"use client";
import { useLoading } from "@/providers/loading-provider";
import React from "react";
import { Progress } from "../ui/progress";

export default function TransitionPage() {
  const { isLoaing, progress } = useLoading();
  console.log(progress);

  return (
    <div
      className={`w-full absolute top-0 left-0 ${isLoaing ? "flex" : "hidden"}`}
    >
      <Progress value={progress} className="w-[100%]" />
    </div>
  );
}
