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

export const jobSchema = z.object({
  jobTitle: z.string().min(2, "Job title must be at least 2 characters long"),
  employmentType: z.string().min(1, "Please select an employment type"),
  location: z.string().min(1, "Please select a location"),
  salaryFrom: z.number().min(1, "Salary form is required"),
  salaryTo: z.number().min(1, "Salary to is required"),
  jobDescription: z.string().min(10, "Please provide a job description"),
  listingDuration: z.number().min(1, "Please select a listing duration"),
  benefits: z.array(z.string()).min(1, "Please select at least one benefit"),
  companyName: z.string().min(1, "Please select a company"),
  CompanyLocation: z.string().min(1, "Please select a Company location"),
  companyAbout: z
    .string()
    .min(10, "Please provide a brief description of your company"),
  companyLogo: z.string().min(1, "Please upload a logo"),

  companyWebsite: z.string().min(1, "Please provide a valid URL"),
  companyXAccount: z.string().optional(),
});
