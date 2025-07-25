// import { useFieldArray, useFormContext } from "react-hook-form";
// import { Trash2 } from "lucide-react";
// import type { TForm, TFormField } from "../../../Models/form.model";
// import FormAddFieldDialog from "./form-field-add-dialog";
// import { FormFieldType } from "../../../Models/form.model";
// import BaseField from "./fields/base-field";
// import SelectField from "./fields/select-field";
// import FileField from "./fields/file-field";
// import RelationField from "./fields/relation-field";
// import CustomAlertDialogConfirmation from "../../../Global/custom-alter";

// const fieldComponents = {
//   [FormFieldType.Text]: BaseField,
//   [FormFieldType.Email]: BaseField,
//   [FormFieldType.Number]: BaseField,
//   [FormFieldType.Textarea]: BaseField,
//   [FormFieldType.Tel]: BaseField,
//   [FormFieldType.Select]: SelectField,
//   [FormFieldType.File]: FileField,
//   [FormFieldType.Relation]: RelationField,
// };

// export const FieldArray = () => {
//   const { control } = useFormContext<TForm>();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "fields",
//   });

//   const addField = (type: TFormField["type"]) => {
//     const baseField = {
//       name: "",
//       label: "",
//       type,
//       required: false,
//       order: fields.length,
//       defaultValue: "",
//     };

//     switch (type) {
//       case "select":
//       case "file":
//         append({ ...baseField, accept: "" } as any);
//         break;
//       case "relation":
//         append({ ...baseField, dataSource: { entity: "job" } } as any);
//         break;
//       default:
//         append(baseField as any);
//     }
//   };

//   const handleDelete = (index: number) => {
//     remove(index);
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h3 className="font-medium text-sm">Form Fields</h3>
//         <FormAddFieldDialog onAddField={addField as (type: FormFieldType) => void} />
//       </div>

//       <div className="space-y-4">
//         {fields.map((field, index) => {
//           const FieldComponent = fieldComponents[field.type];
//           return (
//             <div key={field.id} className="border rounded-lg p-4">
//               <div className="flex justify-between items-center mb-4">
//                 <h4 className="font-medium">
//                   {field.label || `Field ${index + 1}`}
//                 </h4>
//                 <div className="flex gap-2">
//                   <CustomAlertDialogConfirmation
//                     trigger={<Trash2 className="text-red-600" size={16} />}
//                     description="Are you sure you want to delete this field?"
//                     onConfirm={() => handleDelete(index)}
//                   />
//                 </div>
//               </div>
//               {FieldComponent && <FieldComponent idx={index} />}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };



import { useFieldArray, useFormContext } from "react-hook-form";
import { ChevronDown, ChevronUp, Copy, GripVertical, MoreHorizontal, Plus, X } from "lucide-react";
import type { TForm, TFormField } from "../../../Models/form.model";
import { FormFieldType } from "../../../Models/form.model";
import BaseField from "./fields/base-field";
import SelectField from "./fields/select-field";
import FileField from "./fields/file-field";
import RelationField from "./fields/relation-field";
import CustomAlertDialogConfirmation from "../../../Global/custom-alter";
import FormAddFieldDialog from "./form-field-add-dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { Badge } from "../../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import CheckboxField from "./fields/checkbox-field";
import RadioField from "./fields/radio-field";

const fieldComponents = {
  [FormFieldType.Text]: BaseField,
  [FormFieldType.Email]: BaseField,
  [FormFieldType.Number]: BaseField,
  [FormFieldType.Textarea]: BaseField,
  [FormFieldType.Tel]: BaseField,
  [FormFieldType.Select]: SelectField,
  [FormFieldType.File]: FileField,
  [FormFieldType.Relation]: RelationField,
  [FormFieldType.Checkbox]: CheckboxField,
  [FormFieldType.Radio]: RadioField,
};

export const FieldArray = () => {
  const { control } = useFormContext<TForm>();
  const { fields, append, remove, swap, insert } = useFieldArray({
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-sm">Form Fields</h3>
        <FormAddFieldDialog onAddField={addField as (type: FormFieldType) => void} />
      </div>

      <div className="space-y-2">
        {fields.map((field, idx) => {
          const FieldComponent = fieldComponents[field.type];
          return (
            <Accordion key={field.id} type="multiple">
              <AccordionItem value={field.id} className="bg-secondary/50 border !border-b-1 rounded-md overflow-hidden">
                <div className="relative flex items-center gap-2 px-2">
                  <button type="button" className="hover:cursor-grab">
                    <GripVertical className="text-muted-foreground" size={16} />
                  </button>
                  <AccordionTrigger className="text-sm hover:no-underline py-3">
                    <div className="space-x-3">
                      <span className="font-light">{(idx + 1).toString().padStart(2, "0")}</span>
                      {field.label && <Badge className="max-w-[50ch] truncate">{field.label}</Badge>}
                      <Badge variant="outline" className="capitalize">{field.type}</Badge>
                    </div>
                  </AccordionTrigger>
                  <div className="absolute right-10">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-2">
                        <MoreHorizontal size={16} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="top" className="bg-white">
                        {idx !== 0 && (
                          <DropdownMenuItem className="gap-1" onClick={() => swap(idx, idx - 1)}>
                            <ChevronUp size={16} /> Move Up
                          </DropdownMenuItem>
                        )}
                        {idx !== fields.length - 1 && (
                          <DropdownMenuItem className="gap-1" onClick={() => swap(idx, idx + 1)}>
                            <ChevronDown size={16} /> Move Down
                          </DropdownMenuItem>
                        )}
                        <FormAddFieldDialog
                          onAddField={(type) => {
                            addField(type);
                            }}
                        >
                          <DropdownMenuItem className="gap-1" onSelect={(e) => e.preventDefault()}>
                            <Plus size={16} /> Add Below
                          </DropdownMenuItem>
                        </FormAddFieldDialog>
                        <DropdownMenuItem
                          className="gap-1"
                          onClick={() => insert(idx + 1, { ...field })}
                        >
                          <Copy size={16} /> Duplicate
                        </DropdownMenuItem>
                        <CustomAlertDialogConfirmation
                          trigger={
                            <DropdownMenuItem className="gap-1 text-red-600" onSelect={(e) => e.preventDefault()}>
                              <X size={16} /> Remove
                            </DropdownMenuItem>
                          }
                          description="Are you sure you want to delete this field?"
                          onConfirm={() => remove(idx)}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <AccordionContent className="px-3 py-5 bg-background space-y-6">
                  {FieldComponent && <FieldComponent idx={idx} />}
                  {/* <div className="flex justify-end">
                    <CustomAlertDialogConfirmation
                      trigger={
                        <Button variant="destructive" size="sm">
                          <Trash2 className="mr-2" size={16} />
                          Delete Field
                        </Button>
                      }
                      description="Are you sure you want to delete this field?"
                      onConfirm={() => remove(idx)}
                    />
                  </div> */}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};