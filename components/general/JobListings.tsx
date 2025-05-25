import { prisma } from "@/app/utils/db";
import React from "react";
import EmptyState from "./EmptyState";
import JobCard from "./JobCard";
import MainPagination from "./MainPagination";
import { JobPostStatus } from "@/lib/generated/prisma";
async function getData({
  page = 1,
  pageSize = 3,
  jobTypes = [],
  location = "",
}: {
  page: number;
  pageSize: number;
  jobTypes: string[];
  location: string;
}) {
  /* await new Promise((resolve) => setTimeout(resolve, 1000)); */ // Simulate a delay
  const skip = (page - 1) * pageSize;

  const where = {
    status: JobPostStatus.ACTIVE,
    ...(jobTypes.length > 0 && { employmentType: { in: jobTypes } }),
    ...(location && location !== "worldwide" && { location: location }),
  };

  const [data, totalCount] = await Promise.all([
    prisma.jobPost.findMany({
      /*   where: {
        status: "ACTIVE",
      }, */
      where,
      take: pageSize,
      skip: skip,
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
    }),
    prisma.jobPost.count({
      where: {
        status: "ACTIVE",
      },
    }),
  ]);
  return {
    jobs: data,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

export default async function JobListings({
  currentPage,
  jobTypes,
  location,
}: {
  currentPage: number;
  jobTypes: string[];
  location: string;
}) {
  /* const data = await getData(); */
  const { jobs, totalPages } = await getData({
    page: currentPage,
    pageSize: 3,
    jobTypes: jobTypes,
    location: location,
  });

  return (
    <>
      {jobs.length > 0 ? (
        <div className="flex flex-col gap-6">
          {jobs.map((job) => (
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
      <div className="flex justify-center m-6">
        <MainPagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  );
}
