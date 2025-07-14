import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../../form-component/input-form";
import SubmitButton from "../../../Global/Button";
import { useCustomMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import { useQueryClient } from "@tanstack/react-query";
import { BlogCategoryDefaultValues, BlogCategorySchema, type TBlogCategory } from "../../../Models/blog-categories.model";
import { Dialog, DialogContent, DialogHeader } from "../../ui/dialog";

type BlogCategoryPopupFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryValues?: TBlogCategory;
  id?: string;
  formTitle?: string;
};

const BlogCategoryPopupForm = ({ 
  open, 
  onOpenChange,
  categoryValues, 
  id, 
  formTitle = "Add Blog Category"
}: BlogCategoryPopupFormProps) => {
  const queryClient = useQueryClient();

  const form = useForm<TBlogCategory>({
    resolver: zodResolver(BlogCategorySchema),
    defaultValues: categoryValues || BlogCategoryDefaultValues,
  });

  const { mutate, isPending } = useCustomMutation<TBlogCategory>({
    endPoint: id ? `${QueryKey.BLOG_CATEGORIES}/${id}` : QueryKey.BLOG_CATEGORIES,
    queryKey: [QueryKey.BLOG_CATEGORIES],
    method: id ? "patch" : "post",
  });

  const onSubmit: SubmitHandler<TBlogCategory> = async (values) => {
    mutate(values, {
      onSuccess: () => {
        toast.success(id ? "Category updated!" : "Category created!");
        queryClient.invalidateQueries({ queryKey: [QueryKey.BLOG_CATEGORIES] });
        onOpenChange(false);
        form.reset();
      },
      onError: (error) => {
        toast.error(error.message || "Submission failed");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
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

export default BlogCategoryPopupForm;