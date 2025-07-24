
// import { useFormContext } from "react-hook-form";
// import type { BlockComponentProps } from "./blocks";
// import type { TPageDto } from "../../../../../Models/page.model";
// import { ImageUploadField } from "../../../../form-component/image-upload";
// import { FormField } from "../../../../ui/form";

// type MediaItem = {
//     public_id: string;
//     secure_url: string;
// };

// export default function ImageBlock({ blockIdx, sectionIdx }: BlockComponentProps) {
//     const form = useFormContext<TPageDto>();

//     const blockName = `sections.${sectionIdx}.blocks.0.items.${blockIdx}` as const;

//     return (
//         <FormField
//             control={form.control}
//             name={`${blockName}.images`}
//             render={({ field }) => {
//                 const value = field.value as MediaItem[];
//                 const imageURLs = value?.map(img => img.secure_url) || [];

//                 return (

//                     <ImageUploadField
//                         formField={{
//                             name: `${blockName}.images`,
//                             label: "Upload Images",
//                             type: "image",
//                             accept: "image/*",
//                             multiple: true,
//                             required: true,
//                             maxCount: 5,
//                             maxSize: 2,
//                         }}

//                     />
//                 )
//             }}
//         />
//     )
// }

import { useFormContext } from "react-hook-form";
import type { BlockComponentProps } from "./blocks";
import type { TPageDto } from "../../../../../Models/page.model";
import { ImageUploadField } from "../../../../form-component/image-upload";
import { FormField } from "../../../../ui/form";

export default function ImageBlock({ blockIdx, sectionIdx }: BlockComponentProps) {
    const form = useFormContext<TPageDto>();
    const blockName = `sections.${sectionIdx}.blocks.0.items.${blockIdx}` as const;

    return (
        <FormField
            control={form.control}
            name={`${blockName}.images`}
            render={({ field }) => {
                const value = field.value as Array<{ imageId: string; url?: string }>;
                const imageURLs = value?.map(img => img.url).filter(Boolean) as string[];

                return (
                    <ImageUploadField
                        formField={{
                            name: `${blockName}.images`,
                            label: "Upload Images",
                            type: "image",
                            accept: "image/*",
                            multiple: true,
                            required: true,
                            maxCount: 5,
                            maxSize: 2,
                        }}
                        imageURLs={imageURLs}
                    />
                   
                );
            }}
        />
    );
}