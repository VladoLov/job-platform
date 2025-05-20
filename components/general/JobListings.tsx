import { prisma } from "@/app/utils/db";
import React from "react";
import EmptyState from "./EmptyState";
import JobCard from "./JobCard";
async function getData() {
  const data = await prisma.jobPost.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      jobTitle: true,
      id: true,
      salaryFrom: true,
      salaryTo: true,
      employmentType: true,
      location: true,
      createdAt: true,
      Company: {
        select: { name: true, location: true, logo: true, about: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function JobListings() {
  const data = await getData();
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col gap-6">
          {data.map((job) => (
            <JobCard key={job.id} job={job} /> // Pass the job data to JobCard component
          ))}
        </div>
      ) : (
        <EmptyState
          title="No job  found"
          description="Try to find a different job"
          href="/"
          buttonText="Clear filters"
        />
      )}
    </>
  );
}
