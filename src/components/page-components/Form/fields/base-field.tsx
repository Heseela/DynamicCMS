import { useFormContext } from "react-hook-form";
import type { FormFieldComponentProps } from "./fields";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form";
import type { TFormDto } from "../../../../Models/forms";
import InputField from "../../../form-component/input-form";
import { Checkbox } from "../../../form-component/checkbox-form-field";
import { FormFieldType } from "../../../../Models/form.model";


export default function BaseField({ idx }: FormFieldComponentProps) {
    const form = useFormContext<TFormDto>();

    return (
        <section className=' space-y-6'>
            <section className='grid md:grid-cols-2 grid-cols-1 gap-6'>

                <InputField
                    formField={{
                        name: `fields.${idx}.name`,
                        label: "Name",
                        type: "text",
                        placeholder: "Enter name",
                        // required: true,
                    }}
                />

                <InputField
                    formField={{
                        name: `fields.${idx}.label`,
                        label: "Label",
                        type: "text",
                        placeholder: "Enter label",
                        // required: true,
                    }}
                />

                <InputField
                    formField={{
                        name: `fields.${idx}.placeholder`,
                        label: "Placeholder",
                        type: "text",
                        placeholder: "Enter placeholder",
                        // required: true,
                    }}
                />

                <InputField
                    formField={{
                        name: `fields.${idx}.defaultValue`,
                        label: "Default Value",
                        type: form.watch(`fields.${idx}.type`) === FormFieldType.Number ? "number" : "text",
                        placeholder: "Enter default value",
                        required: false,
                    }}
                />

            </section>

            <section className='space-y-6'>
                <FormField
                    control={form.control}
                    name={`fields.${idx}.validation`}
                    render={() => {
                        return (
                            <FormItem className=''>
                                <FormControl>
                                    <section className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>

                                        <InputField
                                            formField={{
                                                type: "number",
                                                name: `fields.${idx}.validation.minLength`,
                                                label: "Min Length",
                                                // required: true
                                            }}
                                            valueAsNumber={true}
                                        />

                                        <InputField
                                            formField={{
                                                type: "number",
                                                name: `fields.${idx}.validation.maxLength`,
                                                label: "Max Length",
                                                // required: true
                                            }}
                                            valueAsNumber={true}
                                        />

                                        <InputField
                                            formField={{
                                                type: "text",
                                                name: `fields.${idx}.validation.minLength`,
                                                label: "Pattern",
                                                // required: true
                                            }}
                                        />
                                    </section>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />

                <FormField
                    control={form.control}
                    name={`fields.${idx}.required`}
                    render={({ field }) => {
                        return (
                            <FormItem className="flex flex-row items-center gap-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(checked)}
                                    />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                    Required
                                </FormLabel>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />
            </section>
        </section>
    )
}
