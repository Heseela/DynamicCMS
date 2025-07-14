import ErrorMessage from "../../../Global/error-message";
import { useCustomQuery } from "../../../Global/get-query";
import Loading from "../../../Global/loader";
import { 
  type TGeneralSettingResponse, 
  type TPrivacyPolicyResponse,
  type TTermsAndConditionsResponse 
} from "../../../Models/setting.model";
import { QueryKey } from "../../../Types/query.types";
import GeneralSettingForm from "./setting-form";

const SettingView = () => {
  const { data, isError, error, isLoading } = useCustomQuery<TGeneralSettingResponse>({
    endPoint: QueryKey.GENERAL_SETTING,
    method: "get",
});
const { data: privacy, isError: privacyIsError, error: privacyError, isLoading: privacyLoading } = useCustomQuery<TPrivacyPolicyResponse>({
    endPoint: QueryKey.PRIVACYPOLICY,
    method: "get",
});
const { data: term, isError: termIsError, error: termError, isLoading: termLoading } = useCustomQuery<TTermsAndConditionsResponse>({

    endPoint: QueryKey.TERMANDCONDITION,
    method: "get",
});

  if (isLoading || privacyLoading || termLoading) return <Loading />;
  if (isError || privacyIsError || termIsError) return <ErrorMessage error={error || privacyError || termError} />;

  return (
    <>
      <h2 className='title'>General Setting</h2>
      <hr />
      <GeneralSettingForm
        initialData={data} 
        privacyPolicy={privacy?.data || ''} 
        termsAndConditions={term?.data || ''} 
      />
    </>
  )
}

export default SettingView;