import type { ColumnDef } from "@tanstack/react-table";
import type { TPagesResponse } from "../../../Types/page.types";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDeleteMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import CustomAlertDialogConfirmation from "../../../Global/custom-alter";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";

export const pagesColumns: ColumnDef<TPagesResponse["data"][0]>[] = [
    {
        header: "S.N",
        cell: ({ row }) => <p className="text-14 font-medium"> {row.index + 1} </p>,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return (
                <Link to={`pages/${row.original.slug}`} className="flex gap-1 items-center">
                    <span className="hover:underline">{row.original.name}</span>
                </Link>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const createdAt = row.original.createdAt;
            return createdAt ? new Date(createdAt).toLocaleString() : <span>-</span>;
        }
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {

            const slug = row.original.slug;
            const { mutate } = useDeleteMutation({
              endPoint: QueryKey.PAGES,
              queryKey: [QueryKey.PAGES],
              id: slug,
            });


            const handleDelete = () => {
                mutate(undefined, {
                  onSuccess: () => {
                    toast.success("Page deleted successfully");
                  },
                  onError: (error) => {
                    toast.error(error.message || "Failed to delete page");
                  },
                });
              };

            return (
                <div className="flex gap-4">
                    <Link to={`${row.original.id}/edit`}>
                        <Button variant="ghost" size="sm" title="Edit">
                            <Pencil className="text-blue-500" size={16} />
                        </Button>
                    </Link>
                    <CustomAlertDialogConfirmation
                        trigger={
                            <Button variant="ghost" size="sm" title="Delete">
                                <Trash2 className="text-red-600" size={16} />
                            </Button>
                        }
                        description="This action cannot be undone. This will permanently delete this hero section."
                        onConfirm={handleDelete}
                    />
                </div>
            );
        },
    },
];
