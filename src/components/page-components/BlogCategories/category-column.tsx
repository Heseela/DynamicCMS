import { type ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import CustomAlertDialogConfirmation from "../../../Global/custom-alter";
import type { TAsyncBlogCategory } from "../../../Models/blog-categories.model";
import BlogCategoryPopupForm from "./category-form";
import { useState } from "react";

export const BlogCategoryColumns: ColumnDef<TAsyncBlogCategory>[] = [
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
    header: "Blog Count",
    accessorKey: "blogscount",
    cell: ({ row }) => (
      <p className="text-14">{row.original.blogscount || 0}</p>
    ),
  },
{
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      const [isEditModalOpen, setIsEditModalOpen] = useState(false);
      const { mutate } = useDeleteMutation({
        endPoint: QueryKey.BLOG_CATEGORIES,
        queryKey: [QueryKey.BLOG_CATEGORIES],
        id: id,
      });
  
      const handleDelete = () => {
        mutate(undefined, {
          onSuccess: () => {
            toast.success("Category deleted successfully");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete category");
          },
        });
      };
  
      return (
        <div className="flex gap-6">
          <button 
            onClick={() => setIsEditModalOpen(true)}
            aria-label="Edit category"
          >
            <Pencil className="text-blue-500" size={16} />
          </button>
          <CustomAlertDialogConfirmation
            trigger={<Trash2 className="text-red-600" size={16} />}
            description="This action cannot be undone. This will permanently delete this category and all associated blogs will be uncategorized."
            onConfirm={handleDelete}
          />
          
          <BlogCategoryPopupForm
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            id={id}
            categoryValues={row.original}
            formTitle="Edit Blog Category"
          />
        </div>
      );
    },
  }
];