// import { useFieldArray, useFormContext } from 'react-hook-form';
// import { Plus, Trash2 } from 'lucide-react';
// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../ui/form';
// import type { FormFieldComponentProps } from './fields';
// import { Input } from '../../../ui/input';
// import { Checkbox } from '../../../form-component/checkbox-form-field';
// import { Button } from '../../../ui/button';
// import type { TFormDto } from '../../../../Models/forms';
// import InputField from '../../../form-component/input-form';

// export default function RadioField({ idx }: FormFieldComponentProps) {
//     const form = useFormContext<TFormDto>();

//     return (
//         <section className='container space-y-6'>
//             <section className='grid md:grid-cols-2 grid-cols-1 gap-6'>
//                 <InputField
//                     formField={{
//                         name: `fields.${idx}.name`,
//                         label: "Name",
//                         type: "text",
//                         placeholder: "Enter name",
//                         required: true,
//                     }}
//                 />

//                 <InputField
//                     formField={{
//                         name: `fields.${idx}.label`,
//                         label: "Label",
//                         type: "text",
//                         placeholder: "Enter label",
//                         required: true,
//                     }}
//                 />

//                 <InputField
//                     formField={{
//                         name: `fields.${idx}.placeholder`,
//                         label: "Placeholder",
//                         type: "text",
//                         placeholder: "Enter placeholder",
//                         required: true,
//                     }}
//                 />

//                 <InputField
//                     formField={{
//                         name: `fields.${idx}.defaultValue`,
//                         label: "Default Value",
//                         type: "text",
//                         placeholder: "Enter default value",
//                         required: true,
//                     }}
//                 />
//             </section>

//             <section className='space-y-6'>
//                 <OptionsField idx={idx} />

//                 <section className='flex gap-6'>
//                     <FormField
//                         control={form.control}
//                         name={`fields.${idx}.required`}
//                         render={({ field }) => {
//                             return (
//                                 <FormItem className="flex flex-row items-center gap-2">
//                                     <FormControl>
//                                         <Checkbox
//                                             checked={field.value}
//                                             onCheckedChange={(checked) => field.onChange(checked)}
//                                         />
//                                     </FormControl>
//                                     <FormLabel className="text-sm font-normal">
//                                         Required
//                                     </FormLabel>
//                                     <FormMessage />
//                                 </FormItem>
//                             )
//                         }}
//                     />
//                 </section>
//             </section>
//         </section>
//     )
// }

// function OptionsField({ idx }: FormFieldComponentProps) {
//     const form = useFormContext<TFormDto>();
//     const { fields, append, remove, swap } = useFieldArray({
//         control: form.control,
//         name: `fields.${idx}.options`,
//     });

//     return (
//         <FormField
//             control={form.control}
//             name={`fields.${idx}.options`}
//             render={() => {
//                 return (
//                     <FormItem className='container'>
//                         <FormLabel>Radio Attribute Options <span className='text-red-500'>*</span></FormLabel>

//                         <section className='space-y-2'>
//                             {fields.map((field, index) => (
//                                 <div key={field.id} className='flex gap-2 items-center'>
//                                     <FormField
//                                         control={form.control}
//                                         name={`fields.${idx}.options.${index}.label`}
//                                         render={({ field }) => (
//                                             <FormItem className='grow'>
//                                                 <FormControl>
//                                                     <Input
//                                                         placeholder='Label'
//                                                         required
//                                                         {...field}
//                                                     />
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                     <FormField
//                                         control={form.control}
//                                         name={`fields.${idx}.options.${index}.value`}
//                                         render={({ field }) => (
//                                             <FormItem className='grow'>
//                                                 <FormControl>
//                                                     <Input
//                                                         placeholder='Value'
//                                                         required
//                                                         {...field}
//                                                     />
//                                                 </FormControl>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                     <div className="flex gap-1">
                                    
//                                         <Button
//                                             variant="ghost"
//                                             size="icon"
//                                             onClick={() => append({ label: '', value: '' }, { focusName: `fields.${idx}.options.${index + 1}.label` })}
//                                             className="h-8 w-8 text-green-600 border"
//                                         >
//                                             <Plus size={16} />
//                                         </Button>
//                                         <Button
//                                             variant="ghost"
//                                             size="icon"
//                                             onClick={() => remove(index)}
//                                             className="h-8 w-8 text-red-600 border"
//                                         >
//                                             <Trash2 size={16} />
//                                         </Button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </section>

//                         <FormControl>
//                             <section>
//                                 <Button
//                                     type="button"
//                                     variant={"outline"}
//                                     size={"sm"}
//                                     className="font-normal text-xs mt-2 "
//                                     onClick={() => append({ label: '', value: '' })}
//                                 >
//                                     <Plus size={16} className="mr-2" /> Add Option
//                                 </Button>
//                             </section>
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                 )
//             }}
//         />
//     )
// }