import { useFormContext } from 'react-hook-form';
import type { FormFieldComponentProps } from './fields';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../ui/form';
import { Checkbox } from '../../../form-component/checkbox-form-field';
import type { TFormDto } from '../../../../Models/forms';
import InputField from '../../../form-component/input-form';

export default function FileField({ idx }: FormFieldComponentProps) {
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
            </section>

            <section className='space-y-6'>

                <InputField
                    formField={{
                        name: `fields.${idx}.accept`,
                        label: "Accept",
                        type: "text",
                        placeholder: "Eg. image/png, image/jpeg",
                        // required: true,
                    }}
                />

                <FormField
                    control={form.control}
                    name={`fields.${idx}.required`}
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <div className="flex flex-row items-center gap-2">
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
                                </div>
                            </FormItem>
                        )
                    }}
                />
            </section>
        </section>
    )
}