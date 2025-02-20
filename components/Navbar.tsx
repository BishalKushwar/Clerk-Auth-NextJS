"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const Navbar = () => {
  const { userId } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const NavLink = ({ href, children }: NavLinkProps) => (
    <Link href={href}>
      <li className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-all duration-200">
        {children}
      </li>
    </Link>
  );

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-between w-full">
            <div className="flex items-center">
              <Link href="/">
                <span className="text-white text-xl font-semibold">LOGO</span>
              </Link>
              <div className="ml-10">
                <NavLink href="/client">Dashboard</NavLink>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!userId ? (
                <>
                  <Link href="/sign-in">
                    <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                      Sign in
                    </button>
                  </Link>
                  <Link href="/sign-up">
                    <button className="px-4 py-2 text-sm font-medium bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors">
                      Get Started
                    </button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <NavLink href="/profile">Account</NavLink>
                  <div className="w-8 h-8">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-between w-full">
            <Link href="/">
              <span className="text-white text-xl font-semibold">LOGO</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-800">
            <div className="px-2 py-3 space-y-1">
              <NavLink href="/client">Dashboard</NavLink>
              {!userId ? (
                <div className="pt-4 space-y-2">
                  <Link href="/sign-in">
                    <button className="w-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                      Sign in
                    </button>
                  </Link>
                  <Link href="/sign-up">
                    <button className="w-full px-4 py-2 text-sm font-medium bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors">
                      Get Started
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <NavLink href="/profile">Account</NavLink>
                  <div className="px-3 py-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;