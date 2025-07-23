import { useFormContext } from "react-hook-form"
import { Label } from "@radix-ui/react-label";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../ui/form";
import type { TPageDto } from "../../../../../Models/page.model";
import type { BlockComponentProps } from "./blocks";
import { Checkbox } from "../../../../form-component/checkbox-form-field";
import { Textarea } from "../../../../ui/textarea";
import { InfiniteSelect } from "../../../../form-component/infinite-select";

export default function FormBlock({ blockIdx, sectionIdx }: BlockComponentProps) {
    const form = useFormContext<TPageDto>();
    const blockName = `sections.${sectionIdx}.blocks.0.items.${blockIdx}` as const;

    return (
        <section className="space-y-6">
            <FormField
                control={form.control}
                name={`${blockName}.form`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Form <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                            <InfiniteSelect
                                endpoint="/forms/options"
                                placeholder="Select a form"
                                selected={{
                                    label: field.value?.title,
                                    value: field.value?.id
                                }}
                                onSelectionChange={val => {
                                    field.onChange({
                                        id: val.value,
                                        title: val.label
                                    })
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="flex items-center gap-3">
                <Checkbox
                    checked={form.watch(`${blockName}.introContent`) !== undefined}
                    onCheckedChange={val => {
                        if (val) {
                            form.setValue(`${blockName}.introContent`, "");
                        } else {
                            form.setValue(`${blockName}.introContent`, undefined);
                        }
                    }}
                />
                <Label htmlFor="intro">Enable Intro Content?</Label>
            </div>

            {
                form.watch(`${blockName}.introContent`) !== undefined && (
                    <FormField
                        control={form.control}
                        name={`${blockName}.introContent`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Intro Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="field-sizing-content overflow-y-hidden resize-none w-full focus-visible:outline-0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )
            }

        </section>
    )
}