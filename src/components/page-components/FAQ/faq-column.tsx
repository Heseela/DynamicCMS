import { type ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import type { TAsyncFaq } from "../../../Models/faq.model";
import { useDeleteMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import CustomAlertDialogConfirmation from "../../../Global/custom-alter";

export const FaqColumns: ColumnDef<TAsyncFaq>[] = [
  {
    header: "S.N",
    cell: ({ row }) => <p className="text-14 font-medium">{row.index + 1}</p>,
  },
  {
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => (
      <p className="text-14 font-medium">{row.original.title}</p>
    ),
  },
  {
    header: "Category",
    accessorKey: "category",
    cell: ({ row }) => (
      <p className="text-14 capitalize">{row.original.category}</p>
    ),
  },
 
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      const { mutate } = useDeleteMutation({
        endPoint: QueryKey.FAQS,
        queryKey: [QueryKey.FAQS],
        id: id,
      });

      const handleDelete = () => {
        mutate(undefined, {
          onSuccess: () => {
            toast.success("FAQ deleted successfully");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete FAQ");
          },
        });
      };

      return (
        <div className="flex gap-6">
          <Link to={`/faqs/${id}/edit`}>
            <Pencil className="text-blue-500" size={16} />
          </Link>
          <CustomAlertDialogConfirmation
            trigger={<Trash2 className="text-red-600" size={16} />}
            description="This action cannot be undone. This will permanently delete this FAQ."
            onConfirm={handleDelete}
          />
        </div>
      );
    },
  },
];

