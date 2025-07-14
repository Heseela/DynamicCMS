import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { ImageUploadFormField, type ImageFormField } from "./image-upload-form-field";

type Props<T extends Record<string, any>> = {
  formField: ImageFormField<T>;
  imageURLs?: string | string[];
  reset?: boolean;
};

export const ImageUploadField = <T extends Record<string, any>>({ 
  formField, 
  imageURLs, 
  reset 
}: Props<T>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={formField.name}
      render={({ fieldState }) => (
        <FormItem>
          <FormLabel>
            {formField.label}
            {formField.required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <ImageUploadFormField 
              formField={formField}
              imageURLs={imageURLs}
              reset={reset}
            />
          </FormControl>
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};