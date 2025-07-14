import { type ColumnDef } from "@tanstack/react-table";
import { type TAsyncPage } from "../../../Models/pages.model";
import { Link } from "react-router-dom";

export const PagesColumns: ColumnDef<TAsyncPage>[] = [
  {
    header: "S.N",
    cell: ({ row }) => <p className="text-14 font-medium">{row.index + 1}</p>,
  },
  {
    header: "Page Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <Link
        to={`/pages/${row.original.slug || row.original.name.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-14 font-semibold hover:underline"
      >
        {row.original.name}
      </Link>
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
  // {
  //   header: "Actions",
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const id = row.original.id;
  //     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  //     const { mutate } = useDeleteMutation({
  //       endPoint: QueryKey.PAGES,
  //       queryKey: [QueryKey.PAGES],
  //       id: id,
  //     });

  //     const handleDelete = () => {
  //       mutate(undefined, {
  //         onSuccess: () => {
  //           toast.success("Page deleted successfully");
  //         },
  //         onError: (error) => {
  //           toast.error(error.message || "Failed to delete page");
  //         },
  //       });
  //     };

  //     return (
  //       <div className="flex gap-6">
  //         {/* <button 
  //           onClick={() => setIsEditModalOpen(true)}
  //           aria-label="Edit page"
  //         >
  //           <Pencil className="text-blue-500" size={16} />
  //         </button> */}
  //         <CustomAlertDialogConfirmation
  //           trigger={<Trash2 className="text-red-600" size={16} />}
  //           description="This action cannot be undone. This will permanently delete this page."
  //           onConfirm={handleDelete}
  //         />
          
  //         <PageForm
  //           open={isEditModalOpen}
  //           onOpenChange={setIsEditModalOpen}
  //           pageValues={row.original}
  //           formTitle="Edit"
  //           isEdit={true}
  //         />
  //       </div>
  //     );
  //   },
  // }
];