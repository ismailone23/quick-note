import React, { useCallback } from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useAuth } from "@/providers/auth-providers";
import ButtonLoader from "./button-loader";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function OauthProviders() {
  const { loadingProvider, callbackUrl, setLoadingProvider } = useAuth();

  const handleGoogle = useCallback(async () => {
    try {
      setLoadingProvider("google");
      await signIn("google", {
        redirect: true,
        redirectTo: callbackUrl ?? "/",
      });
    } catch (error) {
      toast.error("Failed to sign in with google", {
        description: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setLoadingProvider(null);
    }
  }, [setLoadingProvider, callbackUrl]);
  return (
    <CardFooter className="flex flex-col w-full">
      <Button
        className="w-full sm:cursor-pointer"
        variant={"outline"}
        onClick={handleGoogle}
        disabled={!!loadingProvider}
      >
        <ButtonLoader loading={loadingProvider === "google"} />
        Continue with Google
      </Button>
    </CardFooter>
  );
}
