"use server";

import { z } from "zod";
import { requiredUser } from "./requiredUser";
import { companySchema, jobSeekerSchema } from "./zodSchemas";
import { prisma } from "./db";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "./arcjet";
import { request } from "@arcjet/next";

const aj = arcjet
  .withRule(
    shield({
      mode: "LIVE",
    })
  )
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  );

export async function createCompany(data: z.infer<typeof companySchema>) {
  const session = await requiredUser();

  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Request denied ");
  }

  const validatedData = companySchema.parse(data);

  await prisma.user.update({
    where: { id: session.id as string },
    data: {
      onboardingCompleted: true,
      userType: "COMPANY",
      Company: {
        create: {
          // about: validatedData.about,
          ...validatedData,
        },
      },
    },
  });
  return redirect("/");
}

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
  const user = await requiredUser();

  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Request denied ");
  }

  const validatedData = jobSeekerSchema.parse(data);

  await prisma.user.update({
    where: { id: user.id as string },
    data: {
      onboardingCompleted: true,
      userType: "JOB_SEEKER",
      JobSeeker: {
        create: {
          ...validatedData,
        },
      },
    },
  });
  return redirect("/");
}
