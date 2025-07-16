
import { useParams } from "react-router-dom";
import { Button } from "../../ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QueryKey } from "../../../Types/query.types";
import { useCustomQuery } from "../../../Global/get-query";
import type { TForm, TFormSubmission } from "../../../Models/form.model";
import Loading from "../../../Global/loader";
import ErrorMessage from "../../../Global/error-message";

const FormSubmissionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: submission, isLoading, error } = useCustomQuery<TFormSubmission>({
    endPoint: `${QueryKey.FORM_SUBMISSION}/${id}`,
    queryKey: [QueryKey.FORM_SUBMISSION, id],
  });

  const { data: form } = useCustomQuery<TForm>({
    endPoint: `${QueryKey.FORMS}/${submission?.formSlug}`,
    queryKey: [QueryKey.FORMS, submission?.formSlug],
    enabled: !!submission?.formSlug,
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ChevronLeft size={16} className="mr-2" />
        Back
      </Button>

      <h2 className="text-2xl font-bold">
        Submission for {form?.title}
      </h2>
      <p className="text-sm text-gray-500">
        Submitted on {new Date(submission?.createdAt || '').toLocaleString()}
      </p>

      <div className="mt-6 space-y-4">
        {form?.fields.map((field) => (
          <div key={field.name} className="border-b pb-4">
            <h3 className="font-medium">{field.label || field.name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {submission?.data[field.name]?.toString() || "No response"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormSubmissionPage;