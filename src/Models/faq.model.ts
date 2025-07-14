import { z } from "zod";
import type { TMeta } from "../Types/global.types";

export const FaqSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(["general", "admission","courses", "academics", "financial", "others"]),
  });
  
  export type TFaq = {
    title: string;
    description: string;
    category: "general" | "admission" |"courses" | "academics" | "financial" | "others";
  };
  
  export type TAsyncFaq = {
    id: string;
    createdAt: string;
    updatedAt: string;
  } & TFaq;
  
  export const FaqDefaultValues: TFaq = {
    title: "",
    description: "",
    category: "general",
  };
  export type TAsyncFaqs = {
    data: TAsyncFaq[];
    meta: TMeta;
  };