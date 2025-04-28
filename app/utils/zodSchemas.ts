import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(2, "Company name must be at least2 characters long"),
  location: z.string().min(1, "Location must defined"),
  about: z
    .string()
    .min(10, "Please provide a brief description of your company"),
  logo: z.string().min(1, "Please upload a logo"),
  website: z.string().url("Please provide a valid URL"),
  xAccount: z.string().optional(),
});

export const jobSeekerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  about: z.string().min(10, "Please provide a brief description of yourself"),
  resume: z.string().min(1, "Please upload a resume"),
});
