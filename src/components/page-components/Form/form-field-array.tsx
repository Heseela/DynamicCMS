import { useFieldArray, useFormContext } from "react-hook-form";
import { Trash2 } from "lucide-react";
import type { TForm, TFormField } from "../../../Models/form.model";
import FormAddFieldDialog from "./form-field-add-dialog";
import { FormFieldType } from "../../../Models/form.model";
import BaseField from "./fields/base-field";
import SelectField from "./fields/select-field";
import FileField from "./fields/file-field";
import RelationField from "./fields/relation-field";
import CustomAlertDialogConfirmation from "../../../Global/custom-alter";

const fieldComponents = {
  [FormFieldType.Text]: BaseField,
  [FormFieldType.Email]: BaseField,
  [FormFieldType.Number]: BaseField,
  [FormFieldType.Textarea]: BaseField,
  [FormFieldType.Tel]: BaseField,
  [FormFieldType.Select]: SelectField,
  [FormFieldType.File]: FileField,
  [FormFieldType.Relation]: RelationField,
};

export const FieldArray = () => {
  const { control } = useFormContext<TForm>();
  const { fields, append, remove } = useFieldArray({
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
      defaultValue: "",
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

  const handleDelete = (index: number) => {
    remove(index);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-sm">Form Fields</h3>
        <FormAddFieldDialog onAddField={addField as (type: FormFieldType) => void} />
      </div>

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
                  <CustomAlertDialogConfirmation
                    trigger={<Trash2 className="text-red-600" size={16} />}
                    description="Are you sure you want to delete this field?"
                    onConfirm={() => handleDelete(index)}
                  />
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
