import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import InputField from "./input-form";

interface ArrayInputFieldProps {
  formField: {
    name: string;
    label: string;
    placeholder: string;
    required?: boolean;
    type?: string;
  };
}

export const ArrayInputField = ({ formField }: ArrayInputFieldProps) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: formField.name,
  });

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {formField.label}
        {formField.required && <span className="text-red-500">*</span>}
      </label>
      
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-end">
          <InputField
            formField={{
              name: `${formField.name}.${index}`,
              type: "text",
              placeholder: formField.placeholder,
              required: formField.required,
            }}
          />
          {fields.length > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => remove(index)}
              className="h-10"
            >
              Remove
            </Button>
          )}
        </div>
      ))}
      
      <Button
        type="button"
        variant="secondary"
        onClick={() => append("")}
      >
        Add {formField.label}
      </Button>
    </div>
  );
};