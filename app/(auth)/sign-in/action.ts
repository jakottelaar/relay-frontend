"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

type SignInData = {
  email: string;
  password: string;
};

export async function signIn(signInData: SignInData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(signInData);

  if (error) {
    redirect("/sign-in");
  }

  revalidatePath("/");
  redirect("/");
}
