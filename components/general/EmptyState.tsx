import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
interface iAppProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  href,
}: iAppProps) {
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dashed p-8 border-primary">
      <div className="flex size-20 justify-center items-center rounded-full bg-primary/10">
        <Ban className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 font-semibold text-xl">{title}</h2>
      <p className="max-w-sm mt-2 mb-8 text-center leading-tight text-sm text-muted-foreground">
        {description}
      </p>
      <Link href={href} className={buttonVariants()}>
        <PlusCircle /> {buttonText}
      </Link>
    </div>
  );
}
