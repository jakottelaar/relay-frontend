import { redirect } from "next/navigation";

const Page = () => {
  redirect("/channels/@me");
};

export default Page;
