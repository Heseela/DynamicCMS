// import { zodResolver } from "@hookform/resolvers/zod";
// import { FormProvider, useForm, useFieldArray } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useQueryClient } from "@tanstack/react-query";
// import { Button } from "../../ui/button";
// import InputField from "../../form-component/input-form";
// import TextAreaField from "../../form-component/textarea-form";
// import SubmitButton from "../../../Global/Button";
// import { 
//   GeneralSettingSchema, 
//   GeneralSettingDefaultValues, 
//   type TGeneralSetting 
// } from "../../../Models/setting.model";
// import { useCustomMutation } from "../../../Global/custom-muation";
// import { QueryKey } from "../../../Types/query.types";
// import { FileUploadField } from "../../form-component/upload-image";

// const SettingForm = () => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const form = useForm<TGeneralSetting>({
//     resolver: zodResolver(GeneralSettingSchema),
//     defaultValues: GeneralSettingDefaultValues,
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "navLinks",
//   });

//   const { mutate, isPending } = useCustomMutation<TGeneralSetting>({
//     endPoint: QueryKey.GENERAL_SETTING,
//     queryKey: [QueryKey.GENERAL_SETTING],
//     method: "patch",
//   });

//   const onSubmit = (values: TGeneralSetting) => {
//     mutate(values, {
//       onSuccess: () => {
//         toast.success("Settings updated successfully!");
//         queryClient.invalidateQueries({ queryKey: [QueryKey.GENERAL_SETTING] });
//         navigate("/settings");
//       },
//       onError: (error) => {
//         toast.error(error.message || "Failed to update settings");
//       },
//     });
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="title ">General Settings</h2>
//       <hr />
//       <div className="flex gap-5 justify-center">
//       <section className="flex flex-col gap-3 tracking-wide w-[30%]">
//           <h2 id="chancellor-form-title" className="md:text-xl font-semibold">
//             Add General Settings
//           </h2>
//           <p className="text-gray-500 text-md md:text-base">
//           Configure your application's general settings such as site title, description, contact details, and other key preferences. These settings define how your platform appears and functions for users.
//           </p>
//         </section>
//         <section className="flex-1 border shadow-sm rounded-lg px-10 py-6 bg-white">
//           <FormProvider {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//               <InputField
//                 formField={{
//                   label: "Company Name",
//                   name: "companyName",
//                   type: "text",
//                   placeholder: "Enter company name",
//                   required: true,
//                 }}
//               />

//               <FileUploadField
//                 formField={{
//                   label: "Primary Logo",
//                   type:"file",
//                   name: "primaryLogoId",
//                   accept: "image/*",
//                 }}
//               />

//               <FileUploadField
//                 formField={{
//                   label: "Secondary Logo",
//                   name: "secondaryLogoId",
//                   type:"file",
//                   accept: "image/*",
//                 }}
//               />

//               <div className="space-y-4">
//                 <h3 className="font-medium">Navigation Links</h3>
//                 {fields.map((field, index) => (
//                   <div key={field.id} className="flex gap-4 items-end">
//                     <InputField
//                       formField={{
//                         label: "Title",
//                         name: `navLinks.${index}.title`,
//                         type: "text",
//                         placeholder: "Link title",
//                         required: true,
//                       }}
//                     />
//                     <InputField
//                       formField={{
//                         label: "URL",
//                         name: `navLinks.${index}.url`,
//                         type: "text",
//                         placeholder: "https://example.com",
//                         required: true,
//                       }}
//                     />
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       onClick={() => remove(index)}
//                     >
//                       Remove
//                     </Button>
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => append({ title: "", url: "" })}
//                 >
//                   Add Navigation Link
//                 </Button>
//               </div>

//               <TextAreaField
//                 formField={{
//                   label: "Footer Description",
//                   name: "footerDescription",
//                   type:"textarea",
//                   placeholder: "Enter footer description",
//                 }}
//               />

//               <TextAreaField
//                 formField={{
//                   label: "Privacy Policy",
//                   name: "privacyPolicy",
//                   type:"textarea",
//                   placeholder: "Enter privacy policy content",
//                 }}
//               />

//               <TextAreaField
//                 formField={{
//                   label: "Terms and Conditions",
//                   name: "termsAndConditions",
//                   type:"textarea",
//                   placeholder: "Enter terms and conditions",
//                 }}
//               />

//               <SubmitButton 
//                 isLoading={isPending} 
//                 title="Save Settings" 
//               />
//             </form>
//           </FormProvider>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default SettingForm;



import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GeneralSettingSchema, type TGeneralSettingResponse, type TGeneralSettingSchema } from "../../../Models/setting.model";
import { useCustomMutation } from "../../../Global/custom-muation";
import InputField from "../../form-component/input-form";
import { FileUploadField } from "../../form-component/upload-image";
import TextAreaField from "../../form-component/textarea-form";
import SubmitButton from "../../../Global/Button";
import { QueryKey } from "../../../Types/query.types";

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
      footerDescription: initialData?.footerDescription || "",
      privacyPolicy,
      termsAndConditions,
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
        <section className="flex justify-between">
          <div className="text-start w-[30%]">
            <h2 className="font-semibold text-primaryColor">General Setting</h2>
          </div>
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
        <section className="flex justify-between">
          <div className="text-start w-[30%]">
            <h2 className="font-semibold text-primaryColor">Logo Settings</h2>
            <p className="text-sm mt-2 text-gray-700">
              Upload logos for different display modes
            </p>
          </div>
          <div className="border rounded-md shadow-sm p-6 flex-1 grid grid-cols-2 bg-white gap-10">
            <FileUploadField
              formField={{
                label: "Primary Logo",
                name: "primaryLogoId",
                type: "file",
                accept: "image/*",
                required: true,
              }}
              imageURL={initialData?.primaryLogo?.url}
            />
            <FileUploadField
              formField={{
                label: "Secondary Logo",
                name: "secondaryLogoId",
                type: "file",
                accept: "image/*",
              }}
              imageURL={initialData?.secondaryLogo?.url}
            />
          </div>
        </section>

        {/* Policy and Terms Section */}
        <section className="flex justify-between">
          <div className="text-start w-[30%]">
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

       <section className="flex justify-between">
          <div className="text-start w-[30%]">
            <h2 className="font-semibold text-primaryColor">Footer Settings</h2>
          </div>
          <div className="border w-full max-w-6xl overflow-x-hidden rounded-md shadow-sm p-6 space-y-4 flex-1 bg-white">
            <TextAreaField
              formField={{
                label: "Footer Description",
                name: "footerDescription",
                type: "textarea",
                placeholder: "Enter Footer Description",
              }}
              richText={true}
            />
          </div>
        </section>

        <SubmitButton isLoading={isPending} title="Save" showBackBtn={false} />
      </form>
    </FormProvider>
  );
};

export default GeneralSettingForm;