"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface LoginFormData {
    email: string;
    password: string;
    }

export async function login( data: LoginFormData) {
    const supabase = await createClient();

    const { data: user, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
    });

    if (error) {
        return { error: error.message };
    }

    if (user) {
        revalidatePath('/', "layout");
        redirect('/channels/@me');
    }
}