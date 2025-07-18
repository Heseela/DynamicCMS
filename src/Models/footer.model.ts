import { z } from "zod";

const NavLinkTypeSchema = z.enum(["internal", "external"]);

const SubLinkSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters")
              .max(20, "Name must be less than 20 characters"),
  url: z.string().url("Invalid URL").min(1, "URL is required"),
  type: NavLinkTypeSchema
});

const NavLinkSchema = z.object({
  name: z.string().min(3, "Name must be between 3 and 20 characters")
              .max(20, "Name must be between 3 and 20 characters"),
  url: z.string().url("Invalid URL").min(1, "URL is required"),
  type: NavLinkTypeSchema,
  subLinks: z.array(SubLinkSchema).optional(),
});

export const FooterSchema = z.object({
  footerDescription: z.string().min(10, "Description must be at least 10 characters")
                         .max(500, "Description cannot exceed 500 characters"),
  navLinks: z.array(NavLinkSchema).min(1, "At least one navigation link is required"),
});

export type TSubLink = {
  id?: string;
  name: string;
  url: string;
  type: "internal" | "external";
  subLinks?: TSubLink[];
};

export type TNavLink = {
  id?: string;
  name: string;
  url: string;
  type: "internal" | "external";
  subLinks?: TSubLink[];
};

export type TFooterForm = {
  id?: string;
  footerDescription: string;
  navLinks: TNavLink[];
};

export type TFooterAPI = {
  id: string;
  footerDescription: string;
  navLinks: TNavLink[];
};

export const FooterDefaultValues: TFooterForm = {
  footerDescription: "",
  navLinks: [{ 
    name: "", 
    url: "", 
    type: "internal",
    subLinks: [] 
  }],
};