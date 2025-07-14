// import { z } from "zod";

// export const BlogSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   summary: z.string().min(1, "Summary is required"),
//   content: z.string().min(1, "Content is required"),
//   featuredImageId: z.string().uuid("Featured Image ID must be a valid UUID").optional(),
//   coverImageId: z.string().uuid("Cover Image ID must be a valid UUID").optional(),
//   categoryId: z.string().min(1, "Category is required"),
// });

// export type TBlog = z.infer<typeof BlogSchema>;

// export const BlogDefaultValues: TBlog = {
//   title: "",
//   summary: "",
//   content: "",
//   featuredImageId: "",
//   coverImageId: "",
//   categoryId: "",
// };

// export type TAsyncBlog = {
//   id: string;
//   slug: string;
//   createdAt: string;
//   updatedAt: string;
// } & TBlog;

// export type TAsyncBlogs = {
//   data: TAsyncBlog[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     totalPages: number;
//   };
// };


import { z } from "zod";

const ImageSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  originalName: z.string().optional(),
});

export const BlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  content: z.string().min(1, "Content is required"),
  featuredImageId: z.string().uuid("Featured Image ID must be a valid UUID").optional(),
  coverImageId: z.string().uuid("Cover Image ID must be a valid UUID").optional(),
  categoryId: z.string().min(1, "Category is required"),
});

type TBlogBase = z.infer<typeof BlogSchema>;

export type TBlog = TBlogBase & {
  featuredImage?: z.infer<typeof ImageSchema>;
  coverImage?: z.infer<typeof ImageSchema>;
};

export const BlogDefaultValues: TBlogBase = {
  title: "",
  summary: "",
  content: "",
  featuredImageId: "",
  coverImageId: "",
  categoryId: "",
};

export type TAsyncBlog = {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
} & TBlog;

export type TAsyncBlogs = {
  data: TAsyncBlog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};