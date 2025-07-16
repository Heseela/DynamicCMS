import { z } from "zod";
import { FormFieldDefSchema } from "./field.schema";

export const FormDtoSchema = z.object({
  title: z.string().trim()
    .min(3, "Title must be between 3 and 50 characters")
    .max(50, "Title must be between 3 and 50 characters"),
  fields: z.array(FormFieldDefSchema)
    .min(1, "At least one field is required")
    .max(50, "Maximum 50 fields allowed"),
  submitBtnLabel: z.string().trim()
    .max(50, "Submit button label must be between 3 and 50 characters")
    .optional()
});

export type TFormDto = z.infer<typeof FormDtoSchema>;

export type TForm = TFormDto & {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};