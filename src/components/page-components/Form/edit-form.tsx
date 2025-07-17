import { useParams } from "react-router-dom";
import { useCustomQuery } from "../../../Global/get-query";
import { QueryKey } from "../../../Types/query.types";
import Loading from "../../../Global/loader";
import ErrorMessage from "../../../Global/error-message";
import FormForm from "./form-form";
import type { TForm } from "../../../Models/form.model";

const EditForm = () => {
  const { slug } = useParams();

  const { data: form, isLoading, error } = useCustomQuery<TForm>({
    endPoint: `${QueryKey.FORMS}/${slug}`,
    queryKey: [QueryKey.FORMS, slug],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  return <FormForm formValues={form} slug={slug} formTitle="Edit Form" />;
};

export default EditForm;