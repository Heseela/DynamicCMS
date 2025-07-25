import { useFormContext } from "react-hook-form";
import type { TPageDto } from "../../../../Models/page.model";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form";
import { Input } from "../../../ui/input";
import InputField from "../../../form-component/input-form";

export default function SeoTabContent() {
    const form = useFormContext<TPageDto>();

    return (
        <section className="space-y-6">
            <InputField
                formField={{
                    label: "Title",
                    name: `metadata.title`,
                    type: "text",
                    placeholder: "Enter metadata title",
                    required: true,
                }}
            />

            <InputField
                formField={{
                    label: "Description",
                    name: `metadata.description`,
                    type: "text",
                    placeholder: "Enter metadata description",
                    required: true,
                }}
            />

            <FormField
                control={form.control}
                name={`metadata.keywords`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Keywords<span className="text-red-500 ml-1">*</span></FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Comma-separated keywords (e.g., keyword1, keyword2)"
                                value={field.value?.join(', ') || ''}
                                onChange={(e) => {
                                    const keywords = e.target.value
                                        .split(',')
                                        .map(k => k.trim())
                                        .filter(k => k.length > 0);
                                    field.onChange(keywords);
                                }}
                            />
                        </FormControl>
                        <FormDescription>
                            Enter keywords separated by commas
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </section>
    )
}