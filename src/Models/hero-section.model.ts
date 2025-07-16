import { z } from "zod";
import type { TMeta } from "../Types/global.types";

const CtaSchema = z.object({
  link: z.string().min(1, "Link is required"),
  text: z.string().min(1, "Text is required"),
  variant: z.enum(["primary", "secondary", "outline"]),
  icon: z.string().optional(),
});

const LayoutTypeSchema = z.enum(["jumbotron", "splitHero"]);
const AlignmentSchema = z.enum(["left", "center", "right"]);

const LayoutSchema = z.object({
  type: LayoutTypeSchema,
  alignment: AlignmentSchema,
});

export const HeroSectionSchema = z.object({
  id: z.string().optional(),
  headline: z.string().min(1, "Headline is required"),
  subheadline: z.string().optional(),
  imageId: z.string().optional(),
  cta: z.array(CtaSchema).optional(),
  layout: LayoutSchema,
});

export type THeroSection = z.infer<typeof HeroSectionSchema>;
export type TCta = z.infer<typeof CtaSchema>;
export type TLayout = z.infer<typeof LayoutSchema>;

export const HeroDefaultValues: THeroSection = {
    headline: "",
    subheadline: "",
    imageId: "",
    cta: [],
    layout: {
      type: "jumbotron",
      alignment: "left",
    },
  };

export type TAsyncHeroSection = {
  id: string;
  createdAt: string;
} & THeroSection;

export type TAsyncHeroSections = {
  data: TAsyncHeroSection[];
  meta: TMeta;
};

