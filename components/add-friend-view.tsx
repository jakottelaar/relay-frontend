import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSendFriendRequest } from "@/hooks/relationships-hooks";
import { useState } from "react";

const addFriendSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
});

const AddFriendView = () => {
  const { mutate } = useSendFriendRequest();
  const [wasSuccessful, setWasSuccessful] = useState(false);

  const addFriendForm = useForm<z.infer<typeof addFriendSchema>>({
    resolver: zodResolver(addFriendSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof addFriendSchema>) {
    mutate(values.username, {
      onSuccess: () => {
        setWasSuccessful(true);
        addFriendForm.reset();
        setTimeout(() => {
          setWasSuccessful(false);
        }, 3000);
      },
      onError: () => {
        setWasSuccessful(false);
      },
    });
  }

  return (
    <div className="flex h-full w-full flex-col">
      <h1 className="text-xl font-semibold">Add Friend</h1>
      <p className="text-muted-foreground mt-1 mb-2 text-sm">
        To add a friend, enter their username below.
      </p>
      <Form {...addFriendForm}>
        <form
          onSubmit={addFriendForm.handleSubmit(onSubmit)}
          className="flex w-full flex-row gap-2"
        >
          <FormField
            control={addFriendForm.control}
            name="username"
            render={({ field, fieldState }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter username"
                    onChange={(e) => {
                      setWasSuccessful(false);
                      field.onChange(e);
                    }}
                    className={` ${fieldState.invalid ? "border-red-500 focus-visible:ring-red-500" : ""} ${wasSuccessful ? "border-green-500 focus-visible:ring-green-500" : ""} `}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="cursor-pointer bg-indigo-500 text-white duration-200 hover:bg-indigo-600"
            type="submit"
          >
            Add Friend
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddFriendView;
