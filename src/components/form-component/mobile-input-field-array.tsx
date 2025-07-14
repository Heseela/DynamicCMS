import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form";
import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";
import { useFormContext } from "react-hook-form";
import type { E164Number } from "libphonenumber-js/core";
import type { TFormField } from "../../Types/global.types";
type Props<T extends Record<string, any>> = {
    formField: TFormField<T>;
};

export default function MobileInputFieldForm<T extends Record<string, any>>({ formField }: Props<T>) {
    const form = useFormContext();
    return (
        <FormField
            control={form.control}
            name={formField.name as string}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {formField.label}
                        {!!formField.required && (
                            <span className="text-red-500 ml-1">*</span>
                        )}
                    </FormLabel>
                    <FormControl>
                        <PhoneInput
                            defaultCountry="NP"
                            placeholder={formField.placeholder}
                            international
                            // withCounrtyCallingCode
                            value={field.value as E164Number | undefined}
                            onChange={field.onChange}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
