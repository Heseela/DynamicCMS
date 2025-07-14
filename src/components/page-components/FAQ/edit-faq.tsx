import { useParams } from "react-router-dom";
import { useCustomQuery } from "../../../Global/get-query";
import { FaqDefaultValues, type TAsyncFaq } from "../../../Models/faq.model";
import { QueryKey } from "../../../Types/query.types";
import Loading from "../../../Global/loader";
import ErrorMessage from "../../../Global/error-message";
import FaqForm from "./faq-form";

const EditFaq = () => {
  const { id } = useParams();

  const { data: faq, isLoading, error } = useCustomQuery<TAsyncFaq>({
    endPoint: `${QueryKey.FAQS}/${id}`,
    queryKey: [QueryKey.FAQS, id],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  const faqValues = faq || FaqDefaultValues;

  return <FaqForm faqValues={faqValues} id={id} formTitle="Edit" />;
};

export default EditFaq;
