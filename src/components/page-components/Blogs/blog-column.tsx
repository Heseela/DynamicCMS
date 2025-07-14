import { type ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import type { TAsyncBlog } from "../../../Models/blogs.model";
import { useDeleteMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import CustomAlertDialogConfirmation from "../../../Global/custom-alter";

export const BlogColumns: ColumnDef<TAsyncBlog>[] = [
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
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <p className="text-14">
          {date.toLocaleDateString()}, {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      );
    },
  },

  {
    header: "Updated At",
    accessorKey: "updatedAt",
    cell: ({ row }) => {
      const date = new Date(row.original.updatedAt);
      return (
        <p className="text-14">
          {date.toLocaleDateString()}, {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      );
    },
  },

  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const slug = row.original.slug;
      const { mutate } = useDeleteMutation({
        endPoint: QueryKey.BLOGS,
        queryKey: [QueryKey.BLOGS],
        id: slug,
      });

      const handleDelete = () => {
        mutate(undefined, {
          onSuccess: () => {
            toast.success("Blog deleted successfully");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete blog");
          },
        });
      };

      return (
        <div className="flex gap-4 items-center">
          <Link 
            to={`/blogs/${slug}/edit`}
            className="p-1 hover:bg-gray-100 rounded"
            title="Edit"
          >
            <Pencil className="text-blue-500" size={16} />
          </Link>
          <CustomAlertDialogConfirmation
            trigger={
              <button className="p-1 hover:bg-gray-100 rounded" title="Delete">
                <Trash2 className="text-red-600" size={16} />
              </button>
            }
            description="This action cannot be undone. This will permanently delete this blog."
            onConfirm={handleDelete}
          />
        </div>
      );
    },
  },
];