"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function Page() {
  const { data, status } = useSession();
  console.log({ data });

  return status != "loading" ? <div>{data?.user.email}</div> : <p>loading</p>;
}
