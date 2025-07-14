// import { useParams } from "react-router-dom";
// import { PageDefaultValues, type TAsyncPage } from "../../../Models/pages.model";
// import PageForm from "./page-form";
// import { QueryKey } from "../../../Types/query.types";
// import { useCustomQuery } from "../../../Global/get-query";
// import ErrorMessage from "../../../Global/error-message";
// import Loading from "../../../Global/loader";

// const EditPage = () => {
//     const { id } = useParams();
//     const { data: page, isLoading, error } = useCustomQuery<TAsyncPage>({
//       endPoint: `${QueryKey.PAGES}/${id}`,
//       queryKey: [QueryKey.PAGES, id],
//     });
  
//     if (isLoading) return <Loading />;
//     if (error) return <ErrorMessage />;
  
//     return (
//       <PageForm 
//         pageValues={page || PageDefaultValues}
//         formTitle="Edit"
//         isEdit={true}
//       />
//     );
//   };

// export default EditPage;

import { useParams } from "react-router-dom";
import { PageDefaultValues, type TAsyncPage } from "../../../Models/pages.model";
import PageForm from "./page-form";
import { QueryKey } from "../../../Types/query.types";
import { useCustomQuery } from "../../../Global/get-query";
import ErrorMessage from "../../../Global/error-message";
import Loading from "../../../Global/loader";

const EditPage = () => {
  const { id } = useParams();
  const { data: page, isLoading, error } = useCustomQuery<TAsyncPage>({
    endPoint: `${QueryKey.PAGES}/${id}`,
    queryKey: [QueryKey.PAGES, id],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <PageForm 
      pageValues={page || PageDefaultValues}
      formTitle="Edit"
      isEdit={true}
    />
  );
};

export default EditPage;