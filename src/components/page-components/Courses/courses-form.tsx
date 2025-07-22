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
import { ImageUploadField } from "../../form-component/image-upload";
import { COURSE_DEGREES, COURSE_FACULTIES, CourseDefaultValues, CourseSchema, type TCourse } from "../../../Models/courses.model";

type CourseFormProps = {
  courseValues?: TCourse;
  slug?: string;
  formTitle?: string;
};

const CourseForm = ({ courseValues, slug, formTitle }: CourseFormProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<TCourse>({
    resolver: zodResolver(CourseSchema),
    defaultValues: courseValues || CourseDefaultValues,
  });

  const { mutate, isPending } = useCustomMutation<TCourse>({
    endPoint: slug ? `${QueryKey.COURSES}/${slug}` : QueryKey.COURSES,
    queryKey: [QueryKey.COURSES],
    method: slug ? "patch" : "post",
  });

  const onSubmit: SubmitHandler<TCourse> = async (values) => {
    mutate(values, {
      onSuccess: () => {
        toast.success(slug ? "Course updated!" : "Course created!");
        queryClient.invalidateQueries({ queryKey: [QueryKey.COURSES] });
        navigate("/courses");
      },
      onError: (error) => {
        const errorMessage =
          error?.message ||
          "Submission failed";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="title">{formTitle || (slug ? "Edit" : "Add")} Course</h2>
      <hr />
      <div className="flex gap-5 justify-center">
        <section className="flex-1 border shadow-sm rounded-lg px-10 py-6 bg-white">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
              <InputField
                  formField={{
                    name: "name",
                    label: "Course Name",
                    type: "text",
                    placeholder: "Enter course name",
                    required: true,
                  }}
                />
                <InputField
                  formField={{
                    type: "number",
                    name: "duration",
                    label: "Duration (months)",
                    required: true
                  }}
                  valueAsNumber={true}
                />
              </div>

              <TextAreaField
                formField={{
                  name: "summary",
                  label: "Summary",
                  type: "textarea",
                  placeholder: "Enter short summary",
                  required: true,
                }}
              />

              <TextAreaField
                formField={{
                  name: "description",
                  label: "Description",
                  type: "textarea",
                  placeholder: "Enter detailed description",
                  required: true,
                }}
              />

              <TextAreaField
                formField={{
                  name: "eligibility",
                  label: "Eligibility Criteria",
                  type: "textarea",
                  placeholder: "Enter eligibility requirements",
                  required: true,
                }}
              />

              <div className="grid grid-cols-2 gap-6">
                <SelectField
                  formField={{
                    name: "degree",
                    label: "Degree Type",
                    options: COURSE_DEGREES,
                    placeholder: "Select degree type",
                    required: true,
                  }}
                />

                <SelectField
                  formField={{
                    name: "faculty",
                    label: "Faculty",
                    options: COURSE_FACULTIES,
                    placeholder: "Select faculty",
                    required: true,
                  }}
                />
              </div>

              <ImageUploadField
                formField={{
                  name: "coverImageId",
                  label: "Cover Image",
                  type: "image",
                  accept: "image/*",
                  required: true,
                }}
                imageURLs={courseValues?.coverImage?.url}
              />

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

export default CourseForm;