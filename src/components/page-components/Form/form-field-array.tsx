import { useFieldArray, useFormContext } from "react-hook-form";
import { Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "../../ui/button";
import type { TForm, TFormField } from "../../../Models/form.model";
import FormAddFieldDialog from "./form-field-add-dialog";
import { FormFieldType } from "../../../Models/form.model";
import BaseField from "./fields/base-field";
import SelectField from "./fields/select-field";
import CheckboxField  from "./fields/checkbox-field";
import RadioField from "./fields/radio-field";
import FileField from "./fields/file-field";
import RelationField from "./fields/relation-field";

const fieldComponents = {
  [FormFieldType.Text]: BaseField,
  [FormFieldType.Email]: BaseField,
  [FormFieldType.Number]: BaseField,
  [FormFieldType.Textarea]: BaseField,
  [FormFieldType.Checkbox]: CheckboxField,
  [FormFieldType.Select]: SelectField,
  [FormFieldType.Radio]: RadioField,
  [FormFieldType.File]: FileField,
  [FormFieldType.Relation]: RelationField,
};

export const FieldArray = () => {
  const { control } = useFormContext<TForm>();
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "fields",
  });

  const addField = (type: TFormField["type"]) => {
    const baseField = {
      name: "",
      label: "",
      type,
      required: false,
      order: fields.length,
    };

    switch (type) {
      case "select":
      case "file":
        append({ ...baseField, accept: "" } as any);
        break;
      case "relation":
        append({ ...baseField, dataSource: { entity: "job" } } as any);
        break;
      default:
        append(baseField as any);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Form Fields</h3>
        <FormAddFieldDialog onAddField={addField as (type: FormFieldType) => void} />
      </div>

      {fields.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No fields added yet. Click the button above to add fields.
        </div>
      )}

      <div className="space-y-4">
        {fields.map((field, index) => {
          const FieldComponent = fieldComponents[field.type];
          return (
            <div key={field.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">
                  {field.label || `Field ${index + 1}`}
                </h4>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => swap(index, index - 1)}
                    disabled={index === 0}
                  >
                    <ChevronUp size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => swap(index, index + 1)}
                    disabled={index === fields.length - 1}
                  >
                    <ChevronDown size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              </div>
              {FieldComponent && <FieldComponent idx={index} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};