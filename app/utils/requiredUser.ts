import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requiredUser() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return session.user;
}
