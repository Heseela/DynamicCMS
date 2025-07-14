import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InputField from "../../form-component/input-form";
import TextAreaField from "../../form-component/textarea-form";
import SubmitButton from "../../../Global/Button";
import SelectField from "../../form-component/select-form-field";
import { useCustomMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import { useQueryClient } from "@tanstack/react-query";
import { JobDefaultValues, JobSchema, type TJob } from "../../../Models/job.model";

type JobFormProps = {
  jobValues?: TJob;
  id?: string;
  formTitle?: string;
};

const JobForm = ({ jobValues, id, formTitle }: JobFormProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<TJob>({
    resolver: zodResolver(JobSchema),
    defaultValues: jobValues || JobDefaultValues,
  });

  const { mutate, isPending } = useCustomMutation<TJob>({
    endPoint: id ? `${QueryKey.JOBS}/${id}` : QueryKey.JOBS,
    queryKey: [QueryKey.JOBS],
    method: id ? "patch" : "post",
  });

  const onSubmit: SubmitHandler<TJob> = async (values) => {
    mutate(values, {
      onSuccess: () => {
        toast.success(id ? "Job updated successfully!" : "Job created successfully!");
        queryClient.invalidateQueries({ queryKey: [QueryKey.JOBS] });
        navigate("/jobs");
      },
      onError: (error) => {
        toast.error(error.message || "Submission failed");
      },
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="title">{formTitle || (id ? "Edit" : "Add")} Job</h2>
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
                  placeholder: "Enter job title",
                  required: true,
                }}
              />

              <InputField
                formField={{
                  label: "Department",
                  name: "department",
                  type: "text",
                  placeholder: "Enter department name",
                  required: true,
                }}
              />

              <SelectField
                formField={{
                  name: "type",
                  label: "Job Type",
                  options: [
                    { value: "full-time", label: "Full Time" },
                    { value: "part-time", label: "Part Time" },
                    { value: "contract", label: "Contract" },
                    { value: "internship", label: "Internship" },
                  ],
                  placeholder: "Select job type",
                  required: true
                }}
              />

              <TextAreaField
                formField={{
                  label: "Description",
                  name: "description",
                  type: "textarea",
                  placeholder: "Enter job description",
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

export default JobForm;