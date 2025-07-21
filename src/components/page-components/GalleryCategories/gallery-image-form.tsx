import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useCustomMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader } from "../../ui/dialog";
import SubmitButton from "../../../Global/Button";
import { ImageUploadField } from "../../form-component/image-upload";
import { z } from "zod";

export const GalleryImageSchema = z.object({
  imageIds: z.array(z.string()).min(1, "At least one image is required"),
});

export type TGalleryImageForm = z.infer<typeof GalleryImageSchema>;

type GalleryImageFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string;
};

const GalleryImageForm = ({ open, onOpenChange, categoryId }: GalleryImageFormProps) => {
  const queryClient = useQueryClient();

  const form = useForm<TGalleryImageForm>({
    resolver: zodResolver(GalleryImageSchema),
    defaultValues: {
      imageIds: [],
    },
  });

  const { mutate, isPending } = useCustomMutation<TGalleryImageForm>({
    endPoint: `${QueryKey.GALLERY_CATEGORIES}/${categoryId}`,
    queryKey: [QueryKey.GALLERY_CATEGORIES, QueryKey.GALLERY_IMAGES],
    method: "patch",
  });

  const onSubmit: SubmitHandler<TGalleryImageForm> = async (values) => {
    mutate(
      { addImageIds: values.imageIds },
      {
        onSuccess: () => {
          toast.success("Images added successfully!");
          queryClient.invalidateQueries({
            queryKey: [QueryKey.GALLERY_CATEGORIES, QueryKey.GALLERY_IMAGES]
          });
          onOpenChange(false);
          form.reset();
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to add images");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <h2 className="text-2xl font-bold">Add Images to Gallery</h2>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <ImageUploadField
              formField={{
                name: "imageIds",
                label: "Upload Images",
                type: "image",
                accept: "image/*",
                multiple: true,
                required: true,
                maxCount: 5,
                maxSize: 2,
              }}

            />

            <SubmitButton
              isLoading={isPending}
              title="Upload Images"
            />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryImageForm;