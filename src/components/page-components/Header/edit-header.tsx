
import ErrorMessage from "../../../Global/error-message";
import { useCustomQuery } from "../../../Global/get-query";
import Loading from "../../../Global/loader";
import { HeaderDefaultValues, type THeaderForm } from "../../../Models/header.model";
import { QueryKey } from "../../../Types/query.types";
import HeaderForm from "./header-form";

type THeaderAPI = {
  navLinks: Array<{
    name: string;
    url: string;
    type: "internal" | "external";
  }>;
};

const EditHeader = () => {
  const { data: headerData, isLoading, error } = useCustomQuery<THeaderAPI>({
    endPoint: QueryKey.HEADER,
    queryKey: [QueryKey.HEADER],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  const headerValues: THeaderForm = headerData ? {
    navLinks: headerData.navLinks.map(link => ({
      name: link.name,
      url: link.url,
      type: link.type
    }))
  } : HeaderDefaultValues;

  return <HeaderForm headerValues={headerValues} />;
};

export default EditHeader;