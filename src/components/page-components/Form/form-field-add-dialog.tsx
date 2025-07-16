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
};

const fieldTypes = [
  { type: FormFieldType.Text, label: "Text Input" },
  { type: FormFieldType.Email, label: "Email Input" },
  { type: FormFieldType.Number, label: "Number Input" },
  { type: FormFieldType.Textarea, label: "Text Area" },
  { type: FormFieldType.Checkbox, label: "Checkbox" },
  { type: FormFieldType.Select, label: "Select Dropdown" },
  { type: FormFieldType.Radio, label: "Radio Buttons" },
  { type: FormFieldType.File, label: "File Upload" },
  { type: FormFieldType.Relation, label: "Relation Field" },
] as const;

export default function FormAddFieldDialog({ onAddField }: FormAddFieldDialogProps) {
    return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus size={16} className="mr-2" />
          Add Field
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Field</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {fieldTypes.map((field) => (
            <Button
              key={field.type}
              variant="outline"
              onClick={() => onAddField(field.type)}
            >
              {field.label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}