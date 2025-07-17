import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { PageSchema, type TPage, PageDefaultValues } from "../../../Models/pages.model";
import InputField from "../../form-component/input-form";
import SubmitButton from "../../../Global/Button";
import { useCustomMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import { Dialog, DialogContent, DialogHeader } from "../../ui/dialog";
import { useEffect } from "react";

type PageFormProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  pageValues?: Partial<TPage>;
  formTitle?: string;
  isEdit?: boolean;
};

const PageForm = ({ 
  open = true, 
  onOpenChange, 
  pageValues = PageDefaultValues, 
  formTitle = "Add",
  isEdit = false 
}: PageFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const form = useForm<TPage>({
    resolver: zodResolver(PageSchema),
    defaultValues: pageValues
  });

  useEffect(() => {
    form.reset(pageValues);
  }, [pageValues, form]);

  const { mutate, isPending } = useCustomMutation<TPage>({
    endPoint: isEdit ? `${QueryKey.PAGES}/${id}` : QueryKey.PAGES,
    queryKey: [QueryKey.PAGES],
    method: isEdit ? "patch" : "post",
  });

  const onSubmit = async (values: TPage) => {
    mutate(values, {
      onSuccess: (data) => {
        toast.success(`Page ${isEdit ? 'updated' : 'created'} successfully!`);
        onOpenChange?.(false);
        const slug = data?.slug || values.name.toLowerCase().replace(/\s+/g, '-');
        navigate(`/pages/${slug}`);
      },
      onError: (error) => {
        toast.error(error.message || `Failed to ${isEdit ? 'update' : 'create'} page`);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <h2 className="text-2xl text-primaryColor font-bold">
            {formTitle} Page
          </h2>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <InputField
              formField={{
                label: "Page Name",
                name: "name",
                type: "text",
                placeholder: "Enter page name",
                required: true,
              }}
            />
            <SubmitButton 
              isLoading={isPending} 
              title={`${formTitle} Page`} 
              showBackBtn={false}
            />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default PageForm;