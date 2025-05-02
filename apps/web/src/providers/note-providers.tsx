"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface NoteContextType {
  isCreating: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  setNewNote: React.Dispatch<
    React.SetStateAction<{
      title: string;
      slug?: string;
    }>
  >;
  newNote: {
    title: string;
    slug?: string;
  };
}
const NoteContext = createContext<NoteContextType>({
  isCreating: false,
} as NoteContextType);

export default function NoteProvider({ children }: { children: ReactNode }) {
  const [newNote, setNewNote] = useState<{ title: string; slug?: string }>({
    title: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const value = { newNote, setNewNote, isCreating, setIsCreating };
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}
export const useNote = () => useContext(NoteContext);
