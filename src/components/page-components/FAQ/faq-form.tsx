import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaqDefaultValues, FaqSchema, type TFaq } from "../../../Models/faq.model";
import InputField from "../../form-component/input-form";
import TextAreaField from "../../form-component/textarea-form";
import SubmitButton from "../../../Global/Button";
import SelectField from "../../form-component/select-form-field";
import { useCustomMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import { useQueryClient } from "@tanstack/react-query";

type FormValues = {
  title: string;
  description: string;
  category: "general" | "admission" |"courses" | "academics" | "financial" | "others";
};

type FaqFormProps = {
  faqValues?: FormValues;
  id?: string;
  formTitle?: string;
};

const FaqForm = ({ faqValues, id, formTitle }: FaqFormProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(FaqSchema),
    defaultValues: faqValues || FaqDefaultValues,
  });

  const { mutate, isPending } = useCustomMutation<TFaq>({
    endPoint: id ? `${QueryKey.FAQS}/${id}` : QueryKey.FAQS,
    queryKey: [QueryKey.FAQS],
    method:id?"patch":"post",
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    mutate(values, {
      onSuccess: () => {
        toast.success(id ? "FAQ updated successfully!" : "FAQ created successfully!");
        queryClient.invalidateQueries({ queryKey: [QueryKey.FAQS] });
        navigate("/faqs");
      },
      onError: (error) => {
        toast.error(error.message || "Submission failed");
      },
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="title">{formTitle || (id ? "Edit" : "Add")} FAQ</h2>
      <hr />
      <div className="flex gap-5 justify-center">
        <section className="flex-1 border shadow-sm rounded-lg px-10 py-6 bg-white">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <SelectField
                formField={{
                  name: "category",
                  label: "Category",
                  options: [
                    { value: "general", label: "General" },
                    { value: "admission", label: "Admission" },
                    { value: "courses", label: "Courses" },
                    { value: "academics", label: "Academics" },
                    { value: "academics", label: "Academics" },
                    { value: "financial", label: "Financial" },
                    { value: "others", label: "Others" },
                  ],
                  placeholder: "Select Category",
                  required: true
                }}
              />

              <InputField
                formField={{
                  label: "Title",
                  name: "title",
                  type: "text",
                  placeholder: "Enter FAQ title",
                  required: true,
                }}
              />

              <TextAreaField
                formField={{
                  label: "Description",
                  name: "description",
                  type:"textarea",
                  placeholder: "Enter detailed description",
                  required: true,
                }}
              />

              <SubmitButton 
                isLoading={isPending} 
                title={id ? "Update" : "Save"} 
              />
            </form>
          </FormProvider>
        </section>
      </div>
    </div>
  );
};

export default FaqForm;