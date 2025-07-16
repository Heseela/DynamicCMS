
import { Button } from "../../ui/button";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Loading from "../../../Global/loader";
import ErrorMessage from "../../../Global/error-message";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFormSubmission, TFormSubmissionList } from "../../../Models/form.model";
import { useDeleteMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import { Link } from "react-router-dom";
import CustomAlertDialogConfirmation from "../../../Global/custom-alter";
import { useCustomQuery } from "../../../Global/get-query";
import { DataTable } from "../../../Global/Table/data-table";

const FormSubmissionColumns: ColumnDef<TFormSubmission>[] = [
  {
    header: "S.N",
    cell: ({ row }) => <p className="text-sm">{row.index + 1}</p>,
  },
  {
    header: "Form",
    accessorKey: "formSlug",
    cell: ({ row }) => (
      <p className="text-sm">{row.original.formSlug}</p>
    ),
  },
  {
    header: "Submitted At",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <p className="text-sm">
        {new Date(row.original.createdAt || '').toLocaleString()}
      </p>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const { mutate } = useDeleteMutation({
        endPoint: QueryKey.FORM_SUBMISSION,
        queryKey: [QueryKey.FORM_SUBMISSION],
        id: row.original.id || '',
      });

      const handleDelete = () => {
        mutate(undefined, {
          onSuccess: () => {
            toast.success("Submission deleted successfully");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to delete submission");
          },
        });
      };

      return (
        <div className="flex gap-4">
          <Link to={`/form/${row.original.id}`}>
            <Button variant="outline" size="sm">
              View
            </Button>
          </Link>
          <CustomAlertDialogConfirmation
            trigger={<Trash2 className="text-red-600" size={16} />}
            description="This will permanently delete this submission."
            onConfirm={handleDelete}
          />
        </div>
      );
    },
  },
];

const FormSubmissionList = () => {
  const { data: response, isLoading, error } = useCustomQuery<TFormSubmissionList>({
    endPoint: QueryKey.FORM_SUBMISSION,
    queryKey: [QueryKey.FORM_SUBMISSION],
  });
  
  const submissions = response?.data || [];

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Form Submissions</h2>
      </div>

      <DataTable
        columns={FormSubmissionColumns}
        data={submissions}
      />
    </div>
  );
};

export default FormSubmissionList;