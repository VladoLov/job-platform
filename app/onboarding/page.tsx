import OnboardingForm from "@/components/forms/onboarding/OnboardingForm";
import React from "react";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";
import { requiredUser } from "../utils/requiredUser";

async function checkIfUserFinishedOnboarding(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      onboardingCompleted: true,
    },
  });
  if (user?.onboardingCompleted === true) {
    return redirect("/");
  }
  return user;
}

export default async function OnboardingPage() {
  const session = await requiredUser();
  await checkIfUserFinishedOnboarding(session.id as string); // Replace with actual user ID from session or context
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center py-10">
      <OnboardingForm />
    </div>
  );
}
