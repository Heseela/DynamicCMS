import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { FooterSchema, type TFooterAPI, type TFooterForm } from "../../../Models/footer.model";
import { useCustomMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import InputField from "../../form-component/input-form";
import { Button } from "../../ui/button";
import SubmitButton from "../../../Global/Button";
import SelectField from "../../form-component/select-form-field";
import TextAreaField from "../../form-component/textarea-form";

type FooterFormProps = {
    footerValues?: TFooterForm;
    footerId?: string;
};

const FooterForm = ({ footerValues, footerId }: FooterFormProps) => {
    const queryClient = useQueryClient();

    const form = useForm<TFooterForm>({
        resolver: zodResolver(FooterSchema),
        defaultValues: footerValues || {
            footerDescription: "",
            navLinks: [{
                name: "",
                url: "",
                type: "internal",
                subLinks: []
            }]
        },
    });

    const { fields: navLinkFields, append: appendNavLink, remove: removeNavLink } = useFieldArray({
        control: form.control,
        name: "navLinks",
    });

    const { mutate, isPending } = useCustomMutation<TFooterAPI>({
        endPoint: QueryKey.FOOTER,
        queryKey: [QueryKey.FOOTER],
        method: "patch",
    });

    const onSubmit: SubmitHandler<TFooterForm> = async (formData) => {
        try {
            const apiData: TFooterAPI = {
                id: footerId || "",
                footerDescription: formData.footerDescription,
                navLinks: formData.navLinks.map(link => ({
                    ...link,
                    subLinks: link.subLinks || []
                }))
            };

            mutate(apiData, {
                onSuccess: () => {
                    toast.success("Footer updated successfully!");
                    queryClient.invalidateQueries({ queryKey: [QueryKey.FOOTER] });
                },
                onError: (error) => {
                    console.error('API Error:', error);
                    toast.error(error.message || "Failed to update footer");
                },
            });
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error("An unexpected error occurred");
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primaryColor">Footer Configuration</h2>
            <hr />
            <div className="flex gap-5 justify-center">
                <section className="flex-1 border shadow-sm rounded-lg px-10 py-6 bg-white">
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-3">
                                <TextAreaField
                                    formField={{
                                        label: "Footer Description",
                                        name: "footerDescription",
                                        type: "textarea",
                                        placeholder: "Enter footer description (10-500 chars)",
                                        required: true,
                                    }}
                                />

                                <label className="block text-sm font-medium">Navigation Links</label>
                                <div className="space-y-4">
                                    {navLinkFields.map((field, index) => (
                                        <div key={field.id} className="border p-4 rounded-lg space-y-4">
                                            <div className="flex gap-4 items-start">
                                                <div className="flex-1 space-y-3">
                                                    <InputField
                                                        formField={{
                                                            label: "Name",
                                                            name: `navLinks.${index}.name`,
                                                            type: "text",
                                                            placeholder: "Link name (3-20 chars)",
                                                            required: true,
                                                        }}
                                                    />
                                                    <InputField
                                                        formField={{
                                                            label: "URL",
                                                            name: `navLinks.${index}.url`,
                                                            type: "url",
                                                            placeholder: "https://example.com",
                                                            required: true,
                                                        }}
                                                    />
                                                    <SelectField
                                                        formField={{
                                                            name: `navLinks.${index}.type`,
                                                            label: "Link Type",
                                                            options: [
                                                                { value: "internal", label: "Internal" },
                                                                { value: "external", label: "External" },
                                                            ],
                                                            placeholder: "Select link type",
                                                            required: true
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2 mt-2">
                                                    <Button
                                                        type="button"
                                                        size="icon"
                                                        className="border"
                                                        onClick={() => removeNavLink(index)}
                                                        disabled={navLinkFields.length <= 1}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <SubLinksFieldArray
                                                nestIndex={index}
                                                control={form.control}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => appendNavLink({
                                        name: "",
                                        url: "",
                                        type: "internal",
                                        subLinks: []
                                    })}
                                    className="w-fit mt-4"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Navigation Link
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

const SubLinksFieldArray = ({ nestIndex, control }: { nestIndex: number; control: any }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `navLinks.${nestIndex}.subLinks`,
    });

    return (
        <div className="pl-6 space-y-3">
            <label className="block text-sm font-medium">Sub Links</label>
            <div className="space-y-3">
                {fields.map((field, subIndex) => (
                    <div key={field.id} className="border p-4 rounded-lg space-y-4">
                        <div className="flex gap-4 items-start">
                            <div className="flex-1 space-y-3">
                                <InputField
                                    formField={{
                                        name: `navLinks.${nestIndex}.subLinks.${subIndex}.name`,
                                        label: "Name",
                                        type: "text",
                                        placeholder: "Sub link name",
                                        required: true,
                                    }}
                                />
                                <InputField
                                    formField={{
                                        name: `navLinks.${nestIndex}.subLinks.${subIndex}.url`,
                                        label: "URL",
                                        type: "url",
                                        placeholder: "https://example.com",
                                        required: true,
                                    }}
                                />
                                <SelectField
                                    formField={{
                                        name: `navLinks.${nestIndex}.subLinks.${subIndex}.type`,
                                        label: "Link Type",
                                        options: [
                                            { value: "internal", label: "Internal" },
                                            { value: "external", label: "External" },
                                        ],
                                        required: true
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <Button
                                    type="button"
                                    size="icon"
                                    className="border"
                                    onClick={() => remove(subIndex)}
                                >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="flex justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({
                            name: "",
                            url: "",
                            type: "internal"
                        })}
                        className="w-fit"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Sub Link
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FooterForm;