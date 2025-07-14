import { z } from "zod";
import type { TMeta } from "../Types/global.types";

export const PageSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type TPage = z.infer<typeof PageSchema>;

export type TAsyncPage = {
  id: string;
  createdAt: string;
  slug: string;
} & TPage;

export const PageDefaultValues: Partial<TPage> = {
  name: "",
};

export type TAsyncPages = {
    data: TAsyncPage[],
    meta: TMeta
}