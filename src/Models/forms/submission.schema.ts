import { z } from "zod";

export const FormSubmissionSchema = z.object({
  id: z.string().uuid("Form ID must be a valid UUID"),
  formId: z.string().uuid("Form ID must be a valid UUID"),
  data: z.record(z.unknown()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type TFormSubmission = z.infer<typeof FormSubmissionSchema>;

export const FormSubmissionCreateSchema = z.object({
    formSlug: z.string().min(1, "Form slug is required"),
    data: z
      .record(z.unknown())
      .refine(val => Object.keys(val).length > 0, {
        message: "Form data is required",
      }),
  });
export type TFormSubmissionCreate = z.infer<typeof FormSubmissionCreateSchema>;

export const FormDefaultValues = {
  formId: "",
  data: {}
};