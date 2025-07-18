import ErrorMessage from "../../../Global/error-message";
import { useCustomQuery } from "../../../Global/get-query";
import Loading from "../../../Global/loader";
import type { THeaderAPI, THeaderForm, TSubLink } from "../../../Models/header.model";
import { QueryKey } from "../../../Types/query.types";
import HeaderForm from "./header-form";

const HeaderView = () => {
    const { data, isError, error, isLoading } = useCustomQuery<THeaderAPI>({
      endPoint: QueryKey.HEADER,
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
  
    const headerValues: THeaderForm = {
      id: data?.id,
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
  
    return <HeaderForm headerValues={headerValues} headerId={data?.id} />;
  };

export default HeaderView;