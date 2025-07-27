import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useCustomMutation } from "../../../../Global/custom-muation";
import { QueryKey } from "../../../../Types/query.types";
import { Dialog, DialogContent, DialogHeader } from "../../../ui/dialog";
import { MediaField } from "../../../form-component/media-upload/media-upload";
import { Button } from "../../../ui/button";
import MediaItem from "../../../form-component/media-upload/media-item";
import { FormControl, FormField, FormItem } from "../../../ui/form";

type UploadedMedia = {
  url: string;
  originalName: string;
};

type FormMedia = UploadedMedia & {
  imageId: string;
};

const imageUploadSchema = z.object({
  images: z.array(
    z.object({
      imageId: z.string(),
      url: z.string(),
      originalName: z.string(),
    })
  ).min(1, "At least one image is required"),
});

type GalleryImageUploadFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId?: string;
  onSuccess?: () => void;
};

const GalleryImageUploadForm = ({
  open,
  onOpenChange,
  categoryId,
  onSuccess,
}: GalleryImageUploadFormProps) => {
  const methods = useForm<z.infer<typeof imageUploadSchema>>({
    resolver: zodResolver(imageUploadSchema),
    defaultValues: {
      images: [],
    },
  });

  const { mutate, isPending } = useCustomMutation({
    endPoint: `${QueryKey.GALLERY_CATEGORIES}/${categoryId}`,
    queryKey: [QueryKey.GALLERY_CATEGORIES, categoryId],
    method: "patch",
  });

  const onSubmit = (data: z.infer<typeof imageUploadSchema>) => {
    const addImageIds = data.images.map(img => img.imageId);

    mutate({ addImageIds }, {
      onSuccess: () => {
        toast.success("Images uploaded successfully!");
        onOpenChange(false);
        methods.reset();
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error?.message || "Failed to upload images");
      },
    });
  };

  const handleMediaChange = (media: UploadedMedia[]) => {
    const currentImages = methods.getValues("images");
    const formattedMedia: FormMedia[] = media.map(item => ({
      ...item,
      imageId: `temp-${Math.random().toString(36).substring(2, 9)}`,
    }));
    methods.setValue("images", [...currentImages, ...formattedMedia]);
  };

  const handleRemoveImage = (index: number) => {
    const currentImages = methods.getValues("images");
    methods.setValue(
      "images",
      currentImages.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <h2 className="text-2xl font-bold">Upload Gallery Images</h2>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <FormField
              control={methods.control}
              name="images"
              render={({ field }) => {
                const value = field.value || [];
                return (
                  <FormItem>
                    <div className="space-y-4">
                      {value.length > 0 && (
                        <div className="grid grid-cols-6 gap-4">
                          {value.map((media, index) => (
                            <div key={media.imageId} className="relative group">
                              <MediaItem
                                media={media}
                                onRemove={() => handleRemoveImage(index)}

                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <FormControl>
                        <MediaField
                          onChange={handleMediaChange}
                          multiple
                          maxCount={10}
                          currentCount={value.length}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                );
              }}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Uploading..." : "Upload Images"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryImageUploadForm;