"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

interface UserContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = (currentUser: User | null) => {
    if (!currentUser) {
      setIsAdmin(false);
      return;
    }
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@nighwan.com";
    setIsAdmin(currentUser.email === adminEmail);
  };

  useEffect(() => {
    // Check local storage for mock admin bypass first
    const isMock = typeof window !== "undefined" && localStorage.getItem("nighwan_mock_admin") === "true";
    if (isMock) {
      setUser({ email: "admin@nighwan.com", id: "mock-admin" } as any);
      setIsAdmin(true);
      setLoading(false);
      return;
    }

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkAdminStatus(currentUser);
      setLoading(false);
    });

    // Listen to changes in auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (typeof window !== "undefined" && localStorage.getItem("nighwan_mock_admin") === "true") {
          return;
        }
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        checkAdminStatus(currentUser);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    setLoading(true);
    if (typeof window !== "undefined") {
      localStorage.removeItem("nighwan_mock_admin");
    }
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, isAdmin, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
}
