import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingJobPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-8 col-span-2">
          <div className="flex items-start  justify-between">
            <div className="">
              <Skeleton className="h-9 w-[300px] mb-2" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[120px]" />
              </div>
            </div>
          </div>
          <section className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
          </section>
          <section className="space-y-4">
            <Skeleton className="h-7 w-[200px] mb-4" />
            <div className="flex flex-wrap gap-3">
              {[...Array(23)].map((_, index) => (
                <Skeleton key={index} className="h-5 w-[140px] rounded-full" />
              ))}
            </div>
          </section>
        </div>
        <div className="">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="">
                <Skeleton className="h-6 w-[100px] mb-2" />
                <Skeleton className="h-6 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </Card>
          <Card className="p-6 ">
            <div className="space-y-4">
              <Skeleton className="h-6 w-[150px] mb-2" />
              <div className="space-y-2">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex justify-between gap-2">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-4 w-[120px]" />
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <Card className="p-6 ">
            <div className="space-y-4">
              <div className="flex items-center size-12">
                <Skeleton className="rounded-full size-12" />
                <div className="">
                  <Skeleton className="h-5 w-[150px] mb-2" />
                  <Skeleton className="h-5 w-[200px] " />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
