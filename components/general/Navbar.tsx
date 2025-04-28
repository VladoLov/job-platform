import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth, signOut } from "@/app/utils/auth";
import UserDropdown from "./UserDropdown";

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="flex justify-between items-center py-5">
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src="/logo.jpg"
          alt="logo"
          width={40}
          height={40}
          className="cursor-pointer"
        />
        <h1 className="text-2xl font-bold">
          Job<span className="text-primary">Platform</span>
        </h1>
      </Link>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-5">
        <ThemeToggle />
        <Link className={buttonVariants({ size: "lg" })} href={"/post-job"}>
          Post Job
        </Link>
        {session?.user ? (
          <div>
            <UserDropdown
              email={session.user.email as string}
              name={session.user.name as string}
              image={session.user.image as string}
            />
          </div>
        ) : (
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            href={"/login"}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
