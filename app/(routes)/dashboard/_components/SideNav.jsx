"use client";
import React from "react";
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "My Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();

  useEffect(() => {
   console.log(path)
  }, [path])
  

  return (
    <div className="h-screen p-5 border shadow-sm">
      {/* Logo */}
      <Image src={"/logo.svg"} alt="logo" width={75} height={100} />

      {/* Navigation Menu */}
      <div className="mt-5">
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <div
              className={`h-14 w-22 p-4 rounded-md flex items-center space-x-2 mb-6 hover:text-primary hover:bg-blue-100 
                        ${path === menu.path ? "text-primary bg-blue-100" : ""}`}
            >
              <menu.icon className="w-6 h-6" />
              <span>{menu.name}</span>
            </div>
          </Link>
        ))}
      </div>

      
      <div>
        <div className="fixed bottom-10 p-5 flex gap-2 items-center">
          <UserButton />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
