import { saveJobPost, unSaveJobPost } from "@/app/utils/actions";
import arcjet from "@/app/utils/arcjet";
import { auth } from "@/app/utils/auth";
import { getFlagEmoji } from "@/app/utils/countriesList";
import { prisma } from "@/app/utils/db";
import { benefits } from "@/app/utils/listOfBenefits";
import JsonToHtml from "@/components/general/JsonToHtml";
import { SaveJobButton } from "@/components/general/SubmitButtons";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { detectBot, fixedWindow, request, tokenBucket } from "@arcjet/next";

import { Heart, Save } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { Form } from "react-hook-form";

const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
  })
);
/*  .withRule(
    fixedWindow({
      mode: "LIVE",
      max: 10,
      window: "60s",
    })
  ); */

// one way how to use arcjet in nextjs app

function getClientIp(session: boolean) {
  if (session) {
    return aj.withRule(
      tokenBucket({
        mode: "LIVE",
        capacity: 600,
        interval: "60s",
        refillRate: 20,
      })
    );
  } else {
    return aj.withRule(
      tokenBucket({
        mode: "LIVE",
        capacity: 60,
        interval: "60s",
        refillRate: 10,
      })
    );
  }
}

async function getJob(jobId: string, userId?: string) {
  /* const jobData = await prisma.jobPost.findUnique({
    where: {
      status: "ACTIVE",
      id: jobId, // Replace with actual jobId
    },
    select: {
      jobTitle: true,
      jobDescription: true,
      salaryFrom: true,
      salaryTo: true,
      employmentType: true,
      location: true,
      createdAt: true,
      benefits: true,
      listingDuration: true,
      Company: {
        select: { name: true, location: true, logo: true, about: true },
      },
    },
  }); */

  //later we can use this to get the jobId from the url and pass it to the function
  // const { jobId } = params; // Destructure jobId from params
  //and pass savedJob to the function
  const [jobData, savedJob] = await Promise.all([
    await prisma.jobPost.findUnique({
      where: {
        status: "ACTIVE",
        id: jobId, // Replace with actual jobId
      },
      select: {
        jobTitle: true,
        jobDescription: true,
        salaryFrom: true,
        salaryTo: true,
        employmentType: true,
        location: true,
        createdAt: true,
        benefits: true,
        listingDuration: true,
        Company: {
          select: { name: true, location: true, logo: true, about: true },
        },
      },
    }),
    userId
      ? prisma.savedJobPost.findUnique({
          where: {
            jobPostId_userId: {
              jobPostId: jobId,
              userId: userId,
            },
          },
          select: {
            id: true,
          },
        })
      : null,
  ]);

  if (!jobData) {
    return notFound();
  }

  return { jobData, savedJob }; // Return the job data and saved job status
}

type Params = Promise<{ jobId: string }>; // Define the type for jobId parameter same as folder name

export default async function JobIdPage({ params }: { params: Params }) {
  const { jobId } = await params; // Destructure jobId from params

  const session = await auth();

  const req = await request(); // Get the request object

  /*  const decision = await aj.protect(req);  */ // Protect the jobId using arcjet
  // !!session is converted to boolean value, if session is null or undefined it will be false
  const decision = await getClientIp(!!session).protect(req, { requested: 10 }); // Protect the jobId using arcjet
  if (decision.isDenied()) {
    throw new Error("Request denied "); // Handle the case when the request is denied
  }

  const { jobData: data, savedJob } = await getJob(jobId, session?.user?.id); // Fetch job data

  const locationFlag = getFlagEmoji(data.location);
  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
      <div className="space-y-8">
        {/* Job details and description will go here */}
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="text-3xl font-bold">Marketing Manager</h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="font-medium">{data.jobTitle}</p>
              <span className="hidden md:inline text-muted-foreground">*</span>
              <Badge className="rounded-full" variant={"secondary"}>
                {data.employmentType}
              </Badge>
              <span className="hidden md:inline text-muted-foreground">*</span>
              <Badge className="rounded-full" variant={"secondary"}>
                {locationFlag && <span className="mr-1">{locationFlag}</span>}
                {data.location}
              </Badge>
            </div>
          </div>
          {/*   <Button variant={"outline"} className="cursor-pointer">
            <Heart size={20} />
            Save Job
          </Button> */}
          {session?.user ? (
            <form
              action={
                savedJob
                  ? unSaveJobPost.bind(null, savedJob.id)
                  : saveJobPost.bind(null, jobId)
              }
            >
              <SaveJobButton savedJob={!!savedJob} />
              {/* we use !! to convert savedJob to boolean */}
            </form>
          ) : (
            <Link
              className={buttonVariants({ variant: "outline" })}
              href={"/login"}
            >
              <Heart size={20} />
              Save Job
            </Link>
          )}
        </div>
        <section className="">
          {/* <JsonToHtml json={JSON.parse(data.jobDescription)} /> */}
          <p>{data.jobDescription}</p>
        </section>
        <section className="">
          <h3 className="font-semibold mb-4">
            Benefits{" "}
            <span className="text-sm text-muted-foreground">
              (purple is offered)
            </span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {benefits.map((benefit) => {
              const isOffered = data.benefits.includes(benefit.id);
              return (
                <Badge
                  key={benefit.id}
                  variant={isOffered ? "default" : "outline"}
                  className={cn(
                    isOffered ? "" : "opacity-75 cursor-not-allowed",
                    "text-sm px-4 py-1.5 rounded-full"
                  )}
                >
                  {benefit.label}
                </Badge>
              );
            })}
          </div>
        </section>
      </div>
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="">
              <h3 className="font-semibold">Apply now</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Please let {data.Company.name} know you found this job on Job
                Platform
              </p>
            </div>
            <Button className="w-full">Apply now</Button>
          </div>
        </Card>
        {/** Job details card */}
        <Card className="p-6">
          <h3 className="font-semibold">About Job</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Posted on</span>
              <span className="text-sm">
                {data.createdAt.toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Apply Before
              </span>
              <span className="text-sm text-red-700">
                {new Date(
                  data.createdAt.getTime() +
                    data.listingDuration * 24 * 60 * 60 * 1000
                ).toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Employment type
              </span>
              <span className="text-sm">{data.employmentType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Location</span>
              <span className="text-sm">
                {" "}
                {locationFlag && <span className="mr-1">{locationFlag}</span>}
                {data.location}
              </span>
            </div>
          </div>
        </Card>
        {/** Company details card */}
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Image
              src={data.Company.logo}
              alt={data.Company.name}
              width={50}
              height={50}
              className="size-12 rounded-full"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold">{data.Company.name}</h3>
              <p className="text-sm text-muted-foreground">
                {data.Company.location}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
