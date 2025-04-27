import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import type { ReactNode } from "react";

export default function ButtonLoader({
  loading,
  className,
  children,
}: {
  loading?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  if (!loading) return children;
  return <Loader2Icon className={cn("animate-spin", className)} />;
}
