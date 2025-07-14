import { z } from "zod";

const SocialProfileSchema = z.object({
  url: z.string().url("Invalid URL").min(1, "URL is required"),
});

const PhoneSchema = z.object({
  number: z.string()
    .min(1, "Phone is required")
    .regex(/^[0-9]+$/, "Phone must contain only numbers")
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone can't be longer than 15 digits"),
});

const EmailSchema = z.object({
  address: z.string().email("Invalid email").min(1, "Email is required"),
});

export const CompanyInfoSchema = z.object({
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  phones: z.array(PhoneSchema).min(1, "At least one phone is required"),
  mapLink: z.string().url("Invalid URL").optional(),
  emails: z.array(EmailSchema).min(1, "At least one email is required"),
  workingHours: z.string().min(1, "Working hours are required"),
  socialProfiles: z.array(SocialProfileSchema),
});

export type TCompanyInfoForm = z.infer<typeof CompanyInfoSchema> & {
  socialProfiles: Array<{ id?: string; url: string }>;
  phones: Array<{ id?: string; number: string }>;
  emails: Array<{ id?: string; address: string }>;
};

export type TCompanyInfoAPI = {
  city: string;
  address: string;
  phone: string[];
  mapLink?: string;
  email: string[];
  workingHours: string;
  socialProfiles: string[];
};

export const CompanyInfoDefaultValues: TCompanyInfoForm = {
  city: "",
  address: "",
  phones: [{ number: "" }],
  mapLink: "",
  emails: [{ address: "" }],
  workingHours: "",
  socialProfiles: [],
};