import { z } from "zod";
import type { TMeta } from "../Types/global.types";

const ImageSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  originalName: z.string().optional(),
});

export const CourseDegreeSchema = z.enum([
  "post_graduate",
  "graduate",
  "undergraduate",
  "phd"
]);

export const CourseFacultySchema = z.enum([
  "science",
  "management",
  "humanity",
  "arts", 
  "law",
  "other"
]);

export const CourseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  summary: z.string().min(1, "Summary is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.number({
    required_error: "Duration is required",
    invalid_type_error: "Duration must be a number"
  }).min(1, "Duration must be at least 1 month"),
  degree: CourseDegreeSchema,
  faculty: CourseFacultySchema,
  eligibility: z.string().min(1, "Eligibility is required"),
  coverImageId: z.string().min(1, "Cover image is required"),
});

export type TCourse = z.infer<typeof CourseSchema> & {
  coverImage?: z.infer<typeof ImageSchema>;
};

export type TCourseDegree = z.infer<typeof CourseDegreeSchema>;
export type TCourseFaculty = z.infer<typeof CourseFacultySchema>;

export const CourseDefaultValues: TCourse = {
  name: "",
  summary: "",
  description: "",
  duration: 0,
  degree: "post_graduate",
  faculty: "science",
  eligibility: "",
  coverImageId: "",
  coverImage: undefined 
};

export type TAsyncCourse = {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
} & TCourse;

export type TAsyncCourses = {
  data: TAsyncCourse[];
  meta: TMeta;
};

export const COURSE_DEGREES = [
  { value: "post_graduate", label: "Post Graduate" },
  { value: "graduate", label: "Graduate" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "phd", label: "PhD" }
];

export const COURSE_FACULTIES = [
  { value: "science", label: "Science" },
  { value: "management", label: "Management" },
  { value: "humanity", label: "Humanity" },
  { value: "arts", label: "Arts" },
  { value: "law", label: "Law" },
  { value: "other", label: "Other" }
];