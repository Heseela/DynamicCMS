import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { ImageUploadFormField } from "./image-upload-form-field";
import RenderImages from "./render-images";

type Props = {
  formField: {
    name: string,
    label: string,
    accept?: string,
    required?: boolean,
    multiple?: boolean
  };
};

export const ImageUploadField = ({
  formField,
}: Props) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={formField.name}
      render={({ fieldState, field }) => (
        <FormItem>
          <FormLabel>
            {formField.label}
            {formField.required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <ImageUploadFormField
              name={formField.name}
              onChange={media => {
                field.onChange(formField.multiple ? media : media[0])
              }}
            />
          </FormControl>
          <RenderImages
            media={field.value}
            onRemove={id => {
              const values = field.value;

              if (Array.isArray(values)) {
                const newImages = values.filter(v => v.id !== id);
                field.onChange(newImages);
                return;
              }

              field.onChange(undefined);
            }}
          />
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};