import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import InputField from "../../form-component/input-form";
import TextAreaField from "../../form-component/textarea-form";
import SubmitButton from "../../../Global/Button";
import SelectField from "../../form-component/select-form-field";
import { Button } from "../../ui/button";
import { useCustomMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import { HeroDefaultValues, HeroSectionSchema } from "../../../Models/hero-section.model";
import type { THeroSection } from "../../../Models/hero-section.model";
import { FileUploadField } from "../../form-component/upload-image";

const LAYOUT_TYPES = [
    { value: "jumbotron", label: "Jumbotron" },
    { value: "splitHero", label: "Split" },
];

const ALIGNMENT_OPTIONS = [
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
];

const BUTTON_VARIANTS = [
    { value: "primary", label: "Primary" },
    { value: "secondary", label: "Secondary" },
    { value: "outline", label: "Outline" },
];

type HeroFormProps = {
    pageSlug: string;
    heroValues?: THeroSection;
};

export const HeroForm = ({ pageSlug, heroValues }: HeroFormProps) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [ctaCount, setCtaCount] = useState(heroValues?.cta?.length || 0);

    const form = useForm<THeroSection>({
        resolver: zodResolver(HeroSectionSchema),
        defaultValues: heroValues || HeroDefaultValues,
    });

    const { mutate, isPending } = useCustomMutation<THeroSection>({
        endPoint: "hero-sections",
        queryKey: [QueryKey.HERO_SECTIONS],
        // method: heroValues?.id ? "patch" : "post",
        method: "patch",
        params: { page: pageSlug },
    });

    const onSubmit: SubmitHandler<THeroSection> = async (values) => {
        mutate(values, {
            onSuccess: () => {
                toast.success(heroValues?.id ? "Hero section updated!" : "Hero section created!");
                queryClient.invalidateQueries({ queryKey: [QueryKey.HERO_SECTIONS] });
                navigate(`/pages/${pageSlug}/hero`);
            },
            onError: (error) => {
                toast.error(error.message || "Submission failed");
            },
        });
    };

    const addCta = () => {
        setCtaCount(prev => prev + 1);
        form.setValue("cta", [
            ...(form.getValues("cta") || []),
            { link: "", text: "", variant: "primary" }
        ]);
    };

    const removeCta = (index: number) => {
        const currentCtas = form.getValues("cta") || [];
        const newCtas = currentCtas.filter((_, i) => i !== index);
        form.setValue("cta", newCtas);
        setCtaCount(prev => prev - 1);
    };

    return (
        <div className="space-y-4">
            <h2 className="title">{heroValues?.id ? "Edit" : "Add"} Hero Section</h2>
            <hr />
            <div className="flex gap-5 justify-center">
                <section className="flex-1 border shadow-sm rounded-lg px-10 py-6 bg-white">
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <InputField
                                formField={{
                                    name: "headline",
                                    label: "Headline",
                                    type: "text",
                                    placeholder: "Enter headline",
                                    required: true,
                                }}
                            />

                            <TextAreaField
                                formField={{
                                    name: "subheadline",
                                    label: "Subheadline",
                                    type: "textarea",
                                    placeholder: "Enter subheadline (optional)",
                                    required: false,
                                }}
                            />

                            <FileUploadField
                                formField={{
                                    label: "Hero Image",
                                    name: "imageId",
                                    type: "file",
                                    required: true,
                                    accept: "image/jpg, image/png, image/jpeg",
                                }}
                                reset={false}
                                imageURL={form.watch("imageId")}
                            />

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium">Call-to-Action Buttons</h3>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addCta}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add CTA
                                    </Button>
                                </div>

                                {Array.from({ length: ctaCount }).map((_, index) => (
                                    <div key={index} className="border p-4 rounded-lg space-y-4 relative">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute top-2 right-2 text-red-500"
                                            onClick={() => removeCta(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>

                                        <InputField
                                            formField={{
                                                name: `cta.${index}.text`,
                                                label: "Button Text",
                                                type: "text",
                                                placeholder: "Enter button text",
                                                required: true,
                                            }}
                                        />

                                        <InputField
                                            formField={{
                                                name: `cta.${index}.link`,
                                                label: "Button Link",
                                                type: "text",
                                                placeholder: "Enter button link",
                                                required: true,
                                            }}
                                        />

                                        <SelectField
                                            formField={{
                                                name: `cta.${index}.variant`,
                                                label: "Button Variant",
                                                options: BUTTON_VARIANTS,
                                                placeholder: "Select button variant",
                                                required: true,
                                            }}
                                        />

                                        <InputField
                                            formField={{
                                                name: `cta.${index}.icon`,
                                                label: "Button Icon (optional)",
                                                type: "text",
                                                placeholder: "Enter icon name",
                                                required: false,
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <SelectField
                                    formField={{
                                        name: "layout.type",
                                        label: "Layout Type",
                                        options: LAYOUT_TYPES,
                                        placeholder: "Select layout type",
                                        required: true,
                                    }}
                                />

                                <SelectField
                                    formField={{
                                        name: "layout.alignment",
                                        label: "Content Alignment",
                                        options: ALIGNMENT_OPTIONS,
                                        placeholder: "Select alignment",
                                        required: true,
                                    }}
                                />
                            </div>

                            <SubmitButton
                                isLoading={isPending}
                                title={heroValues?.id ? "Update" : "Save"}
                            />
                        </form>
                    </FormProvider>
                </section>
            </div>
        </div>
    );
};