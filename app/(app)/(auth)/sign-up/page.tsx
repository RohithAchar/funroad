import { redirect } from "next/navigation";

import { caller } from "@/trpc/server";

import SignUp from "@/modules/auth/ui/views/sign-up-view";

const Page = async () => {
  const session = await caller.auth.session();

  if (session.user) redirect("/");

  return <SignUp />;
};

export default Page;
