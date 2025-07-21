import { useMemo } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Plus } from "lucide-react";
import CardAccordion from "./card-accordion";
import type { BlockComponentProps } from "../blocks";
import type { TPageDto } from "../../../../../../Models/page.model";
import { ECardsBlockLayout } from "../../../../../../Types/blocks.types";
import { FormControl, FormField, FormLabel, FormMessage } from "../../../../../ui/form";
import FormItem from "antd/es/form/FormItem";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../ui/select";
import { Checkbox } from "../../../../../form-component/checkbox-form-field";
import { Button } from "../../../../../ui/button";
import { ELinkType } from "../../../../../../Types/global.types";
import { Input } from "../../../../../ui/input";

const NUMBER_REGEX_STRING = "^[0-9]*$";

export default function CardsBlock({ sectionIdx, blockIdx }: BlockComponentProps) {
    const form = useFormContext<TPageDto>();

    const blockName = `sections.${sectionIdx}.blocks.items.${blockIdx}` as const;
    const cardFieldName = `${blockName}.cards` as const;

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: cardFieldName,
    });

    const layout = useWatch({
        control: form.control,
        name: `${blockName}.layout`
    });

    const maxColsFieldDisabled = useMemo(() => [ECardsBlockLayout.Horizontal, ECardsBlockLayout.Vertical].includes(layout), [layout]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name={`${blockName}.layout`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Layout <span className="text-red-500">*</span></FormLabel>
                            <Select
                                onValueChange={(val: ECardsBlockLayout) => {
                                    if (!maxColsFieldDisabled) {
                                        if ([ECardsBlockLayout.Horizontal, ECardsBlockLayout.Vertical].includes(val)) {
                                            form.setValue(`${blockName}.maxColumns`, 0)
                                        }
                                    }
                                    field.onChange(val);
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
                                    {Object.entries(ECardsBlockLayout).map(([key, value]) => (
                                        <SelectItem key={key} value={value}>{key}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={`${blockName}.maxColumns`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Max Columns {!maxColsFieldDisabled && <span className='text-red-500'>*</span>}</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className='py-5'
                                    required
                                    pattern={NUMBER_REGEX_STRING}
                                    disabled={maxColsFieldDisabled}
                                    min={1}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-6">
                    <FormField
                        control={form.control}
                        name={`${blockName}.borderLess`}
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center gap-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                    Borderless
                                </FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={`${blockName}.newTab`}
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center gap-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                    Open in new tab
                                </FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            {/* Cards */}
            <div className="space-y-2">
                <FormField
                    control={form.control}
                    name={`${blockName}.cards`}
                    render={() => (
                        <FormItem>
                            <FormLabel>Cards <span className='text-red-500'>*</span></FormLabel>

                            <div className="space-y-2">
                                {fields.map((f, idx) => (
                                    <FormField
                                        key={f.id}
                                        control={form.control}
                                        name={`${cardFieldName}.${idx}`}
                                        render={() => (
                                            <FormItem>
                                                <FormControl>
                                                    <CardAccordion
                                                        idx={idx}
                                                        name={`${cardFieldName}.${idx}`}
                                                        onRemove={() => remove(idx)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>

                            <FormControl>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="font-normal text-xs w-fit"
                                    onClick={() => {
                                        append({
                                            title: "",
                                            subtitle: "",
                                            description: "",
                                            link: {
                                                url: "",
                                                type: ELinkType.Internal
                                            },
                                            image: undefined,
                                        })
                                    }}
                                >
                                    <Plus size={16} /> Add Card
                                </Button>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}