import { PlusCircle, X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { Label } from "../../ui/label";
import { FormControl } from "../../ui/form";
import { Input } from "../../ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { Button } from "../../ui/button";

export interface FormFieldProps {
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
}

export interface FieldArrayProps {
    formField: FormFieldProps;
    initialValue?: any;
}

export const SocialProfileFieldArray = ({ formField }: FieldArrayProps) => {
    const { control, register, getValues } = useFormContext();
    const { fields, remove, append } = useFieldArray({
        control,
        name: formField.name,
    });

    const handleAppend = () => {
        const currentValues = getValues(formField.name);
        const lastEntry = currentValues[fields.length - 1];

        if (lastEntry?.trim() !== "") {
            append("");
        } else {
            toast.error("Please fill out the current URL before adding a new one.");
        }
    };

    return (
        <div className="w-full">
            <Label className="text-sm mb-2">
                {formField.label}
                {formField.required && <span className="text-red-500">*</span>}
            </Label>

            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                        <FormControl className="flex-1">
                            <Input
                                className="h-10"
                                placeholder={formField.placeholder}
                                type={formField.type}
                                {...register(`${formField.name}.${index}`)}
                            />
                        </FormControl>

                        {fields.length > 1 && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            type="button"
                                            variant={"outline"}
                                            className="text-red-500 hover:text-red-600 size-10 px-3"
                                            onClick={() => remove(index)}
                                            size={"icon"}
                                        >
                                            <X className="size-8 font-semibold" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Delete</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}

                        {index === fields.length - 1 && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            type="button"
                                            variant={"outline"}
                                            className="text-green-500 hover:text-green-600 size-10 p-2" 
                                            onClick={handleAppend}
                                            size={"icon"}
                                        >
                                            <PlusCircle className="size-6" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Add</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};