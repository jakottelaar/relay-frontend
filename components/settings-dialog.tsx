"use client";
import { LogOut, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function SettingsDialog() {
  const supabase = createClient();
  const [settingsTab, setSettingsTab] = useState("Edit profile");

  async function handleLogout () {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      return;
    }
    redirect("/login");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer justify-start border-none bg-zinc-800 text-zinc-400 transition-all duration-200 hover:bg-zinc-700 hover:text-zinc-200">
          <Pencil />
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-4/5 min-w-1/2 flex-row overflow-hidden border-none bg-zinc-800 p-0 outline-none">
        <DialogTitle className="sr-only" />
        <div className="flex h-full w-1/4 flex-col gap-2 bg-zinc-900 p-2">
          <Button className={`w-full cursor-pointer justify-start ${settingsTab === "Edit profile" ? "bg-zinc-700 text-zinc-200" : "bg-transparent text-zinc-400"} transition-all duration-200 hover:bg-zinc-700/10`} onClick={() => setSettingsTab("Edit profile")}>
            <Pencil />
            Edit profile
          </Button>
          <Button className="w-full cursor-pointer justify-start bg-transparent text-red-400 transition-all duration-200 hover:bg-red-500/10" onClick={handleLogout}>
            <LogOut />
            Logout
          </Button>
        </div>
        <div className="h-full w-3/4 p-2 flex flex-col justify-center">
          <Avatar>
            <AvatarFallback>
            </AvatarFallback>
            <AvatarImage />
          </Avatar>
        </div>
      </DialogContent>
    </Dialog>
  );
}
