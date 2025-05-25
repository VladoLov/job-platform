"use server";

import { z } from "zod";
import { requiredUser } from "./requiredUser";
import { companySchema, jobSchema, jobSeekerSchema } from "./zodSchemas";
import { prisma } from "./db";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "./arcjet";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";
import { inngest } from "./inngest/client";

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

export async function createJob(data: z.infer<typeof jobSchema>) {
  const user = await requiredUser();

  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Request denied ");
  }

  const validatedData = jobSchema.parse(data);

  const company = await prisma.company.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  if (!company?.id) {
    return redirect("/");
  }

  const jobPost = await prisma.jobPost.create({
    data: {
      jobDescription: validatedData.jobDescription,
      jobTitle: validatedData.jobTitle,
      employmentType: validatedData.employmentType,
      location: validatedData.location,
      salaryFrom: validatedData.salaryFrom,
      salaryTo: validatedData.salaryTo,
      listingDuration: validatedData.listingDuration,
      benefits: validatedData.benefits,
      companyId: company.id,
    },
  });
  return redirect("/");
}

export async function saveJobPost(jobId: string) {
  const user = await requiredUser();

  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Request denied ");
  }

  await prisma.savedJobPost.create({
    data: {
      jobPostId: jobId,
      userId: user.id as string,
    },
  });
  revalidatePath(`/job/${jobId}`);
}
export async function unSaveJobPost(savedJobPostId: string) {
  const user = await requiredUser();

  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Request denied ");
  }

  const data = await prisma.savedJobPost.delete({
    where: {
      id: savedJobPostId,
      userId: user.id,
    },
    select: {
      jobPostId: true,
    },
  });
  revalidatePath(`/job/${data.jobPostId}`);
}

export async function editJobPost(
  data: z.infer<typeof jobSchema>,
  jobId: string
) {
  const user = await requiredUser();

  const req = await request();
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    throw new Error("Request denied ");
  }

  const validatedData = jobSchema.parse(data);

  await prisma.jobPost.update({
    where: {
      id: jobId,
      Company: {
        userId: user.id,
      },
    },
    data: {
      jobDescription: validatedData.jobDescription,
      jobTitle: validatedData.jobTitle,
      employmentType: validatedData.employmentType,
      location: validatedData.location,
      salaryFrom: validatedData.salaryFrom,
      salaryTo: validatedData.salaryTo,
      listingDuration: validatedData.listingDuration,
      benefits: validatedData.benefits,
    },
  });
  return redirect("/my-jobs");
}

export async function deleteJobPost(jobId: string) {
  const session = await requiredUser();

  const req = await request();
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    throw new Error("Request denied ");
  }

  await prisma.jobPost.delete({
    where: {
      id: jobId,
      Company: {
        userId: session.id,
      },
    },
  });

  await inngest.send({
    name: "job/cancel.expiration",
    data: { jobId: jobId },
  });
  return redirect("/my-jobs");
}
