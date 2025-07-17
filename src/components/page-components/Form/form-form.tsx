import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FormSchema, type TForm } from "../../../Models/form.model";
import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import { FieldArray } from "./form-field-array";
import SubmitButton from "../../../Global/Button";
import InputField from "../../form-component/input-form";


type FormFormProps = {
  formValues?: TForm;
  slug?: string;
  formTitle?: string;
};

const FormForm = ({ formValues, slug, formTitle }: FormFormProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<TForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: formValues || {
      title: "",
      fields: [],
      submitBtnLabel: "Submit"
    },
  });

  const { mutate, isPending } = useCustomMutation<TForm>({
    endPoint: slug ? `${QueryKey.FORMS}/${slug}` : QueryKey.FORMS,
    queryKey: [QueryKey.FORMS],
    method: slug ? "patch" : "post",
  });

  const onSubmit: SubmitHandler<TForm> = async (values) => {
    mutate(values, {
      onSuccess: () => {
        toast.success(slug ? "Form updated!" : "Form created!");
        queryClient.invalidateQueries({ queryKey: [QueryKey.FORMS] });
        navigate("/form");
      },
      onError: (error) => {
        toast.error(error.message || "Submission failed");
      },
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        {formTitle || (slug ? "Edit" : "Create")} Form
      </h2>
      <hr />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <InputField
              formField={{
                name: "title",
                label: "Form Title",
                type: "text",
                placeholder: "Enter form title",
                required: true,
              }}
            />

            <FieldArray />

            <InputField
              formField={{
                name: "submitBtnLabel",
                label: "Submit Button Label",
                type: "text",
                placeholder: "Eg: Submit",
                required: true,
              }}
            />
          </div>

          <div className="flex justify-end gap-4">
            <SubmitButton
              isLoading={isPending}
              title={slug ? "Update" : "Save"}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormForm;

