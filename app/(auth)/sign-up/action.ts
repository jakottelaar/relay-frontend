"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

type SignUpData = {
  username: string;
  email: string;
  password: string;
};

export async function signUp(signUpData: SignUpData) {
  const supabase = await createClient();

  const inputData = {
    username: signUpData.username,
    email: signUpData.email,
    password: signUpData.password,
  };

  const inputCredentials = {
    email: inputData.email,
    password: inputData.password,
    options: {
      data: {
        username: inputData.username,
      },
    },
  };

  const { error } = await supabase.auth.signUp(inputCredentials);

  if (error) {
    redirect("/sign-up");
  }

  revalidatePath("/");
  redirect("/");
}
