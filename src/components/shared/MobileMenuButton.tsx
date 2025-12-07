/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import LogoutButton from "./LogoutButton";

export interface MobileMenuButtonProps {
  navLinks: Array<{ name: string; path: string }>;
  accessToken: string | null;
}

export default function MobileMenuButton({ navLinks, accessToken }: MobileMenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="flex items-center md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md 
          text-gray-400 hover:text-[#ff4000] hover:bg-gray-100 
          focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ff4000]"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b border-gray-100 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium 
                text-[#444444] hover:text-[#ff4000] hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}

            <div className="px-3 py-2">
              {accessToken ? (
                <LogoutButton />
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button>Login</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
