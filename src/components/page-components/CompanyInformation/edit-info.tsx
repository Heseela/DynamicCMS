import ErrorMessage from "../../../Global/error-message";
import { useCustomQuery } from "../../../Global/get-query";
import Loading from "../../../Global/loader";
import { CompanyInfoDefaultValues, type TCompanyInfoForm } from "../../../Models/info.model";
import { QueryKey } from "../../../Types/query.types";
import CompanyForm from "./info-form";

type TCompanyInfoAPI = {
  city: string;
  address: string;
  phone: string[];
  mapLink?: string;
  email: string[];
  workingHours: string;
  socialProfiles: string[];
};

const EditCompanyInfo = () => {
  const { data: companyInfo, isLoading, error } = useCustomQuery<TCompanyInfoAPI>({
    endPoint: QueryKey.COMPANY_INFO,
    queryKey: [QueryKey.COMPANY_INFO],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  const companyValues: TCompanyInfoForm = companyInfo ? {
    city: companyInfo.city,
    address: companyInfo.address,
    phones: companyInfo.phone.map(number => ({ number })),
    mapLink: companyInfo.mapLink || "",
    emails: companyInfo.email.map(address => ({ address })),
    workingHours: companyInfo.workingHours,
    socialProfiles: companyInfo.socialProfiles.map(url => ({ url }))
  } : CompanyInfoDefaultValues;

  return <CompanyForm companyValues={companyValues} />;
};

export default EditCompanyInfo;