import { type ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import type { TAsyncJob } from "../../../Models/job.model";
import { useDeleteMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import CustomAlertDialogConfirmation from "../../../Global/custom-alter";

export const JobColumns: ColumnDef<TAsyncJob>[] = [
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
    header: "Department",
    accessorKey: "department",
    cell: ({ row }) => (
      <p className="text-14">{row.original.department}</p>
    ),
  },
  {
    header: "Type",
    accessorKey: "type",
    cell: ({ row }) => (
      <p className="text-14 capitalize">{row.original.type.replace("-", " ")}</p>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      const { mutate } = useDeleteMutation({
        endPoint: QueryKey.JOBS,
        queryKey: [QueryKey.JOBS],
        id: id,
      });

      const handleDelete = () => {
        mutate(undefined, {
          onSuccess: () => {
            toast.success("Job deleted successfully");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete job");
          },
        });
      };

      return (
        <div className="flex gap-6">
          <Link to={`/jobs/${id}/edit`}>
            <Pencil className="text-blue-500" size={16} />
          </Link>
          <CustomAlertDialogConfirmation
            trigger={<Trash2 className="text-red-600" size={16} />}
            description="This action cannot be undone. This will permanently delete this job posting."
            onConfirm={handleDelete}
          />
        </div>
      );
    },
  },
];