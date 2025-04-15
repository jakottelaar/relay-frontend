"use client";
import { createClient } from "@/utils/supabase/client";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    window.location.href = "/";
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
