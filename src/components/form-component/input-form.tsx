
import type { TFormField } from "../../Types/global.types";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useFormContext } from "react-hook-form";

type Props<T extends Record<string, any>> = {
    formField: TFormField<T>;
    valueAsNumber?: boolean;
};

export default function InputField<T extends Record<string, any>>({ formField, valueAsNumber = false }: Props<T>) {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={formField.name as string}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium">
                        {formField.label}
                        {!!formField.required && (
                            <span className="text-red-500 ml-1">*</span>
                        )}
                    </FormLabel>
                    <FormControl>
                        <Input 
                            placeholder={formField.placeholder} 
                            {...field}
                            type={formField.type}
                            value={field.value ?? ''}
                            onChange={(e) => {
                                if (valueAsNumber && formField.type === 'number') {
                                    field.onChange(e.target.value === '' ? null : Number(e.target.value));
                                } else {
                                    field.onChange(e.target.value);
                                }
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
