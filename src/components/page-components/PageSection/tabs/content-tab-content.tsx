
import { useFieldArray, useFormContext } from "react-hook-form"
import { ChevronDown, ChevronUp, Copy, GripVertical, MoreHorizontal, Plus, X } from "lucide-react";
import type { TPageDto } from "../../../../Models/page.model";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../../ui/accordion";
import { Badge } from "../../../ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Button } from "../../../ui/button";
import BlockField from "./block-field";
import { Textarea } from "../../../ui/textarea";
import { Input } from "../../../ui/input";
import SelectField from "../../../form-component/select-form-field";
import CustomAlertDialogConfirmation from "../../../../Global/custom-alter";

const sectionDefaultValue = {
    headline: "",
    subheadline: "",
    blocks: [{
        direction: "horizontal" as "horizontal" | "vertical",
        items: []
    }]
}

export default function ContentTabContent() {
    const form = useFormContext<TPageDto>();
    const { fields, append, remove, swap, insert } = useFieldArray({
        control: form.control,
        name: "sections",
    });

    return (
        <section className="space-y-2">
            <p className="text-sm">Sections <span className="text-red-500">*</span></p>
            {
                form.formState.errors.sections && <p className="text-red-500 text-sm">{form.formState.errors.sections?.message || form.formState.errors.sections?.root?.message}</p>
            }
            <section className="space-y-2">
                {
                    fields.map((f, idx) => {
                        return (
                            <FormField
                                key={f.id}
                                control={form.control}
                                name={`sections.${idx}`}
                                render={({ field }) => {
                                    const headline = form.watch(`sections.${idx}.headline`)?.trim();

                                    return (
                                        <FormItem>
                                            <FormControl>
                                                <Accordion type="multiple">
                                                    <AccordionItem value={f.id} className="bg-secondary/50 border !border-b-1 rounded-md overflow-hidden">
                                                        <section className="relative flex items-center gap-2 px-2">
                                                            <button type="button" className="hover:cursor-grab">
                                                                <GripVertical className="text-muted-foreground" size={16} />
                                                            </button>
                                                            <AccordionTrigger className="text-sm hover:no-underline py-3">
                                                                <section className="space-x-3">
                                                                    <span className="font-light">{(idx + 1).toString().padStart(2, "0")}</span>
                                                                    {!!headline?.length && <Badge className="max-w-[50ch] truncate">{headline}</Badge>}
                                                                </section>
                                                            </AccordionTrigger>
                                                            <section className="absolute right-10">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger className="p-2">
                                                                        <MoreHorizontal size={16} />
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent side="top" className="bg-white">
                                                                        {
                                                                            idx !== 0 && <DropdownMenuItem className="gap-1" onClick={() => swap(idx, idx - 1)}>
                                                                                <ChevronUp /> Move Up
                                                                            </DropdownMenuItem>
                                                                        }
                                                                        <DropdownMenuItem className="gap-1" onClick={() => swap(idx, idx + 1)}>
                                                                            <ChevronDown /> Move Down
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem className="gap-1" onClick={() => insert(idx + 1, sectionDefaultValue)}>
                                                                            <Plus /> Add Below
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem className="gap-1" onClick={() => insert(idx + 1, field.value)}><Copy /> Duplicate
                                                                        </DropdownMenuItem>
                                                                        {/* <DropdownMenuItem className="gap-1" onClick={() => remove(idx)}>
                                                                            <X  className=" text-red-600"/> Remove
                                                                        </DropdownMenuItem> */}
                                                                        <CustomAlertDialogConfirmation
                                                                            trigger={
                                                                                <DropdownMenuItem className="gap-1 text-red-600" onSelect={(e) => e.preventDefault()}>
                                                                                    <X size={16} /> Remove
                                                                                </DropdownMenuItem>
                                                                            }
                                                                            description="Are you sure you want to delete this field?"
                                                                            onConfirm={() => remove(idx)}
                                                                        />
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </section>
                                                        </section>
                                                        <AccordionContent className="px-3 py-5 bg-background space-y-6">
                                                            <FormField
                                                                control={form.control}
                                                                name={`sections.${idx}.headline`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Headline</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                className='py-5'
                                                                                maxLength={50}
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name={`sections.${idx}.subheadline`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Sub Headline</FormLabel>
                                                                        <FormControl>
                                                                            <Textarea
                                                                                className="field-sizing-content overflow-y-hidden resize-none w-full focus-visible:outline-0"
                                                                                maxLength={300}
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <BlockField sectionIdx={idx} />

                                                            {field.value.blocks && field.value.blocks[0]?.items?.length > 0 && (
                                                                <SelectField
                                                                    formField={{
                                                                        name: `sections.${idx}.blocks.0.direction`,
                                                                        label: "Blocks Direction",
                                                                        options: [
                                                                            { value: "horizontal", label: "Horizontal" },
                                                                            { value: "vertical", label: "Vertical" }
                                                                        ],
                                                                        placeholder: "Select an option",
                                                                        required: true
                                                                    }}
                                                                />
                                                            )}
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                        )
                    })
                }
            </section>
            <Button
                type="button"
                variant={"outline"}
                size={"sm"}
                className="font-normal text-xs"
                onClick={() => append(sectionDefaultValue)}
            >
                <Plus size={16} /> Add Section
            </Button>
        </section>
    )
}

