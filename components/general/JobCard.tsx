import Link from "next/link";
import React from "react";
import { Card, CardHeader } from "../ui/card";
import { MapIcon, MapPin, User2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/app/utils/formatCurrency";
import formatRelativeTime from "@/app/utils/formatRelativeTime";

interface iAppProps {
  job: {
    id: string;
    createdAt: Date;
    Company: {
      about: string;
      name: string;
      location: string;
      logo: string;
    };
    location: string;
    jobTitle: string;
    employmentType: string;
    salaryFrom: number;
    salaryTo: number;
  };
}

export default function JobCard({ job }: iAppProps) {
  return (
    <Link href={`/job/${job.id}`}>
      <Card className="hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:border-primary">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <Image
              src={job.Company.logo}
              alt={job.Company.name}
              width={48}
              height={48}
              className="rounded-lg size-12"
            />
            <div className="">
              <h1 className="text-xl font-semibold text-primary md:text-2xl">
                {job.jobTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <p className="text-sm text-muted-foreground">
                  {job.Company.name}
                </p>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <Badge className="rounded-full " variant={"secondary"}>
                  {job.employmentType}
                </Badge>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <Badge className="rounded-full " variant={"secondary"}>
                  {job.location}
                </Badge>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <p className="text-muted-foreground text-sm">
                  {formatCurrency(job.salaryFrom, "BAM")} -{" "}
                  {formatCurrency(job.salaryTo, "BAM")}
                </p>
              </div>
            </div>
            <div className="md:ml-auto text-right">
              <div className="flex items-center gap-2 justify-end">
                <MapPin className="size-4 text-muted-foreground " />
                <h1>{job.location}</h1>
              </div>
              <p className="text-sm text-muted-foreground md:text-right">
                {formatRelativeTime(job.createdAt)}
              </p>
            </div>
          </div>
          <div className="">
            <p className="text-base text-muted-foreground line-clamp-2 mt-5">
              {job.Company.about}
            </p>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
