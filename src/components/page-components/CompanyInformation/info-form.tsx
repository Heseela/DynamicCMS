// import { zodResolver } from "@hookform/resolvers/zod";
// import { FormProvider, useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
// import toast from "react-hot-toast";
// import { useQueryClient } from "@tanstack/react-query";
// import { Plus, Trash2 } from "lucide-react";
// import { CompanyInfoDefaultValues, CompanyInfoSchema, type TCompanyInfoAPI, type TCompanyInfoForm } from "../../../Models/info.model";
// import { useCustomMutation } from "../../../Global/custom-muation";
// import { QueryKey } from "../../../Types/query.types";
// import InputField from "../../form-component/input-form";
// import { Button } from "../../ui/button";
// import SubmitButton from "../../../Global/Button";

// type CompanyFormProps = {
//   companyValues?: TCompanyInfoForm;
// };

// const CompanyForm = ({ companyValues }: CompanyFormProps) => {
//   const queryClient = useQueryClient();

//   const form = useForm<TCompanyInfoForm>({
//     resolver: zodResolver(CompanyInfoSchema),
//     defaultValues: companyValues || CompanyInfoDefaultValues,
//   });

//   const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
//     control: form.control,
//     name: "socialProfiles",
//   });

//   const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
//     control: form.control,
//     name: "phones",
//   });

//   const { fields: emailFields, append: appendEmail, remove: removeEmail } = useFieldArray({
//     control: form.control,
//     name: "emails",
//   });

//   const { mutate, isPending } = useCustomMutation<TCompanyInfoAPI>({
//     endPoint: QueryKey.COMPANY_INFO,
//     queryKey: [QueryKey.COMPANY_INFO],
//     method: "patch",
//   });

//   const onSubmit: SubmitHandler<TCompanyInfoForm> = async (formData) => {
//     try {
//       const apiData: TCompanyInfoAPI = {
//         city: formData.city,
//         address: formData.address,
//         phone: formData.phones.map(phone => phone.number),
//         mapLink: formData.mapLink,
//         email: formData.emails.map(email => email.address),
//         workingHours: formData.workingHours,
//         socialProfiles: formData.socialProfiles.map(profile => profile.url)
//       };

//       mutate(apiData, {
//         onSuccess: () => {
//           toast.success("Company info updated successfully!");
//           queryClient.invalidateQueries({ queryKey: [QueryKey.COMPANY_INFO] });
//         },
//         onError: (error) => {
//           console.error('API Error:', error);
//           toast.error(error.message || "Failed to update company info");
//         },
//       });
//     } catch (error) {
//       console.error('Form submission error:', error);
//       toast.error("An unexpected error occurred");
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold text-primaryColor">Company Information</h2>
//       <hr />
//       <div className="flex gap-5 justify-center">
//         <section className="flex flex-col gap-3 tracking-wide w-[30%]">
//           <h2 id="chancellor-form-title" className="md:text-xl font-semibold">
//             Add University Information
//           </h2>
//           <p className="text-gray-500 text-md md:text-base">
//             Please provide key details about your university or organization.
//           </p>
//         </section>

//         <section className="flex-1 border shadow-sm rounded-lg px-10 py-6 bg-white">
//           <FormProvider {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              // <InputField
              //   formField={{
              //     label: "City",
              //     name: "city",
              //     type: "text",
              //     placeholder: "Enter city",
              //     required: true,
              //   }}
              // />

              // <InputField
              //   formField={{
              //     label: "Address",
              //     name: "address",
              //     type: "text",
              //     placeholder: "Enter address",
              //     required: true,
              //   }}
              // />

              // <div className="space-y-3">
              //   <label className="block text-sm font-medium">Phone Numbers</label>
              //   <div className="space-y-2">
              //     {phoneFields.map((field, index) => (
              //       <div key={field.id} className="flex gap-2 items-center">
              //         <div className="flex-1">
              //           <InputField
              //             formField={{
              //               name: `phones.${index}.number`,
              //               type: "tel",
              //               placeholder: "Enter phone number",
              //               // required: true,
              //             }}
              //           />
              //         </div>
              //         <Button
              //           type="button"
              //           variant="destructive"
              //           size="icon"
              //           onClick={() => removePhone(index)}
              //           className="text-red-500"
              //           disabled={phoneFields.length <= 1}
              //         >
              //           <Trash2 className="h-4 w-4" />
              //         </Button>
              //       </div>
              //     ))}
              //   </div>
              //   <Button
              //     type="button"
              //     variant="outline"
              //     onClick={() => appendPhone({ number: "" })}
              //     className="w-fit"
              //   >
              //     <Plus className="mr-2 h-4 w-4" />
              //     Add Phone Number
              //   </Button>
              // </div>

              // <div className="space-y-3">
              //   <label className="block text-sm font-medium">Email Addresses</label>
              //   <div className="space-y-2">
              //     {emailFields.map((field, index) => (
              //       <div key={field.id} className="flex gap-2 items-center">
              //         <div className="flex-1">
              //           <InputField
              //             formField={{
              //               name: `emails.${index}.address`,
              //               type: "email",
              //               placeholder: "Enter email",
              //               // required: true,
              //             }}
              //           />
              //         </div>
              //         <Button
              //           type="button"
              //           variant="destructive"
              //           size="icon"
              //           onClick={() => removeEmail(index)}
              //           className="text-red-500"
              //           disabled={emailFields.length <= 1}
              //         >
              //           <Trash2 className="h-4 w-4" />
              //         </Button>
              //       </div>
              //     ))}
              //   </div>
              //   <Button
              //     type="button"
              //     variant="outline"
              //     onClick={() => appendEmail({ address: "" })}
              //     className="w-fit"
              //   >
              //     <Plus className="mr-2 h-4 w-4" />
              //     Add Email Address
              //   </Button>
              // </div>

              // <InputField
              //   formField={{
              //     label: "Working Hours",
              //     name: "workingHours",
              //     type: "text",
              //     placeholder: "e.g., Mon-Fri: 9AM-5PM",
              //     required: true,
              //   }}
              // />

              // <InputField
              //   formField={{
              //     label: "Map Link",
              //     name: "mapLink",
              //     type: "url",
              //     placeholder: "Enter Google Maps link",
              //     required: false,
              //   }}
              // />

//               <div className="space-y-3">
//                 <label className="block text-sm font-medium">Social Profiles</label>
//                 <div className="space-y-2">
//                   {socialFields.map((field, index) => (
//                     <div key={field.id} className="flex gap-2 items-center">
//                       <div className="flex-1">
//                         <InputField
//                           formField={{
//                             name: `socialProfiles.${index}.url`,
//                             type: "url",
//                             placeholder: "https://example.com/profile",
//                           }}
//                         />
//                       </div>
//                       <Button
//                         type="button"
//                         variant="destructive"
//                         size="icon"
//                         onClick={() => removeSocial(index)}
//                         className="text-red-500"
//                         disabled={socialFields.length <= 1}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => appendSocial({ url: "" })}
//                   className="w-fit"
//                 >
//                   <Plus className="mr-2 h-4 w-4" />
//                   Add Social Profile
//                 </Button>
//               </div> 

//               <div className="flex justify-end">
//                 <SubmitButton
//                   isLoading={isPending}
//                   title="Save Changes"
//                   showBackBtn={false}
//                 />
//               </div>
//             </form>
//           </FormProvider>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default CompanyForm;


import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { CompanyInfoDefaultValues, CompanyInfoSchema, type TCompanyInfoAPI, type TCompanyInfoForm } from "../../../Models/info.model";
import { useCustomMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import InputField from "../../form-component/input-form";
import { Button } from "../../ui/button";
import SubmitButton from "../../../Global/Button";

type CompanyFormProps = {
  companyValues?: TCompanyInfoForm;
};

const CompanyForm = ({ companyValues }: CompanyFormProps) => {
  const queryClient = useQueryClient();

  const form = useForm<TCompanyInfoForm>({
    resolver: zodResolver(CompanyInfoSchema),
    defaultValues: companyValues || CompanyInfoDefaultValues,
  });

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
    control: form.control,
    name: "socialProfiles",
  });

  const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
    control: form.control,
    name: "phones",
  });

  const { fields: emailFields, append: appendEmail, remove: removeEmail } = useFieldArray({
    control: form.control,
    name: "emails",
  });

  const { mutate, isPending } = useCustomMutation<TCompanyInfoAPI>({
    endPoint: QueryKey.COMPANY_INFO,
    queryKey: [QueryKey.COMPANY_INFO],
    method: "patch",
  });

  const onSubmit: SubmitHandler<TCompanyInfoForm> = async (formData) => {
    try {
      const apiData: TCompanyInfoAPI = {
        city: formData.city,
        address: formData.address,
        phone: formData.phones.map(phone => phone.number),
        mapLink: formData.mapLink,
        email: formData.emails.map(email => email.address),
        workingHours: formData.workingHours,
        socialProfiles: formData.socialProfiles.map(profile => profile.url)
      };

      mutate(apiData, {
        onSuccess: () => {
          toast.success("Company info updated successfully!");
          queryClient.invalidateQueries({ queryKey: [QueryKey.COMPANY_INFO] });
        },
        onError: (error) => {
          console.error('API Error:', error);
          toast.error(error.message || "Failed to update company info");
        },
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primaryColor">Company Information</h2>
      <hr />
      <div className="flex gap-5 justify-center">
        <section className="flex flex-col gap-3 tracking-wide w-[30%]">
          <h2 id="chancellor-form-title" className="md:text-xl font-semibold">
            Add University Information
          </h2>
          <p className="text-gray-500 text-md md:text-base">
            Please provide key details about your university or organization.
          </p>
        </section>

        <section className="flex-1 border shadow-sm rounded-lg px-10 py-6 bg-white">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <InputField
                formField={{
                  label: "City",
                  name: "city",
                  type: "text",
                  placeholder: "Enter city",
                  required: true,
                }}
              />

              <InputField
                formField={{
                  label: "Address",
                  name: "address",
                  type: "text",
                  placeholder: "Enter address",
                  required: true,
                }}
              />

              <div className="space-y-3">
                <label className="block text-sm font-medium">Phone Numbers</label>
                <div className="space-y-2">
                  {phoneFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                      <div className="flex-1">
                        <InputField
                          formField={{
                            name: `phones.${index}.number`,
                            type: "tel",
                            placeholder: "Enter phone number",
                            // required: true,
                          }}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removePhone(index)}
                        className="text-red-500"
                        disabled={phoneFields.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendPhone({ number: "" })}
                  className="w-fit"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Phone Number
                </Button>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium">Email Addresses</label>
                <div className="space-y-2">
                  {emailFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                      <div className="flex-1">
                        <InputField
                          formField={{
                            name: `emails.${index}.address`,
                            type: "email",
                            placeholder: "Enter email",
                            // required: true,
                          }}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeEmail(index)}
                        className="text-red-500"
                        disabled={emailFields.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendEmail({ address: "" })}
                  className="w-fit"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Email Address
                </Button>
              </div>

              <InputField
                formField={{
                  label: "Working Hours",
                  name: "workingHours",
                  type: "text",
                  placeholder: "e.g., Mon-Fri: 9AM-5PM",
                  required: true,
                }}
              />

              <InputField
                formField={{
                  label: "Map Link",
                  name: "mapLink",
                  type: "url",
                  placeholder: "Enter Google Maps link",
                  required: false,
                }}
              />
              <div className="space-y-3">
                <label className="block text-sm font-medium">Social Profiles</label>
                <div className="space-y-2">
                  {socialFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                      <div className="flex-1">
                        <InputField
                          formField={{
                            name: `socialProfiles.${index}.url`,
                            type: "url",
                            placeholder: "https://example.com/profile",
                          }}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeSocial(index)}
                        className="text-red-500"
                        disabled={socialFields.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendSocial({ url: "" })}
                  className="w-fit"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Social Profile
                </Button>
              </div>

              <div className="flex justify-end">
                <SubmitButton
                  isLoading={isPending}
                  title="Save Changes"
                  showBackBtn={false}
                />
              </div>
            </form>
          </FormProvider>
        </section>
      </div>
    </div>
  );
};

export default CompanyForm;