import { useFormContext } from 'react-hook-form';
import type { FormFieldComponentProps } from './fields';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../ui/form';
import { Input } from '../../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Checkbox } from '../../../form-component/checkbox-form-field';
import { ERefRelation } from '../../../../Types/global.types';
import type { TFormDto } from '../../../../Models/forms';
import InputField from '../../../form-component/input-form';


export default function RelationField({ idx }: FormFieldComponentProps) {
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
                        type: "text",
                        placeholder: "Enter default value",
                        // required: true,
                    }}
                />

                <FormField
                    control={form.control}
                    name={`fields.${idx}.dataSource.entity`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Relation To <span className='text-red-500'>*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                <FormControl>
                                    <SelectTrigger className="w-full py-5">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        Object.entries(ERefRelation).map(([key, value]) => (
                                            <SelectItem key={key} value={value}>{key}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={`fields.${idx}.dataSource.filter`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Filter</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </section>

            <section className='flex gap-6'>
                <FormField
                    control={form.control}
                    name={`fields.${idx}.multiple`}
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
                                    Multiple
                                </FormLabel>
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