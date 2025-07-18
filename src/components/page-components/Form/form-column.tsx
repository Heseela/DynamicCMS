import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDeleteMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import CustomAlertDialogConfirmation from "../../../Global/custom-alter";
import type { ColumnDef } from "@tanstack/react-table";
import type { TForm } from "../../../Models/forms";

export const FormColumns: ColumnDef<TForm>[] = [
  {
    header: "S.N",
    cell: ({ row }) => <p className="text-14 font-medium">{row.index + 1}</p>,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <p className="text-14 font-medium">{row.original.slug}</p>
    ),
  },
  {
    header: "Fields",
    cell: ({ row }) => {
      const fields = row.original.fields || [];
      const fieldSummary = fields.map(field => `${field.name} (${field.type})`).join(", ");
      return (
         <div className="flex gap-1">
           <div className="text-14 font-semibold">
            {fields.length} Field: 
          </div>{fieldSummary}
         </div>
      );
    },
  },

  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const slug = row.original.slug;
      if (!slug) return null;
      
      return <FormActions slug={slug} />;
    },
  },
];

const FormActions = ({ slug }: { slug: string }) => {
  const { mutate } = useDeleteMutation({
    endPoint: QueryKey.FORMS,
    queryKey: [QueryKey.FORMS],
    id: slug,
  });

  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: () => toast.success("Form deleted"),
      onError: (error) => toast.error(error.message || "Delete failed"),
    });
  };

  return (
    <div className="flex gap-4">
      <Link to={`/form/${slug}/edit`}>
        <Pencil className="text-blue-500" size={16} />
      </Link>
      <CustomAlertDialogConfirmation
        trigger={<Trash2 className="text-red-600" size={16} />}
        description="Delete this form permanently?"
        onConfirm={handleDelete}
      />
    </div>
  );
};