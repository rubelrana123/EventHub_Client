// components/PublicNavbar.tsx (SERVER)
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Button } from "../ui/button";
import LogoutButton from "./LogoutButton";
import { getCookie } from "@/services/auth/tokenHandlers";
import MobileMenuButton from "./MobileMenuButton";
 
export default async function PublicNavbar() {
  const accessToken = await getCookie("accessToken");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Services", path: "/services" },
    { name: "Subscription", path: "/subscription" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-[#ff4000] p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-[#444444]">
                EventHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-sm font-medium text-[#444444] hover:text-[#ff4000]"
              >
                {link.name}
              </Link>
            ))}

            {accessToken ? (
              <LogoutButton />
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button (CLIENT COMPONENT) */}
          <MobileMenuButton
            navLinks={navLinks} 
            accessToken={accessToken} 
          />
        </div>
      </div>
    </nav>
  );
}
