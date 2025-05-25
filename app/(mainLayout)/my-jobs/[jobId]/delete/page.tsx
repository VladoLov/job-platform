import { deleteJobPost } from "@/app/utils/actions";
import { requiredUser } from "@/app/utils/requiredUser";
import GeneralSubmitButton from "@/components/general/SubmitButtons";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

type Params = Promise<{ jobId: string }>;

export default async function DeleteJob({ params }: { params: Params }) {
  const { jobId } = await params;
  await requiredUser();
  return (
    <div>
      <Card className="w-full max-w-lg mx-auto mt-30">
        <CardHeader>
          <CardTitle>Are you sure you want to delete this job?</CardTitle>
          <CardDescription>
            This action cannot be undone. Please confirm that you want to delete
            this job.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-between">
          <Link
            href="/my-jobs"
            className={buttonVariants({ variant: "secondary" })}
          >
            <ArrowLeft />
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";
              await deleteJobPost(jobId);
            }}
          >
            <GeneralSubmitButton
              text="Delete Job"
              variant={"destructive"}
              icon={<Trash />}
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
