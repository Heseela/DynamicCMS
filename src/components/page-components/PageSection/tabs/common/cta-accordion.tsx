import { useFormContext } from "react-hook-form"
import { ChevronDown, ChevronUp, Copy, GripVertical, MoreHorizontal, Plus, X } from "lucide-react";
import { InternalLinkField } from "./internal-link-field";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../../../ui/accordion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../../ui/dropdown-menu";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../ui/form";
import { RadioGroup, RadioGroupItem } from "../../../../ui/radio-group";
import { ELinkType } from "../../../../../Types/global.types";
import { Checkbox } from "../../../../form-component/checkbox-form-field";
import { Input } from "../../../../ui/input";
import { ECtaVariant } from "../../../../../Types/blocks.types";
import SelectField from "../../../../form-component/select-form-field";

type Props = {
    idx: number
    name: string
    onRemove?: () => void
}

export default function CtaAccordion({ idx, name, onRemove }: Props) {
    const form = useFormContext();

    return (
        <Accordion type="multiple">
            <AccordionItem value={`${name}.id`} className="bg-secondary/50 border !border-b-1 rounded-md overflow-hidden">
                <section className="relative flex items-center gap-2 px-2">
                    <button type="button" className="hover:cursor-grab">
                        <GripVertical className="text-muted-foreground" size={16} />
                    </button>
                    <AccordionTrigger className="text-sm hover:no-underline py-3">
                        <span>Link {idx + 1}</span>
                    </AccordionTrigger>
                    <section className="absolute right-10">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="p-2">
                                <MoreHorizontal size={16} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="bg-white">
                                {
                                    idx !== 0 && <DropdownMenuItem><ChevronUp /> Move Up</DropdownMenuItem>
                                }
                                <DropdownMenuItem className="gap-1"><ChevronDown /> Move Down</DropdownMenuItem>
                                <DropdownMenuItem className="gap-1"><Plus /> Add Below</DropdownMenuItem>
                                <DropdownMenuItem className="gap-1"><Copy /> Duplicate</DropdownMenuItem>
                                <DropdownMenuItem className="gap-1"
                                    onClick={onRemove}
                                >
                                    <X /> Remove
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </section>
                </section>
                <AccordionContent className="px-3 py-5 bg-background space-y-6">
                    <section className="grid grid-cols-2 gap-6">

                        <FormField
                            control={form.control}
                            name={`${name}.type`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(val) => {
                                                form.setValue(`${name}.link`, "");
                                                field.onChange(val);
                                            }}
                                            defaultValue={field.value}
                                            className="flex  gap-10"
                                        >
                                            <label className="flex items-center gap-2">
                                                <RadioGroupItem value={ELinkType.Internal} id="internal" />
                                                <span className="text-sm font-normal">Internal Link</span>
                                            </label>

                                            <label className="flex items-center gap-2">
                                                <RadioGroupItem value={ELinkType.External} id="external" />
                                                <span className="text-sm font-normal">Custom URL</span>
                                            </label>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <section className="flex gap-10 items-end ">
                            <FormField
                                control={form.control}
                                name={`${name}.arrow`}
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center gap-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => field.onChange(checked)}
                                                />
                                            </FormControl>
                                            <FormLabel className="text-sm font-normal">Include Arrow</FormLabel>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`${name}.newTab`}
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center gap-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => field.onChange(checked)}
                                                />
                                            </FormControl>
                                            <FormLabel className="text-sm font-normal">Open in new tab</FormLabel>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </section>


                        <FormField
                            control={form.control}
                            name={`${name}.link`}
                            render={({ field }) => {
                                return form.watch(`${name}.type`) === ELinkType.External ? (
                                    <FormItem>
                                        <FormLabel>Custom URL <span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                type="url"
                                                placeholder="Eg. https://example.com"
                                                required
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                ) : (
                                    <InternalLinkField
                                        onChange={field.onChange}
                                    />
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name={`${name}.text`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Eg. Learm More"
                                            required
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </section>

                    {/* <FormField
                        control={form.control}
                        name={`${name}.variant`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Appearance</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select an option" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            Object.entries(ECtaVariant).map(([key, value]) => (
                                                <SelectItem key={key} value={value}>{key}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Choose how the link should be rendered.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

                    <SelectField
                        formField={{
                            name: `${name}.variant`,
                            label: "Appearance",
                            options: Object.entries(ECtaVariant).map(([key, value]) => ({
                                value: value,
                                label: key,
                            })),
                            placeholder: "Select an option",
                            description: "Choose how the link should be rendered.",
                            required: true, // Add if this field is required
                        }}
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}