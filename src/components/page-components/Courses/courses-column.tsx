import { type ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import type { TAsyncCourse } from "../../../Models/courses.model";
import { useDeleteMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import CustomAlertDialogConfirmation from "../../../Global/custom-alter";

export const CourseColumns: ColumnDef<TAsyncCourse>[] = [
  {
    header: "S.N",
    cell: ({ row }) => <p className="text-14 font-medium">{row.index + 1}</p>,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <p className="text-14 font-medium">{row.original.name}</p>
    ),
  },
  {
    header: "Degree",
    accessorKey: "degree",
    cell: ({ row }) => (
      <p className="text-14 capitalize">
        {row.original.degree.split('_').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')}
      </p>
    ),
  },
  {
    header: "Faculty",
    accessorKey: "faculty",
    cell: ({ row }) => (
      <p className="text-14 capitalize">{row.original.faculty}</p>
    ),
  },
  {
    header: "Duration",
    accessorKey: "duration",
    cell: ({ row }) => (
      <p className="text-14">{row.original.duration} months</p>
    ),
  },
 
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const { mutate } = useDeleteMutation({
        endPoint: QueryKey.COURSES,
        queryKey: [QueryKey.COURSES],
        id: row.original.slug,
      });

      const handleDelete = () => {
        mutate(undefined, {
          onSuccess: () => {
            toast.success("Course deleted successfully");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete course");
          },
        });
      };

      return (
        <div className="flex gap-6">
          <Link to={`/courses/${row.original.slug}/edit`}>
            <Pencil className="text-blue-500" size={16} />
          </Link>
          <CustomAlertDialogConfirmation
            trigger={<Trash2 className="text-red-600" size={16} />}
            description="This action cannot be undone. This will permanently delete this course."
            onConfirm={handleDelete}
          />
        </div>
      );
    },
  },
];