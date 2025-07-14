import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import JoditEditorComponent from "./rich-text-editor";
import type { TFormField } from "../../Types/global.types";

type Props<T extends Record<string, any>> = {
    formField: TFormField<T>;
    richText?: boolean;
    isArray?: boolean;
};

export default function TextAreaField<T extends Record<string, any>>({ formField, richText, isArray = false }: Props<T>) {
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
                        {formField.name === 'content' || richText ? (
                            <JoditEditorComponent
                            onChange={field.onChange}
                            value={field.value}
                            />
                        ) : isArray ? (
                            <Textarea
                                placeholder={formField.placeholder}
                                value={Array.isArray(field.value) ? field.value.join('\n') : ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    field.onChange(value.split('\n').filter(item => item.trim() !== ''));
                                }}
                                cols={8}
                                rows={4}
                                style={{ resize: 'none' }}
                            />
                        ) : (
                            <Textarea
                                placeholder={formField.placeholder}
                                {...field}
                                cols={8}
                                rows={4}
                                style={{ resize: 'none' }}
                            />
                        )}
                    </FormControl>
                    {!richText && <FormMessage />}
                </FormItem>
            )}
        />
    );
}