"use client";
import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Link2 } from "lucide-react";
import { toast } from "sonner";

export default function CopyLinkMenuItem({ jobUrl }: { jobUrl: string }) {
  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(jobUrl);
      toast.success("Job URL copied to clipboard");
    } catch (err) {
      console.log(err);
      toast.error("Failed to copy Job URL");
    }
  }
  return (
    <DropdownMenuItem onSelect={handleCopyLink}>
      <Link2 className="size-4" />
      <span>Copy Job URL</span>
    </DropdownMenuItem>
  );
}
