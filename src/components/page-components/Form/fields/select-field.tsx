import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, X } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../ui/form';
import type { FormFieldComponentProps } from './fields';
import { Input } from '../../../ui/input';
import { Checkbox } from '../../../form-component/checkbox-form-field';
import { Button } from '../../../ui/button';
import type { TFormDto } from '../../../../Models/forms';
import InputField from '../../../form-component/input-form';

export default function SelectField({ idx }: FormFieldComponentProps) {
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
                        // required: false,
                    }}
                />

            </section>

            <section className='space-y-6'>
                <OptionsField idx={idx} />

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
        </section>
    )
}

function OptionsField({ idx }: FormFieldComponentProps) {
    const form = useFormContext<TFormDto>();
    const { fields, append, remove, insert } = useFieldArray({
        control: form.control,
        name: `fields.${idx}.options`,
    });

    const canAddNewOption = fields.every(option => 
        option.label?.trim() && option.value?.trim()
    );

    const isOptionFilled = (index: number) => {
        const option = form.watch(`fields.${idx}.options.${index}`);
        return option?.label?.trim() && option?.value?.trim();
    };

    const handleAddBelow = (index: number) => {
        if (isOptionFilled(index)) {
            insert(index + 1, { label: '', value: '' });
        }
    };

    const handleAppend = () => {
        if (canAddNewOption) {
            append({ label: '', value: '' });
        }
    };

    return (
        <FormField
            control={form.control}
            name={`fields.${idx}.options`}
            render={() => {
                return (
                    <FormItem className=''>
                        <FormLabel>Select Attribute Options <span className='text-red-500'>*</span></FormLabel>

                        <section className='space-y-2'>
                            {fields.map((field, index) => {
                                const filled = isOptionFilled(index);
                                return (
                                    <div key={field.id} className='flex gap-2'>
                                        <FormField
                                            control={form.control}
                                            name={`fields.${idx}.options.${index}.label`}
                                            render={({ field }) => (
                                                <FormItem className='grow'>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='Label'
                                                            required
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`fields.${idx}.options.${index}.value`}
                                            render={({ field }) => (
                                                <FormItem className='grow'>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='Value'
                                                            required
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex gap-1">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-10"
                                                onClick={() => handleAddBelow(index)}
                                                disabled={!filled}
                                                title={filled ? "Add below" : "Fill current option first"}
                                            >
                                                <Plus size={16} className='text-green-500'/>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-10"
                                                onClick={() => remove(index)}
                                                title="Remove"
                                            >
                                                <X size={16} className='text-red-500'/>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </section>

                        <FormControl>
                            <section>
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    size={"sm"}
                                    className="font-normal text-xs"
                                    onClick={handleAppend}
                                    disabled={!canAddNewOption}
                                    title={canAddNewOption ? "Add new option" : "Fill all options first"}
                                >
                                    <Plus size={16} /> Add Option
                                </Button>
                            </section>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}