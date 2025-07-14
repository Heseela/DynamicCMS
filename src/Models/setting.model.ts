import { z } from "zod";

export const GeneralSettingSchema = z.object({
  companyName: z.string().min(1, 'Required'),
  primaryLogoId: z.string().uuid(),
  secondaryLogoId: z.string().uuid().optional(),
  footerDescription: z.string().optional(),
  privacyPolicy: z.string().trim().min(1, 'Required'),
  termsAndConditions: z.string().trim().min(1, 'Required'),
  navLinks: z.array(z.any()).optional(),
});

export type TGeneralSettingSchema = z.infer<typeof GeneralSettingSchema>;

export type TGeneralSettingResponse = {
  id: string;
  companyName: string;
  primaryLogo: {
    id: string;
    url: string;
  };
  secondaryLogo?: {
    id: string;
    url: string;
  };
  footerDescription?: string;
  createdAt: string;
  updatedAt: string;
};

export type TPrivacyPolicyResponse = {
  data: string;
};

export type TTermsAndConditionsResponse = {
  data: string;
};