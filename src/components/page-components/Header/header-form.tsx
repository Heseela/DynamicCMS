import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { HeaderDefaultValues, HeaderSchema, type THeaderAPI, type THeaderForm } from "../../../Models/header.model";
import { useCustomMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import InputField from "../../form-component/input-form";
import { Button } from "../../ui/button";
import SubmitButton from "../../../Global/Button";
import SelectField from "../../form-component/select-form-field";


type HeaderFormProps = {
    headerValues?: THeaderForm;
};

const HeaderForm = ({ headerValues }: HeaderFormProps) => {
    const queryClient = useQueryClient();

    const form = useForm<THeaderForm>({
        resolver: zodResolver(HeaderSchema),
        defaultValues: headerValues || HeaderDefaultValues,
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "navLinks",
    });

    const { mutate, isPending } = useCustomMutation<THeaderAPI>({
        endPoint: QueryKey.HEADER,
        queryKey: [QueryKey.HEADER],
        method: "patch",
    });

    const onSubmit: SubmitHandler<THeaderForm> = async (formData) => {
        try {
            const apiData: THeaderAPI = {
                navLinks: formData.navLinks.map(link => ({
                    name: link.name,
                    url: link.url,
                    type: link.type
                }))
            };

            mutate(apiData, {
                onSuccess: () => {
                    toast.success("Header updated successfully!");
                    queryClient.invalidateQueries({ queryKey: [QueryKey.HEADER] });
                },
                onError: (error) => {
                    console.error('API Error:', error);
                    toast.error(error.message || "Failed to update header");
                },
            });
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error("An unexpected error occurred");
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primaryColor">Header Navigation</h2>
            <hr />
            <div className="flex gap-5 justify-center">
                <section className="flex flex-col gap-3 tracking-wide w-[30%]">
                    <h2 className="md:text-xl font-semibold">
                        Manage Navigation Links
                    </h2>
                    <p className="text-gray-500 text-md md:text-base">
                        Add, edit or remove navigation links from your header.
                    </p>
                </section>

                <section className="flex-1 border shadow-sm rounded-lg px-10 py-6 bg-white">
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-3">
                                <label className="block text-sm font-medium">Navigation Links</label>
                                <div className="space-y-4">
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="flex gap-4 items-start border p-4 rounded-lg">
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
                                                <div className="space-y-2">
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
                                            </div>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => remove(index)}
                                                className="text-red-500 mt-2"
                                                disabled={fields.length <= 1}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => append({ name: "", url: "", type: "internal" })}
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

export default HeaderForm;