import { useState } from "react";

import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../../components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import type { TFormField } from "../../Types/global.types";


type Props<T extends Record<string, any>> = {
    formField: TFormField<T>;
};

const PasswordFieldForm = <T extends Record<string, any>>({ formField }: Props<T>) => {
    const { register, control } = useFormContext();
    const [isVisible, setIsVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <FormField
            control={control}
            name={formField.name as string}
            render={() => (
                <FormItem>

                    <FormLabel className="capitalize">
                        {formField.label as string}
                        {!!formField.required && (
                            <span className="text-red-500 ml-1">*</span>
                        )}
                    </FormLabel>
                    <FormControl>
                        <div
                            className="flex justify-between items-center h-9 w-full rounded-md
             border border-input bg-transparent px-3 py-1 text-sm shadow-sm 
             transition-colors file:border-0 file:bg-transparent file:text-sm 
             file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
             focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed 
             disabled:opacity-50"
                        >
                            <input
                                type={isVisible ? "text" : "password"}
                                id={formField.name as string}
                                placeholder={formField.placeholder}
                                {...register(formField.name as string)}
                                className="outline-none border-none w-full"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="text-xl text-gray-600"
                            >
                                {!isVisible ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default PasswordFieldForm;
