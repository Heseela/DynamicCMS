import { z } from "zod";

const NavLinkTypeSchema = z.enum(["internal", "external"]);

const NavLinkSchema = z.object({
  name: z.string().min(3, "Name must be between 3 and 20 characters")
              .max(20, "Name must be between 3 and 20 characters"),
  url: z.string().url("Invalid URL").min(1, "URL is required"),
  type: NavLinkTypeSchema,
});

export const FooterSchema = z.object({
  footerDescription: z.string().min(10, "Description must be at least 10 characters")
                         .max(500, "Description cannot exceed 500 characters"),
  navLinks: z.array(NavLinkSchema).min(1, "At least one navigation link is required"),
});

export type TFooterForm = z.infer<typeof FooterSchema> & {
  navLinks: Array<{ id?: string; name: string; url: string; type: "internal" | "external" }>;
};

export type TFooterAPI = {
  navLinks: Array<{
    name: string;
    url: string;
    type: "internal" | "external";
  }>;
  footerDescription: string;
};

export const FooterDefaultValues: TFooterForm = {
  footerDescription: "",
  navLinks: [{ name: "", url: "", type: "internal" }],
};