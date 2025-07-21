import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useFormContext } from "react-hook-form";
import type { TFormField } from "../../Types/global.types";
import { FileUploadFormField } from "./file-upload-form-field";

type Props<T extends Record<string, any>> = {
  formField: TFormField<T> & { type: "file" };
  imageURL?: string | string[];
  reset?: boolean;
  maxCount?: number;
};

export const FileUploadField = <T extends Record<string, any>> ({ formField, imageURL, reset, maxCount }: Props<T>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={formField.name as string}
      render={() => (
        <FormItem>
          <FormLabel>
            {formField.label}
            {!!formField.required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <FileUploadFormField 
              formField={formField} 
              imageURL={imageURL} 
              reset={reset} 
              maxCount={maxCount} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};