"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { LayoutDashboard, FileText, Landmark, Calendar, Image as ImageIcon, Mail, Ticket, Globe, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAdmin, loading, logout } = useUser();

  useEffect(() => {
    // If not loading, and user is either not authenticated or not an admin, redirect to admin login
    if (!loading) {
      if (!user || !isAdmin) {
        router.push("/admin/login");
      }
    }
  }, [user, isAdmin, loading, router]);

  // Don't render the dashboard frame for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf6ee] text-[#1e1915]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-serif font-bold text-lg">Validating Administrative Gate...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Page Content", href: "/admin/content", icon: FileText },
    { name: "Temples", href: "/admin/temples", icon: Landmark },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Contacts", href: "/admin/contacts", icon: Mail },
    { name: "Bookings", href: "/admin/bookings", icon: Ticket },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#faf6ee] text-[#1e1915] font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#7b1113] text-white flex flex-col border-r border-[#cfa856]/20">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="relative h-10 w-24">
            <Image
              src="/logo.jpeg"
              alt="Nighwan Logo"
              fill
              className="object-contain rounded"
            />
          </div>
          <span className="text-[10px] font-bold text-brand-gold bg-white/10 px-2 py-0.5 rounded border border-[#cfa856]/30 uppercase">
            Admin
          </span>
        </div>

        <nav className="flex-grow p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20"
                    : "text-stone-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-stone-200 hover:text-white hover:bg-white/10 transition-all"
          >
            <Globe className="w-4 h-4" />
            View Website
          </Link>
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-rose-250 hover:text-white hover:bg-rose-900/30 transition-all text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Page Area */}
      <main className="flex-grow p-6 sm:p-10 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
