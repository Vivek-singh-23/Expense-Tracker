import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <Image src={"./logo.svg"} width={75} height={100} alt="logo" />

      <div className="flex items-center gap-4">
        <Link href={'/dashboard/budgets'}>
          <Button className="bg-primary text-white px-4 py-2 rounded-md">
            Get Started
          </Button>
        </Link>
        <SignedOut>
          <SignInButton>
            <a
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              href="#"
            >
              Sign In
            </a>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
