import { z } from "zod";

export const GalleryCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const UpdateGalleryCategorySchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  addImageIds: z.array(z.string()).optional(),
  removeImageIds: z.array(z.string()).optional(),
});

export type TGalleryCategory = {
  id?: string;
  name: string;
  imageIds?: string[];
  createdAt?: string;
  updatedAt?: string;
  imagesCount?: number;
};

export type TUpdateGalleryCategory = z.infer<typeof UpdateGalleryCategorySchema>;

export const GalleryCategoryDefaultValues: TGalleryCategory = {
  name: "",
};

export type TAsyncGalleryCategory = TGalleryCategory & {
  id: string;
  createdAt: string;
  updatedAt: string;
  imagesCount?: number;
};

export type TAsyncGalleryCategories = TAsyncGalleryCategory[];

export type TGalleryCategoryOption = {
  value: string;
  label: string;
};

export type GalleryImage = {
    id: string;
    url: string;
    createdAt?: string;
    updatedAt?: string;
    categoryId?: string;
  };
  
  export type GalleryImagesResponse = {
    data: GalleryImage[];
    meta: {
      page: number;
      take: number;
      itemCount: number;
      pageCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  };