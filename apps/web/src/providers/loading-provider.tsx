"use client";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface LoadingContextType {
  handleNavigation: (slug: string) => void;
  isLoaing: boolean;
  progress: number;
}
const LoadingContext = createContext<LoadingContextType>({
  isLoaing: false,
} as LoadingContextType);

export default function LoadingProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoaing, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsLoading(false); // Reset loading on route change
    setProgress(100);
  }, [pathname]);

  const handleNavigation = useCallback(
    (slug: string) => {
      startTransition(() => {
        setProgress(10);
        setIsLoading(true);
        router.push(slug);
      });
    },
    [router]
  );
  const value = { handleNavigation, isLoaing, progress };
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}
export const useLoading = () => useContext(LoadingContext);
