"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function DashboardHeader() {
  return (
    <div className="p-5 border-b shadow-sm flex justify-between">
      <Link href="/dashboard">
        <Button>Go To Dashboard</Button>
      </Link>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
