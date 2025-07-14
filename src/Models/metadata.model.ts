import { z } from "zod";
import type { TMeta } from "../Types/global.types";

export const MetadataSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

export type TMetadata = z.infer<typeof MetadataSchema>;

export const MetadataDefaultValues: TMetadata = {
  title: "",
  description: "",
  keywords: [],
};

export type TAsyncMetadata = {
  id: string;
  createdAt: string;
} & TMetadata;

export type TAsyncMetadatas = {
  data: TAsyncMetadata[];
  meta: TMeta;
};