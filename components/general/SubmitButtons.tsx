"use client";

import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface GeneralSubmitButtonProps {
  children?: React.ReactNode;
  text: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  width?: string;
  icon?: React.ReactNode;
}

export default function GeneralSubmitButton({
  text,
  variant,
  width,
  icon,
}: GeneralSubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button variant={variant} className={width} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" /> Submitting..
        </>
      ) : (
        <>
          {icon && <div className="size-4">{icon}</div>}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
}
