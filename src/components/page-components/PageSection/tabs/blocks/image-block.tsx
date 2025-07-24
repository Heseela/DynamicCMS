// import { useFormContext } from "react-hook-form";
// import type { BlockComponentProps } from "./blocks";
// import type { TPageDto } from "../../../../../Models/page.model";
// import { FormControl, FormField, FormItem } from "../../../../ui/form";
// import { MediaField } from "../../../../form-component/media-upload/media-upload";
// import MediaItem from "../../../../form-component/media-upload/media-item";


// export default function ImageBlock({ blockIdx, sectionIdx }: BlockComponentProps) {
//     const form = useFormContext<TPageDto>();
//     const blockName = `sections.${sectionIdx}.blocks.0.items.${blockIdx}` as const;

//     return (
//         <FormField
//             control={form.control}
//             name={`${blockName}.images`}
//             render={({ field }) => {
//                 const value = field.value;

//                 return (
//                     <FormItem>
//                         <section className="space-y-1">
//                             {
//                                 Array.isArray(value) && value.map((m, index) => (
//                                     <MediaItem
//                                         media={m}
//                                         onRemove={() => {
//                                             field.onChange(
//                                                 value.filter((_, i) => i !== index)
//                                             )
//                                         }}
//                                     />
//                                 ))
//                             }
//                         </section>
//                         <FormControl>
//                             <MediaField
//                                 onChange={media => {
//                                     field.onChange([...value, ...media])
//                                 }}
//                                 multiple
//                             />
//                         </FormControl>
//                     </FormItem>
//                 );
//             }}
//         />
//     );
// }


import { useFormContext } from "react-hook-form";
import type { BlockComponentProps } from "./blocks";
import type { TPageDto } from "../../../../../Models/page.model";
import { FormControl, FormField, FormItem } from "../../../../ui/form";
import { MediaField } from "../../../../form-component/media-upload/media-upload";
import MediaItem from "../../../../form-component/media-upload/media-item";

export default function ImageBlock({ blockIdx, sectionIdx }: BlockComponentProps) {
  const form = useFormContext<TPageDto>();
  const blockName = `sections.${sectionIdx}.blocks.0.items.${blockIdx}` as const;

  return (
    <FormField
      control={form.control}
      name={`${blockName}.images`}
      render={({ field }) => {
        const value = field.value || [];

        return (
          <FormItem>
            <div className="space-y-4">
              {value.length > 0 && (
                <div className="grid grid-cols-6 gap-4">
                  {value.map((m, index) => (
                    <div className="relative group">
                      <MediaItem
                        media={m}
                        onRemove={() => {
                          field.onChange(
                            value.filter((_, i) => i !== index)
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
              
              <FormControl>
                <MediaField
                  onChange={(media) => {
                    field.onChange([...value, ...media]);
                  }}
                  multiple
                  maxCount={10}
                  currentCount={value.length}
                />
              </FormControl>
            </div>
          </FormItem>
        );
      }}
    />
  );
}