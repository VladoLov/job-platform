import { use } from "react";
import { prisma } from "../db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const handleJobExpiration = inngest.createFunction(
  { id: "job-expiration" },
  { event: "job/created" },

  async ({ event, step }) => {
    const { jobId, expirationDays } = event.data;

    await step.sleep("wait-for-expiration", `${expirationDays}d`);
    await step.run("update-job-status", async () => {
      await prisma.jobPost.update({
        where: { id: jobId },
        data: { status: "EXPIRED" },
      });
    });

    return { jobId, message: "Job marked as expired" };
  }
);

export const sendPeriodicJobListings = inngest.createFunction(
  { id: "send-periodic-job-listings" },
  { event: "jobseeker/created" },
  async ({ event, step }) => {
    const { userId, email } = event.data;

    const totalDays = 30; // Number of days to look back for job listings
    const intervalDays = 2; // Interval in days to send job listings
    let currentDay = 0; // Initialize current day counter

    while (currentDay < totalDays) {
      await step.sleep("wait-interval", `${intervalDays}d`);
      currentDay += intervalDays; // Increment the current day counter

      const recentJobs = await step.run("fetch-recent-jobs", async () => {
        return await prisma.jobPost.findMany({
          where: {
            status: "ACTIVE",
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5, // Fetch the latest 5 job listings
          include: {
            Company: {
              select: {
                name: true,
              },
            },
          },
        });
      });
      if (recentJobs.length > 0) {
        await step.run("send-email", async () => {
          // Send email logic here
          /*   console.log(
            `Sending email to ${email} with job listings: ${recentJobs}`
          ); */
          const jobListings = recentJobs
            .map(
              (job) =>
                `<div style="margin-bottom: 20px; padding: 10px; border: 1px solid #eee; border-radius: 5px;">
            <h3 style="margin: 0;">${job.jobTitle}</h3>
            <p style="font-size: 16px;">Company: ${job.Company.name}</p>
            <p style="font-size: 16px;">Location: ${job.location}</p>
            <p style="font-size: 16px;">Salary: ${job.salaryFrom.toLocaleString()} - ${job.salaryTo.toLocaleString()}</p>
            </div>`
            )
            .join("");

          /*   await resend.email.send({
            from: "Job Platform <qLz2F@example.com>",
            to: [email],
            subject: "Recent Job Listings",
            html: `<h2 style="font-size: 24px; margin-bottom: 20px;">Recent Job Listings</h2>
                <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #eee; border-radius: 5px;">
                <p style="font-size: 16px;">Hello ${event.data.name},</p>   
                ${jobListings}  
                </div>`,
          }); */
        });
      }
    }
    return { userId, message: "Job listings sent successfully" };
  }
);
