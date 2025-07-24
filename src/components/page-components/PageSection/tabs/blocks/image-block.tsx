import { useFormContext } from "react-hook-form";
import type { BlockComponentProps } from "./blocks";
import type { TPageDto } from "../../../../../Models/page.model";
import { ImageUploadField } from "../../../../form-component/image-upload";
import { FormControl, FormField, FormItem } from "../../../../ui/form";
import { ImageUploadFormField } from "../../../../form-component/image-upload-form-field";


export default function ImageBlock({ blockIdx, sectionIdx }: BlockComponentProps) {
    const form = useFormContext<TPageDto>();
    const blockName = `sections.${sectionIdx}.blocks.0.items.${blockIdx}` as const;

    return (
        <FormField
            control={form.control}
            name={`${blockName}.images`}
            render={({ field }) => {
                const value = field.value;
                const imageURLs = value?.map(img => img.url) as string[];
                console.log(imageURLs)
                return (
                    <FormItem>
                       <FormControl>
                       <ImageUploadFormField
                            formField={{
                                name: `${blockName}.images`,
                                label: "Upload Images",
                                type: "image",
                                accept: "image/*",
                                multiple: true,
                                required: true,
                            }}
                            imageURLs={imageURLs}
                        />
                       </FormControl>
                    </FormItem>
                );
            }}
        />
    );
}