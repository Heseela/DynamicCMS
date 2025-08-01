import { z } from "zod";
import { EBlock, ECardsBlockLayout } from "../Types/blocks.types";
import { CTADtoSchema, HeroSectionDtoSchema } from "./hero.model";
import { EAlignment, ELinkType, EOrder, ERefRelation } from "../Types/global.types";
import { mediaSchema } from "./media.model";

// ---- BaseBlock ----
export const BaseBlockSchema = z.object({
    type: z.nativeEnum(EBlock),
});

// ---- TextBlockDto ----
export const TextBlockSchema = BaseBlockSchema.extend({
    type: z.literal(EBlock.Text),
    headline: z

        .string()
        .trim()
        .min(3, { message: "Headline must be between 3 and 50 characters" })
        .max(50, { message: "Headline must be between 3 and 50 characters" }),
    subheadline: z
        .string()
        .trim()
        .max(300, { message: "Subheadline must be between 3 and 300 characters" }),
    body: z
        .string()
        .trim()
        .max(1000, { message: "Body must be less than 1000 characters" }),
    cta: z
        .array(CTADtoSchema)
        .max(2, { message: "CTA must be less than 2" }),
    align: z.nativeEnum(EAlignment),
});

// ---- ImageBlockDto ----
export const ImageBlockSchema = BaseBlockSchema.extend({
    type: z.literal(EBlock.Image),
    images: z.array(mediaSchema).min(1, { message: "At least one image is required" }),
});

// ---- CardDto ----
export const CardSchema = z.object({
    title: z
        .string({ required_error: "Title is required" })
        .trim()
        .min(3, { message: "Title must be between 3 and 50 characters" })
        .max(50, { message: "Title must be between 3 and 50 characters" }),
    subtitle: z
        .string()
        .trim()
        .max(50, { message: "Title must be between 3 and 50 characters" })
        .optional(),
    description: z
        .string()
        .trim()
        .max(300, { message: "Description must be between 3 and 300 characters" })
        .optional(),
    link: z
        .object({
            url: z.string(),
            type: z.nativeEnum(ELinkType),
        })
        .optional()
        .refine((data) => {
            if (!data) return true;
            if (data.type === ELinkType.External && !z.string().url().safeParse(data.url).success) return false;
            return true;
        }, "Invalid URL"),
        image: z.object({
            imageId: z.string().min(1, "Image ID is required"),
            url: z.string().optional(),
            originalName: z.string().optional(),
        }).nullish(),
});

// ---- CardsBlockDto ----
export const CardsBlockSchema = BaseBlockSchema.extend({
    type: z.literal(EBlock.Cards),
    layout: z.nativeEnum(ECardsBlockLayout),
    maxColumns: z.coerce.number().int().min(1),
    cards: z
        .array(CardSchema)
        .min(1, { message: "At least one card is required" }),
    borderLess: z.boolean(),
    newTab: z.boolean(),
});

// ---- RefItemBlockDto ----
export const RefItemBlockSchema = BaseBlockSchema.extend({
    type: z.literal(EBlock.RefItem),
    ref: z.nativeEnum(ERefRelation),
    limit: z.coerce.number().int().min(1),
    order: z.nativeEnum(EOrder),
    selected: z.array(z.object({ // manually choosen items by the user
        value: z.string().min(1, { message: "Value is required" }),
        label: z.string().min(1, { message: "Label is required" }),
    })).optional(),
});

// ---- FormBlockDto ----
export const FormBlockSchema = BaseBlockSchema.extend({
    type: z.literal(EBlock.Form),
    form: z.object({
        id: z.string({ required_error: "Form id is required" }).uuid({ message: "Please select a form" }),
        title: z.string().min(1, { message: "Title is required" }),
    }),
    introContent: z.string().max(500, { message: "Intro content must be at most 500 characters long" }).optional(),
});

// ---- Discriminated union of all blocks ----
export const BlockSchema = z.discriminatedUnion("type", [
    TextBlockSchema,
    ImageBlockSchema,
    CardsBlockSchema,
    RefItemBlockSchema,
    FormBlockSchema,
]);

export type TBlock = z.infer<typeof BlockSchema>;

// Types
export type TImageBlock = z.infer<typeof ImageBlockSchema>;
export type TCard = z.infer<typeof CardSchema>;

export const cardDefaultValues: TCard = {
    title: "",
    subtitle: "",
    description: "",
    link: undefined,
    image: undefined,
};

// ---- PageBlocksDto ----
export const PageBlocksSchema = z.object({
    direction: z.enum(["horizontal", "vertical"]),
    items: z.array(BlockSchema),
});

// ---- PageSectionDto ----
export const PageSectionSchema = z
    .object({
        headline: z
            .string()
            .trim()
            .max(50, { message: "Headline must be between 3 and 50 characters" }),
        subheadline: z
            .string()
            .trim()
            .max(300, { message: "Subheadline must be between 10 and 300 characters" })
            .optional(),
        blocks: z.array(PageBlocksSchema).optional()
    })
    .strict();
    
export type TPageSection = z.infer<typeof PageSectionSchema>;

export const MetadataDtoSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, { message: "Title must be between 3 and 50 characters" })
        .max(100, { message: "Title must be between 3 and 100 characters" }),
    description: z
        .string()
        .trim()
        .max(300, { message: "Description must be between 3 and 300 characters" }),
    keywords: z.array(z.string().max(50, "Keyword must be at most 50 characters").trim()).max(10, "You can add up to 10 keywords only"),
});

export type TMetadataDto = z.infer<typeof MetadataDtoSchema>;

// ---- PageDtoSchema ----
export const PageDtoSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }).max(50, { message: "Name must be at most 50 characters long" }),
    sections: z.array(PageSectionSchema).min(1, { message: "At least one section is required" }).max(20, { message: "Max 20 sections allowed" }),
    metadata: MetadataDtoSchema,
    heroSections: z
        .array(HeroSectionDtoSchema)
        .max(5, { message: "Hero Sections must be less than 5" }),
});

export type TPageDto = z.infer<typeof PageDtoSchema>;