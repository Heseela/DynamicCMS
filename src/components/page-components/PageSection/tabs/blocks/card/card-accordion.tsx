import { useFormContext } from "react-hook-form"
import { ChevronDown, ChevronUp, Copy, GripVertical, MoreHorizontal, Plus, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../../../ui/dropdown-menu";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../../ui/form";
import InputField from "../../../../../form-component/input-form";
import type { TMediaSchema } from "../../../../../../Models/media.model";
import { Checkbox } from "../../../../../form-component/checkbox-form-field";
import { Label } from "../../../../../ui/label";
import { ELinkType } from "../../../../../../Types/global.types";
import { RadioGroup, RadioGroupItem } from "../../../../../ui/radio-group";
import { Input } from "../../../../../ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../../../ui/accordion";
import { FileUploadField } from "../../../../../form-component/upload-image";
import { InternalLinkField } from "../../common/internal-link-field";

type Props = {
    idx: number
    name: string
    onRemove?: () => void
}

export default function CardAccordion({ idx, name, onRemove }: Props) {
    const form = useFormContext();

    return (
        <Accordion type="multiple">
            <AccordionItem value={`${name}.id`} className="bg-secondary/50 border !border-b-1 rounded-md overflow-hidden">
                <section className="relative flex items-center gap-2 px-2">
                    <button type="button" className="hover:cursor-grab">
                        <GripVertical className="text-muted-foreground" size={16} />
                    </button>
                    <AccordionTrigger className="text-sm hover:no-underline py-3">
                        <span>Card {idx + 1}</span>
                    </AccordionTrigger>
                    <section className="absolute right-10">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="p-2">
                                <MoreHorizontal size={16} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top">
                                {
                                    idx !== 0 && <DropdownMenuItem><ChevronUp /> Move Up</DropdownMenuItem>
                                }
                                <DropdownMenuItem><ChevronDown /> Move Down</DropdownMenuItem>
                                <DropdownMenuItem><Plus /> Add Below</DropdownMenuItem>
                                <DropdownMenuItem><Copy /> Duplicate</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={onRemove}
                                >
                                    <X /> Remove
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </section>
                </section>
                <AccordionContent className="px-3 py-5 bg-background space-y-6">

                    <InputField
                        formField={{
                            name: `${name}.title`,
                            label: "Title",
                            type: "text",
                            placeholder: "Enter title",
                            // required: true,
                        }}
                    />

                    <InputField
                        formField={{
                            name: `${name}.subtitle`,
                            label: "Subtitle",
                            type: "text",
                            placeholder: "Enter subtitle",
                            // required: true,
                        }}
                    />

                    <InputField
                        formField={{
                            name: `${name}.description`,
                            label: "Description",
                            type: "text",
                            placeholder: "Enter description",
                            // required: true,
                        }}
                    />

                    {/* <FormField
                        control={form.control}
                        name={`${name}.image`}
                        render={({ field }) => {
                            const value = field.value as TMediaSchema | null;

                            return (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        {
                                            value ? (
                                                <MediaItem
                                                    media={value}
                                                    onRemove={() => {
                                                        field.onChange(null)
                                                    }}
                                                />
                                            ) : (
                                                <MediaInput onChange={field.onChange} />
                                            )
                                        }
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    /> */}

                    <FileUploadField
                        formField={{
                            label: "Image",
                            name: `${name}.image` as never,
                            type: "file",
                            required: false,
                            accept: "image/jpg, image/png, image/jpeg",
                        }}
                        imageURL={
                            form.watch(`${name}.image`)
                                ? (form.watch(`${name}.image`) as TMediaSchema).secure_url
                                : undefined
                        }                       
                    />



                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={!!form.watch(`${name}.link`)}
                            onCheckedChange={val => {
                                if (val) {
                                    form.setValue(`${name}.link`, {
                                        url: "",
                                        type: ELinkType.Internal
                                    });
                                } else {
                                    form.setValue(`${name}.link`, undefined);
                                }
                            }}
                        />
                        <Label htmlFor="enable-link">Enable link?</Label>
                    </div>

                    {
                        !!form.watch(`${name}.link`) && (
                            <>
                                <FormField
                                    control={form.control}
                                    name={`${name}.link.type`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={val => {
                                                        form.setValue(`${name}.link.url`, "");
                                                        field.onChange(val);
                                                    }}
                                                    defaultValue={field.value}
                                                    className="flex"
                                                >
                                                    <FormItem className="flex items-center gap-3">
                                                        <FormControl>
                                                            <RadioGroupItem value={ELinkType.Internal} />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Internal Link
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center gap-3">
                                                        <FormControl>
                                                            <RadioGroupItem value={ELinkType.External} />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Custom URL
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`${name}.link.url`}
                                    render={({ field }) => {
                                        return form.watch(`${name}.link.type`) === ELinkType.External ? (
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
                            </>
                        )
                    }
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}