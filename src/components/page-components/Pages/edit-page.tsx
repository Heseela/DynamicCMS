
import { useParams } from "react-router-dom";
import { PageDefaultValues, type TAsyncPage } from "../../../Models/pages.model";
import { QueryKey } from "../../../Types/query.types";
import { useCustomQuery } from "../../../Global/get-query";
import ErrorMessage from "../../../Global/error-message";
import Loading from "../../../Global/loader";
import PageNameForm from "./page-name-form";

const EditPage = () => {
  const { id } = useParams();
  const { data: page, isLoading, error } = useCustomQuery<TAsyncPage>({
    endPoint: `${QueryKey.PAGES}/${id}`,
    queryKey: [QueryKey.PAGES, id],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <PageNameForm 
      pageValues={page || PageDefaultValues}
      formTitle="Edit"
      isEdit={true}
    />
  );
};

export default EditPage;