import { prisma } from "@/app/utils/db";
import { requiredUser } from "@/app/utils/requiredUser";
import CopyLinkMenuItem from "@/components/general/CopyLink";
import EmptyState from "@/components/general/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CopyCheck, MoreHorizontal, Pen, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
async function getJobs(userId: string) {
  const data = await prisma.jobPost.findMany({
    where: {
      Company: {
        userId,
      },
    },
    select: {
      id: true,
      jobTitle: true,
      status: true,
      listingDuration: true,
      createdAt: true,

      Company: {
        select: {
          name: true,
          logo: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function MyJobs() {
  const session = await requiredUser();

  const data = await getJobs(session?.id as string);

  return (
    <>
      {data.length === 0 ? (
        <EmptyState
          title="No jobs found"
          description="Try to create a new job"
          href="/post-job"
          buttonText="Create a job"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">My Jobs</CardTitle>
            <CardDescription>
              Manage your job listings and view their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created at</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell>
                      <Image
                        src={listing.Company.logo}
                        alt="Company Logo"
                        width={40}
                        height={40}
                        className="rounded"
                      />
                    </TableCell>
                    <TableCell>{listing.Company.name}</TableCell>
                    <TableCell>{listing.jobTitle}</TableCell>
                    <TableCell>
                      {listing.status.charAt(0).toUpperCase() +
                        listing.status.slice(1).toLocaleLowerCase()}
                    </TableCell>
                    <TableCell>
                      {new Date(listing.createdAt).toLocaleDateString("DE", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant={"ghost"} size={"icon"}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/my-jobs/${listing.id}/edit`}>
                              <Pen className="mr-2 h-4 w-4" /> Edit Job
                            </Link>
                          </DropdownMenuItem>
                          {/*  <DropdownMenuItem asChild>
                            <Link href={`/my-jobs/${listing.id}/edit`}>
                              <CopyCheck className="mr-2 h-4 w-4" /> Copy Job
                              Url
                            </Link>

                            
                          </DropdownMenuItem> */}
                          <CopyLinkMenuItem
                            jobUrl={`${process.env.NEXT_PUBLIC_URL}/job/${listing.id}`}
                          />
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/my-jobs/${listing.id}/delete`}>
                              <XCircle className="mr-2 h-4 w-4" /> Delete Job
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
}
