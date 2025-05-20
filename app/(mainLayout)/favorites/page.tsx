import { prisma } from "@/app/utils/db";
import { requiredUser } from "@/app/utils/requiredUser";
import EmptyState from "@/components/general/EmptyState";
import JobCard from "@/components/general/JobCard";
import React from "react";

async function getFavorites(userId: string) {
  const data = await prisma.savedJobPost.findMany({
    where: {
      userId,
    },
    select: {
      JobPost: {
        select: {
          id: true,
          jobTitle: true,
          jobDescription: true,
          location: true,
          salaryFrom: true,
          salaryTo: true,
          employmentType: true,
          listingDuration: true,
          createdAt: true,
          benefits: true,
          Company: {
            select: {
              name: true,
              logo: true,
              about: true,
              location: true,
            },
          },
        },
      },
    },
  });
  return data;
}

export default async function FavoritesPage() {
  const session = await requiredUser();
  const data = await getFavorites(session?.id as string);

  if (!data) {
    return (
      <EmptyState
        title="No favorites found"
        description="Try to find a different job"
        href="/"
        buttonText="Clear filters"
      />
    );
  }
  return (
    <div className="grid grid-cols-1 mt-5 gap-4">
      {data.map((favorite) => (
        <JobCard key={favorite.JobPost.id} job={favorite.JobPost} />
      ))}
    </div>
  );
}
