import { type ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { TAsyncHeroSection } from "../../../Models/hero-section.model";
import CustomAlertDialogConfirmation from "../../../Global/custom-alter";
import { QueryKey } from "../../../Types/query.types";
import { useDeleteMutation } from "../../../Global/custom-muation";
import toast from "react-hot-toast";
import { Button } from "../../ui/button";
import { useQueryClient } from "@tanstack/react-query";

export const HeroColumns: ColumnDef<TAsyncHeroSection>[] = [
    {
        header: "S.N",
        cell: ({ row }) => <p className="text-14 font-medium">{row.index + 1}</p>,
    },
    {
        header: "Headline",
        accessorKey: "headline",
        cell: ({ row }) => (
            <p className="text-14 font-medium">{row.original.headline}</p>
        ),
    },
    {
        header: "Layout",
        cell: ({ row }) => (
            <p className="text-14">
                {row.original.layout.type} ({row.original.layout.alignment})
            </p>
        ),
    },
    {
        header: "Created At",
        accessorKey: "createdAt",
        cell: ({ row }) => (
            <p className="text-14">
                {new Date(row.original.createdAt).toLocaleDateString()}
            </p>
        ),
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {


            const id = row.original.id
            const queryClient = useQueryClient();

            const { mutate } = useDeleteMutation({
                endPoint: QueryKey.HERO_SECTIONS,
                queryKey: [QueryKey.HERO_SECTIONS],
                id: id,
            });


            const handleDelete = () => {
                mutate(undefined, {
                    onSuccess: () => {
                        toast.success("Hero-section deleted successfully");
                        queryClient.invalidateQueries({ queryKey: [QueryKey.HERO_SECTIONS] });
                    },
                    onError: () => {
                        toast.error("Failed to delete the Hero-section");
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