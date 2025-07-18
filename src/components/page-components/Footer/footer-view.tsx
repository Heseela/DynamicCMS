import ErrorMessage from "../../../Global/error-message";
import { useCustomQuery } from "../../../Global/get-query";
import Loading from "../../../Global/loader";
import { type TFooterForm, type TSubLink, type TNavLink } from "../../../Models/footer.model";
import { QueryKey } from "../../../Types/query.types";
import FooterForm from "./footer-form";

type TFooterAPI = {
  id: string;
  footerDescription: string;
  navLinks: TNavLink[]; 
};

const FooterView = () => {
  const { data, isError, error, isLoading } = useCustomQuery<TFooterAPI>({
    endPoint: QueryKey.FOOTER,
    method: "get",
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage error={error} />;

  const ensureSubLinks = (links?: TSubLink[]): TSubLink[] => {
    if (!links) return [];
    return links.map(link => ({
      ...link,
      subLinks: ensureSubLinks(link.subLinks)
    }));
  };

  const footerValues: TFooterForm = {
    footerDescription: data?.footerDescription || "",
    navLinks: data?.navLinks?.map(link => ({
      name: link.name,
      url: link.url,
      type: link.type,
      subLinks: ensureSubLinks(link.subLinks)
    })) || [{ 
      name: "", 
      url: "", 
      type: "internal",
      subLinks: [] 
    }]
  };

  return <FooterForm footerValues={footerValues} footerId={data?.id} />;
};

export default FooterView;