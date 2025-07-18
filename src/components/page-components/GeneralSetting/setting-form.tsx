import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GeneralSettingSchema, type TGeneralSettingResponse, type TGeneralSettingSchema } from "../../../Models/setting.model";
import { useCustomMutation } from "../../../Global/custom-muation";
import InputField from "../../form-component/input-form";
import TextAreaField from "../../form-component/textarea-form";
import SubmitButton from "../../../Global/Button";
import { QueryKey } from "../../../Types/query.types";
import { ImageUploadField } from "../../form-component/image-upload";

interface GeneralSettingFormProps {
  initialData?: Partial<TGeneralSettingResponse>;
  privacyPolicy?: string;
  termsAndConditions?: string;
}

const GeneralSettingForm = ({
  initialData,
  privacyPolicy = "",
  termsAndConditions = "",
}: GeneralSettingFormProps) => {
  const form = useForm<TGeneralSettingSchema>({
    resolver: zodResolver(GeneralSettingSchema),
    defaultValues: {
      companyName: initialData?.companyName || "",
      primaryLogoId: initialData?.primaryLogo?.id || "",
      secondaryLogoId: initialData?.secondaryLogo?.id || "",
      privacyPolicy: privacyPolicy || "",
      termsAndConditions: termsAndConditions || "",
      navLinks: [],
    },
  });

  const { mutateAsync, isPending } = useCustomMutation<TGeneralSettingSchema>({
    endPoint: QueryKey.GENERAL_SETTING,
    queryKey: [QueryKey.GENERAL_SETTING],
    method: "patch",
  });

  const onSubmit = async (values: TGeneralSettingSchema) => {
    try {
      const { data } = await mutateAsync(values);
      if (data) {
        toast.success("General settings updated successfully");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update general settings"
      );
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-6 rounded-md">
        {/* Company Information Section */}
        <section>
          <div className="border rounded-md shadow-sm p-6 space-y-4 flex-1 bg-white">
            <InputField
              formField={{
                label: "Company Name",
                name: "companyName",
                type: "text",
                placeholder: "Enter Company Name",
                required: true,
              }}
            />
          </div>
        </section>

        {/* Logo Section */}
        <section>
          <div className="pb-2">
            <h2 className="font-semibold text-primaryColor">Logo Settings</h2>
            <p className="text-sm mt-2 text-gray-700">
              Upload logos for different display modes
            </p>
          </div>
          <div className="border rounded-md shadow-sm p-6 flex-1 grid grid-cols-2 bg-white gap-10">

            <ImageUploadField
              formField={{
                name: "primaryLogoId",
                label: "Primary Logo",
                type: "image",
                accept: "image/*",
                required: true,
              }}
              imageURLs={initialData?.primaryLogo?.url}
            />

            <ImageUploadField
              formField={{
                name: "secondaryLogoId",
                label: "Secondary Logo",
                type: "image",
                accept: "image/*",
              }}
              imageURLs={initialData?.secondaryLogo?.url}
            />
          </div>
        </section>

        {/* Policy and Terms Section */}
        <section>
          <div className="pb-2">
            <h2 className="font-semibold text-primaryColor">Policies</h2>
          </div>
          <div className="border rounded-md shadow-sm p-6 bg-white space-y-4 flex-1">
            <div className="w-full max-w-6xl overflow-x-hidden">
              <TextAreaField
                formField={{
                  label: "Privacy Policy",
                  name: "privacyPolicy",
                  type: "textarea",
                  placeholder: "Enter Privacy Policy",
                  required: true,
                }}
                richText={true}
              /></div>

            <div className="w-full max-w-6xl overflow-x-hidden">
              <TextAreaField
                formField={{
                  label: "Terms and Conditions",
                  name: "termsAndConditions",
                  type: "textarea",
                  placeholder: "Enter Terms and Conditions",
                  required: true,
                }}
                richText={true}
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
        <SubmitButton isLoading={isPending} title="Save" showBackBtn={false} />
        </div>
      </form>
    </FormProvider>
  );
};

export default GeneralSettingForm;