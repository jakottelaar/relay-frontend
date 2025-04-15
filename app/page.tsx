"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

const Page = () => {
  const supabase = createClient();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      Page
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
};

export default Page;
