"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { PasswordInput } from "./ui/password-input";
import { Button } from "./ui/button";
import { signIn } from "@/app/(auth)/sign-in/action";

const signInSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8).max(64),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function submitSignIn(values: z.infer<typeof signInSchema>) {
    try {
      signIn(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitSignIn)}
        className="mx-auto max-w-3xl space-y-6 rounded-md p-20 shadow-lg dark:shadow-none"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" type="email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer">
          Sign in
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
