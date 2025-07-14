
import { z } from "zod";

const NavLinkTypeSchema = z.enum(["internal", "external"]);

const NavLinkSchema = z.object({
  name: z.string().min(3, "Name must be between 3 and 20 characters")
              .max(20, "Name must be between 3 and 20 characters"),
  url: z.string().url("Invalid URL").min(1, "URL is required"),
  type: NavLinkTypeSchema,
});

export const HeaderSchema = z.object({
  navLinks: z.array(NavLinkSchema).min(1, "At least one navigation link is required"),
});

export type THeaderForm = z.infer<typeof HeaderSchema> & {
  navLinks: Array<{ id?: string; name: string; url: string; type: "internal" | "external" }>;
};

export type THeaderAPI = {
  navLinks: Array<{
    name: string;
    url: string;
    type: "internal" | "external";
  }>;
};

export const HeaderDefaultValues: THeaderForm = {
  navLinks: [{ name: "", url: "", type: "internal" }],
};