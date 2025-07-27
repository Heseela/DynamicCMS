import { type ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import type { GalleryImage } from "../../../../Models/gallery.model";
import { useDeleteMutation } from "../../../../Global/custom-muation";
import { QueryKey } from "../../../../Types/query.types";
import CustomAlertDialogConfirmation from "../../../../Global/custom-alter";

export const GalleryImageColumns = ({
  refetchImages
}: {
  categoryId?: string;
  refetchImages: () => void;
}): ColumnDef<GalleryImage>[] => [
  {
    header: "Image",
    cell: ({ row }) => (
      <div className="w-24 h-24">
        <img
          src={row.original.url}
          alt={`Gallery image ${row.original.id}`}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    ),
  },
  {
    header: "Uploaded At",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <p className="text-sm text-gray-500">
        {new Date(row.original.createdAt || '').toLocaleDateString()}
      </p>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const { mutate } = useDeleteMutation({
        endPoint: QueryKey.GALLERY_IMAGES,
        queryKey: [QueryKey.GALLERY_IMAGES],
        id: row.original.id,
      });

      const handleDelete = () => {
        mutate(undefined, {
          onSuccess: () => {
            toast.success("Image deleted successfully");
            refetchImages();
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete image");
          },
        });
      };

      return (
        <CustomAlertDialogConfirmation
          trigger={<Trash2 className="text-red-600 cursor-pointer" size={18} />}
          description="This action cannot be undone. This will permanently delete this image."
          onConfirm={handleDelete}
        />
      );
    },
  },
];