
import { useFormContext } from "react-hook-form";
import type { BlockComponentProps } from "./blocks";
import type { TPageDto } from "../../../../../Models/page.model";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../ui/form";
import { ImageUploadField } from "../../../../form-component/image-upload";

const MAX_IMAGES = 3;

type MediaItem = {
  public_id: string;
  secure_url: string;
};

export default function ImageBlock({ blockIdx, sectionIdx }: BlockComponentProps) {
    const form = useFormContext<TPageDto>();

    const blockName = `sections.${sectionIdx}.blocks.0.items.${blockIdx}` as const;

    return (
        <FormField
            control={form.control}
            name={`${blockName}.images`}
            render={({ field }) => {
                const value = field.value as MediaItem[];
                const imageURLs = value?.map(img => img.secure_url) || [];

                return (
                    <FormItem>
                        <FormLabel>Images <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                            <ImageUploadField
                                formField={{
                                    name: `${blockName}.images`,
                                    label: "",
                                    type: "image",
                                    accept: "image/*",
                                    required: true,
                                    multiple: true,
                                    maxCount: MAX_IMAGES
                                }}
                                imageURLs={imageURLs}
                                reset={false}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}