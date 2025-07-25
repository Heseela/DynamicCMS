import React from "react";
import { FormFieldType } from "../../../Models/form.model";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Plus } from "lucide-react";

type FormAddFieldDialogProps = {
  onAddField: (type: FormFieldType) => void;
  children?: React.ReactNode;
};

const fieldTypes = [
  { type: FormFieldType.Text, label: "Text Input" },
  { type: FormFieldType.Email, label: "Email Input" },
  { type: FormFieldType.Number, label: "Number Input" },
  { type: FormFieldType.Textarea, label: "Text Area" },
  { type: FormFieldType.Select, label: "Select Dropdown" },
  { type: FormFieldType.File, label: "File Upload" },
  { type: FormFieldType.Tel, label: "Tel Input" },
  { type: FormFieldType.Relation, label: "Relation Field" },
   { type: FormFieldType.Checkbox, label: "Checkbox Field" },
   { type: FormFieldType.Radio, label: "Radio Field" },
] as const;

export default function FormAddFieldDialog({ onAddField, children }: FormAddFieldDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleAddField = (type: FormFieldType) => {
    onAddField(type);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children ? (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button
                    type="button"
                    variant={"outline"}
                    size={"sm"}
                    className="font-normal text-xs"
                >
                    <Plus size={16} /> Add Field
                </Button>
        </DialogTrigger>
      )}
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add New Field</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {fieldTypes.map((field) => (
            <Button
              key={field.type}
              variant="outline"
              onClick={() => handleAddField(field.type)}
            >
              {field.label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}