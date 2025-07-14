import { z } from "zod";
import type { TMeta } from "../Types/global.types";

export const JobTypes = ["full-time", "part-time", "contract", "internship"] as const;
export type TJobType = typeof JobTypes[number];

export const JobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  department: z.string().min(1, "Department is required"),
  type: z.enum(JobTypes),
  description: z.string().min(1, "Description is required"),
});

export type TJob = {
  title: string;
  department: string;
  type: TJobType;
  description: string;
};

export type TAsyncJob = {
  id: string;
  createdAt: string;
  updatedAt: string;
} & TJob;

export const JobDefaultValues: TJob = {
  title: "",
  department: "",
  type: "full-time",
  description: "",
};

export type TAsyncJobs = {
  data: TAsyncJob[];
  meta: TMeta;
};