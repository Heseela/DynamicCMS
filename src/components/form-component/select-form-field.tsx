import { Controller, useFormContext } from "react-hook-form"
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Option = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  formField: {
    name: string;
    label: string;
    options: Option[] | undefined;
    placeholder?: string;
    required?: boolean;
    description?: string;
    disabled?: boolean;
  };
};

const SelectField = ({ formField }: SelectFieldProps) => {
    const { control } = useFormContext();
  return (
    <Controller
      name={formField.name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <div className="space-y-2">
            <FormLabel>
              {formField.label}
              {formField.required && <span className="text-red-500"> *</span>}
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder={formField.placeholder || "Select an option"} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white">
                {formField.options?.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="hover:bg-gray-100 focus:bg-gray-100"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formField.description && (
              <p className="text-sm text-muted-foreground">
                {formField.description}
              </p>
            )}
            <FormMessage>{error?.message}</FormMessage>
          </div>
        </FormItem>
      )}
    />
  );
};

export default SelectField;