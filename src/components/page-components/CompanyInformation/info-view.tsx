import ErrorMessage from "../../../Global/error-message";
import { useCustomQuery } from "../../../Global/get-query";
import Loading from "../../../Global/loader";
import type { TCompanyInfoAPI} from "../../../Models/info.model";
import { QueryKey } from "../../../Types/query.types";
import CompanyForm from "./info-form";

const InfoView = () => {
    const { data, isError, error, isLoading } = useCustomQuery<TCompanyInfoAPI>({
      endPoint: QueryKey.COMPANY_INFO,
      method: "get",
    });
  
    if (isLoading) return <Loading />;
    if (isError) return <ErrorMessage error={error} />;
  
    const formValues = {
      city: data?.city || "",
      address: data?.address || "",
      phones: data?.phone?.map(number => ({ number })) || [{ number: "" }],
      emails: data?.email?.map(address => ({ address })) || [{ address: "" }],
      workingHours: data?.workingHours || "",
      mapLink: data?.mapLink || "",
      socialProfiles: data?.socialProfiles?.map(url => ({ url })) || [{ url: "" }]
    };
  
    return (
      <>
        <CompanyForm companyValues={formValues} />
      </>
    );
  };
export default InfoView;