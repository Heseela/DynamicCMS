import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BlogDefaultValues, BlogSchema, type TBlog } from "../../../Models/blogs.model";
import { useQueryClient } from "@tanstack/react-query";
import { useBlogCategoryOptions } from "../../../Global/useBlogCategories";
import { useCustomMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import InputField from "../../form-component/input-form";
import TextAreaField from "../../form-component/textarea-form";
import SelectField from "../../form-component/select-form-field";
import SubmitButton from "../../../Global/Button";
import { ImageUploadField } from "../../form-component/image-upload";

type BlogFormProps = {
  blogValues?: TBlog;
  slug?: string;
  formTitle?: string;
};

const BlogForm = ({ blogValues, slug, formTitle }: BlogFormProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: categoryOptions } = useBlogCategoryOptions();

  const form = useForm<TBlog>({
    resolver: zodResolver(BlogSchema),
    defaultValues: blogValues || BlogDefaultValues,
  });

  const { mutate, isPending } = useCustomMutation<TBlog>({
    endPoint: slug ? `${QueryKey.BLOGS}/${slug}` : QueryKey.BLOGS,
    queryKey: [QueryKey.BLOGS],
    method: slug ? "patch" : "post",
  });

  const onSubmit: SubmitHandler<TBlog> = async (values) => {
    mutate(values, {
      onSuccess: () => {
        toast.success(slug ? "Blog updated!" : "Blog created!");
        queryClient.invalidateQueries({ queryKey: [QueryKey.BLOGS] });
        navigate("/blogs");
      },
      onError: (error) => {
        toast.error(error.message || "Submission failed");
      },
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{formTitle || (slug ? "Edit" : "Add")} Blog</h2>
      <hr />
      <div className="flex gap-5 justify-center">
        <section className="flex-1 border shadow-sm rounded-lg px-10 py-6 bg-white">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <InputField
                formField={{
                  label: "Title",
                  name: "title",
                  type: "text",
                  placeholder: "Enter blog title",
                  required: true,
                }}
              />

              <TextAreaField
                formField={{
                  label: "Summary",
                  name: "summary",
                  type: "textarea",
                  placeholder: "Enter blog summary",
                  required: true,
                }}
              />

              {categoryOptions && (
                <SelectField
                  formField={{
                    name: "categoryId",
                    label: "Category",
                    options: categoryOptions.map(option => ({
                      value: option.value,
                      label: option.label
                    })),
                    placeholder: "Select category",
                    required: true
                  }}
                />
              )}

              <ImageUploadField
                formField={{
                  name: "coverImageId",
                  label: "Cover Image",
                  type: "image", 
                  accept: "image/*",
                  required: true,
                }}
                imageURLs={blogValues?.coverImage?.url}
              />

              <ImageUploadField
                formField={{
                  name: "featuredImageId",
                  label: "Featured Image",
                  type: "image", 
                  accept: "image/*",
                  required: true, 
                }}
                imageURLs={blogValues?.featuredImage?.url}
              />
              <section className="w-full max-w-6xl overflow-x-hidden">

                <TextAreaField
                  formField={{
                    label: "Content",
                    name: "content",
                    type: "textarea",
                    placeholder: "Enter blog content here...",
                    required: true,
                  }}
                /></section>

              <SubmitButton
                isLoading={isPending}
                title={slug ? "Update" : "Save"}
              />
            </form>
          </FormProvider>
        </section>
      </div>
    </div>
  );
};

export default BlogForm;