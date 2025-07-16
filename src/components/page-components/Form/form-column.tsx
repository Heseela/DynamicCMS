import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import type { TForm } from "../../../Models/form.model";
import { useDeleteMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import CustomAlertDialogConfirmation from "../../../Global/custom-alter";
import type { ColumnDef } from "@tanstack/react-table";

export const FormColumns: ColumnDef<TForm>[] = [
  {
    header: "S.N",
    cell: ({ row }) => <p className="text-sm">{row.index + 1}</p>,
  },
  {
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => (
      <Link 
        to={`/form/${row.original.slug}`}
        className="text-blue-600 hover:underline"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    header: "Fields",
    cell: ({ row }) => (
      <p className="text-sm">{row.original.fields.length} fields</p>
    ),
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <p className="text-sm">
        {new Date(row.original.createdAt || '').toLocaleDateString()}
      </p>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const { mutate } = useDeleteMutation({
        endPoint: QueryKey.FORMS,
        queryKey: [QueryKey.FORMS],
        id: row.original.slug,
      });

      const handleDelete = () => {
        mutate(undefined, {
          onSuccess: () => {
            toast.success("Form deleted successfully");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete form");
          },
        });
      };

      return (
        <div className="flex gap-4">
          <Link to={`/form/${row.original.slug}/edit`}>
            <Pencil className="text-blue-500" size={16} />
          </Link>
          <Link to={`/form/${row.original.slug}/submissions`}>
            <span className="text-sm text-gray-600">Submissions</span>
          </Link>
          <CustomAlertDialogConfirmation
            trigger={<Trash2 className="text-red-600" size={16} />}
            description="This will permanently delete this form and all its submissions."
            onConfirm={handleDelete}
          />
        </div>
      );
    },
  },
];