import { z } from "zod";

export const mediaSchema = z.object({
    url: z.string().url(),
    originalName: z.string(),
});

export type TMediaSchema = z.infer<typeof mediaSchema>