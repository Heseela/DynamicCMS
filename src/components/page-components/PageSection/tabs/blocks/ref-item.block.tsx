import type { TPageDto } from '../../../../../Models/page.model';
import { EOrder, ERefRelation } from '../../../../../Types/global.types';
import { Checkbox } from '../../../../form-component/checkbox-form-field';
import { InfiniteMultiSelect } from '../../../../form-component/infinite-multi-select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../ui/form';
import { Input } from '../../../../ui/input';
import { Label } from '../../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../ui/select';
import { type BlockComponentProps } from './blocks'
import { useFormContext } from "react-hook-form";

export default function RefItemBlock({ blockIdx, sectionIdx }: BlockComponentProps) {
    const form = useFormContext<TPageDto>();

    const blockName = `sections.${sectionIdx}.blocks.items.${blockIdx}` as const;

    const selected = form.watch(`${blockName}.selected`);
    
    const NUMBER_REGEX_STRING = "^[0-9]*$";


    return (
        <section className="space-y-6">
            <FormField
                control={form.control}
                name={`${blockName}.ref`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Reference <span className="text-red-500">*</span></FormLabel>
                        <Select
                            onValueChange={val => {
                                field.onChange(val);
                                form.setValue(`${blockName}.selected`, []); // reset selected on ref change
                            }}
                            defaultValue={field.value}
                            required
                        >
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

            <div className="flex items-center gap-3">
                <Checkbox
                    checked={!!form.watch(`${blockName}.selected`)}
                    onCheckedChange={val => {
                        if (val) {
                            form.setValue(`${blockName}.selected`, []);
                        } else {
                            form.setValue(`${blockName}.selected`, undefined);
                        }
                    }}
                />
                <Label htmlFor="manual">Select Manually?</Label>
            </div>

            {
                selected === undefined && (
                    <>
                        <FormField
                            control={form.control}
                            name={`${blockName}.limit`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Limit <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className='py-5'
                                            required
                                            pattern={NUMBER_REGEX_STRING}
                                            min={1}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={`${blockName}.order`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Order <span className="text-red-500">*</span></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                        <FormControl>
                                            <SelectTrigger className="w-full py-5">
                                                <SelectValue placeholder="Select an option" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                Object.entries(EOrder).map(([key, value]) => (
                                                    <SelectItem key={key} value={value}>{key}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )
            }

            {
                Array.isArray(selected) && (
                    <FormField
                        control={form.control}
                        name={`${blockName}.selected`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Choose Specefic Ones</FormLabel>
                                <FormControl>
                                    <InfiniteMultiSelect
                                        endpoint={`${form.watch(`${blockName}.ref`)}/options`}
                                        onSelectionChange={val => {
                                            console.log(val)
                                            field.onChange(val)
                                        }}
                                        selected={field.value}
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