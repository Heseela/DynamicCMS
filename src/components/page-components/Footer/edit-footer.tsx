import ErrorMessage from "../../../Global/error-message";
import { useCustomQuery } from "../../../Global/get-query";
import Loading from "../../../Global/loader";
import { FooterDefaultValues, type TFooterForm } from "../../../Models/footer.model";
import { QueryKey } from "../../../Types/query.types";
import FooterForm from "./footer-form";

const EditFooter = () => {
  const { data: footerData, isLoading, error } = useCustomQuery<TFooterForm>({
    endPoint: QueryKey.FOOTER,
    queryKey: [QueryKey.FOOTER],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  const footerValues: TFooterForm = footerData || FooterDefaultValues;

  return <FooterForm footerValues={footerValues} />;
};

export default EditFooter;