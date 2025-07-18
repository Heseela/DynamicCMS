import { useFormContext } from 'react-hook-form';
import type { FormFieldComponentProps } from './fields';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../ui/form';
import { Checkbox } from '../../../form-component/checkbox-form-field';
import { ERefRelation } from '../../../../Types/global.types';
import type { TFormDto } from '../../../../Models/forms';
import InputField from '../../../form-component/input-form';
import SelectField from '../../../form-component/select-form-field';


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

                <SelectField
                    formField={{
                        name: `fields.${idx}.dataSource.entity`,
                        label: "Relation To",
                        options: Object.entries(ERefRelation).map(([key, value]) => ({
                            value,
                            label: key
                        })),
                        placeholder: "Select an option",
                        required: true
                    }}
                />

                {/* <FormField
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
                /> */}

                <InputField
                    formField={{
                        name: `fields.${idx}.dataSource.filter`,
                        label: "Filter",
                        type: "text",
                        // required: true,
                    }}
                />
            </section>

            <section className='flex gap-6'>
                <FormField
                    control={form.control}
                    name={`fields.${idx}.multiple`}
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <div  className="flex flex-row items-center gap-2">
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
                                </div>
                            </FormItem>
                        )
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
                            </div>
                            <FormMessage />
                          </FormItem>
                          
                        )
                    }}
                />
            </section>
        </section>
    )
}