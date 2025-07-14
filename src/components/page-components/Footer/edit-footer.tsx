import ErrorMessage from "../../../Global/error-message";
import { useCustomQuery } from "../../../Global/get-query";
import Loading from "../../../Global/loader";
import { FooterDefaultValues, type TFooterForm } from "../../../Models/footer.model";
import { QueryKey } from "../../../Types/query.types";
import FooterForm from "./footer-form";

type TFooterAPI = {
  navLinks: Array<{
    name: string;
    url: string;
    type: "internal" | "external";
  }>;
  footerDescription: string;
};

const EditFooter = () => {
  const { data: footerData, isLoading, error } = useCustomQuery<TFooterAPI>({
    endPoint: QueryKey.FOOTER,
    queryKey: [QueryKey.FOOTER],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  const footerValues: TFooterForm = footerData ? {
    footerDescription: footerData.footerDescription,
    navLinks: footerData.navLinks.map(link => ({
      name: link.name,
      url: link.url,
      type: link.type
    }))
  } : FooterDefaultValues;

  return <FooterForm footerValues={footerValues} />;
};

export default EditFooter;