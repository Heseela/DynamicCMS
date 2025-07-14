import { z } from "zod";

export const BlogCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type TBlogCategory = z.infer<typeof BlogCategorySchema>;

export const BlogCategoryDefaultValues: TBlogCategory = {
  name: "",
};

export type TAsyncBlogCategory = {
  id: string;
  createdAt: string;
  updatedAt: string;
  blogscount?: number;
} & TBlogCategory;

export type TAsyncBlogCategories = TAsyncBlogCategory[];

export type TBlogCategoryOption = {
  value: string;
  label: string;
  
};