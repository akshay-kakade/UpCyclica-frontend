import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { PropsWithChildren } from "react";

export default async function ProtectedLayout({ children }: PropsWithChildren) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return <>{children}</>;
}
