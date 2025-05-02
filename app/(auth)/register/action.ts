"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface RegisterFormData {
    email: string;
    password: string;
    username: string;
    }

export async function register( data: RegisterFormData) {
    const supabase = await createClient();

    const { data: user, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                username: data.username,
            },
        }
    });

    if (error) {
        return { error: error.message };
    }

    if (user) {
        revalidatePath('/', "layout");
        redirect('/channels/@me');
    }
}
