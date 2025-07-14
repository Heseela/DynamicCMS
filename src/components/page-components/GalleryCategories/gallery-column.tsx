// import { type ColumnDef } from "@tanstack/react-table";
// import { Pencil, Trash2, Image as ImageIcon } from "lucide-react";
// import toast from "react-hot-toast";
// import { useDeleteMutation } from "../../../Global/custom-muation";
// import { QueryKey } from "../../../Types/query.types";
// import CustomAlertDialogConfirmation from "../../../Global/custom-alter";
// import { useState } from "react";
// import type { TAsyncGalleryCategory } from "../../../Models/gallery.model";
// import GalleryCategoryPopupForm from "./gallery-form";
// import { Link } from "react-router-dom";

// export const GalleryCategoryColumns: ColumnDef<TAsyncGalleryCategory>[] = [
//   {
//     header: "S.N",
//     cell: ({ row }) => <p className="text-14 font-medium">{row.index + 1}</p>,
//   },
//   {
//     header: "Name",
//     accessorKey: "name",
//     cell: ({ row }) => (
//       <Link
//         to={`/gallery/${row.original.id}`}
//         className="text-14 font-semibold hover:underline"
//       >
//         {row.original.name}
//       </Link>
//     ),
//   },
//   {
//     header: "Images Count",
//     accessorKey: "imagesCount",
//     cell: ({ row }) => (
//       <div className="flex items-center gap-2">
//         <ImageIcon className="text-gray-500" size={16} />
//         <p className="text-14">{row.original.imagesCount || 0}</p>
//       </div>
//     ),
//   },
//   {
//     header: "Actions",
//     id: "actions",
//     cell: ({ row }) => {
//       const id = row.original.id;
//       const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//       const { mutate } = useDeleteMutation({
//         endPoint: QueryKey.GALLERY_CATEGORIES,
//         queryKey: [QueryKey.GALLERY_CATEGORIES],
//         id: id,
//       });

//       const handleDelete = () => {
//         mutate(undefined, {
//           onSuccess: () => {
//             toast.success("Category deleted successfully");
//           },
//           onError: (error) => {
//             toast.error(error.message || "Failed to delete category");
//           },
//         });
//       };

//       return (
//         <div className="flex gap-6">
//           <button 
//             onClick={() => setIsEditModalOpen(true)}
//             aria-label="Edit category"
//           >
//             <Pencil className="text-blue-500" size={16} />
//           </button>
//           <CustomAlertDialogConfirmation
//             trigger={<Trash2 className="text-red-600" size={16} />}
//             description="This action cannot be undone. This will permanently delete this category and remove all associated images."
//             onConfirm={handleDelete}
//           />
          
//           <GalleryCategoryPopupForm
//             open={isEditModalOpen}
//             onOpenChange={setIsEditModalOpen}
//             id={id}
//             categoryValues={row.original}
//             formTitle="Edit Gallery Category"
//           />
//         </div>
//       );
//     },
//   }
// ];

import { type ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import CustomAlertDialogConfirmation from "../../../Global/custom-alter";
import { useState } from "react";
import type { TAsyncGalleryCategory } from "../../../Models/gallery.model";
import GalleryCategoryPopupForm from "./gallery-form";
import { Link } from "react-router-dom";

export const GalleryCategoryColumns: ColumnDef<TAsyncGalleryCategory>[] = [
  {
    header: "S.N",
    cell: ({ row }) => <p className="text-14 font-medium">{row.index + 1}</p>,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <Link
        to={`/gallery/${row.original.id}`}
        className="text-14 font-semibold hover:underline"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    header: "Images Count",
    accessorKey: "imagesCount",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <ImageIcon className="text-gray-500" size={16} />
        <p className="text-14">{row.original.imagesCount || 0}</p>
      </div>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      const [isEditModalOpen, setIsEditModalOpen] = useState(false);
      const { mutate } = useDeleteMutation({
        endPoint: QueryKey.GALLERY_CATEGORIES,
        queryKey: [QueryKey.GALLERY_CATEGORIES],
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
            description="This action cannot be undone. This will permanently delete this category and remove all associated images."
            onConfirm={handleDelete}
          />
          
          <GalleryCategoryPopupForm
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            id={id}
            categoryValues={row.original}
            formTitle="Edit Gallery Category"
          />
        </div>
      );
    },
  }
];