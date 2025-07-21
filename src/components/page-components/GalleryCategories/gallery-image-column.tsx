import { type ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import CustomAlertDialogConfirmation from "../../../Global/custom-alter";
import type { GalleryImage } from "../../../Models/gallery.model";
import { Image } from "antd";

export const GalleryImageColumns: ColumnDef<GalleryImage>[] = [
  {
    header: "S.N",
    cell: ({ row }) => <p className="text-14 font-medium">{row.index + 1}</p>,
  },
  {
    header: "Image",
    accessorKey: "url",
    cell: ({ row }) => (
      <div className="w-20 h-20">
        <Image
          src={row.original.url}
          alt="Gallery image"
          className="object-cover rounded-md"
          width={80}
          height={80}
        />
      </div>
    ),
  },
  {
    header: "Uploaded",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <p className="text-14">
        {new Date(row.original.createdAt || "").toLocaleDateString()}
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
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete image");
          },
        });
      };

      return (
        <CustomAlertDialogConfirmation
          trigger={<Trash2 className="text-red-600 cursor-pointer" size={16} />}
          description="This action cannot be undone. This will permanently delete this image."
          onConfirm={handleDelete}
        />
      );
    },
  }
];