import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../../form-component/input-form";
import SubmitButton from "../../../Global/Button";
import { useCustomMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader } from "../../ui/dialog";
import { 
  UpdateGalleryCategorySchema, 
  type TGalleryCategory, 
  type TUpdateGalleryCategory, 
  GalleryCategorySchema, 
  GalleryCategoryDefaultValues 
} from "../../../Models/gallery.model";

type GalleryCategoryPopupFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryValues?: TGalleryCategory;
  id?: string;
  formTitle?: string;
};

const GalleryCategoryPopupForm = ({
  open,
  onOpenChange,
  categoryValues,
  id,
  formTitle = "Add Gallery Category"
}: GalleryCategoryPopupFormProps) => {
  const queryClient = useQueryClient();

  const formSchema = id ? UpdateGalleryCategorySchema : GalleryCategorySchema;

  const form = useForm<TGalleryCategory | TUpdateGalleryCategory>({
    resolver: zodResolver(formSchema),
    defaultValues: categoryValues || GalleryCategoryDefaultValues,
  });

  const { mutate, isPending } = useCustomMutation<TGalleryCategory | TUpdateGalleryCategory>({
    endPoint: id ? `${QueryKey.GALLERY_CATEGORIES}/${id}` : QueryKey.GALLERY_CATEGORIES,
    queryKey: [QueryKey.GALLERY_CATEGORIES],
    method: id ? "patch" : "post",
  }); 

  const onSubmit: SubmitHandler<TGalleryCategory | TUpdateGalleryCategory> = async (values) => {
    const submissionData = id ? {
      name: values.name,
      ...(values as TUpdateGalleryCategory).addImageIds && { addImageIds: (values as TUpdateGalleryCategory).addImageIds },
      ...(values as TUpdateGalleryCategory).removeImageIds && { removeImageIds: (values as TUpdateGalleryCategory).removeImageIds }
    } : values;

    mutate(submissionData, {
      onSuccess: () => {
        toast.success(id ? "Category updated!" : "Category created!");
        queryClient.invalidateQueries({ queryKey: [QueryKey.GALLERY_CATEGORIES] });
        queryClient.invalidateQueries({ queryKey: [QueryKey.GALLERY_IMAGES] });
        onOpenChange(false);
        form.reset();
      },
      onError: (error) => {
        toast.error(error?.message || "Submission failed");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined} className="max-w-2xl">
        <DialogHeader>
          <h2 className="text-2xl font-bold">{formTitle}</h2>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <InputField
              formField={{
                name: "name",
                label: "Category Name",
                type: "text",
                placeholder: "Enter category name",
                required: true,
              }}
            />

            <SubmitButton
              isLoading={isPending}
              title={id ? "Update" : "Save"}
            />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryCategoryPopupForm;