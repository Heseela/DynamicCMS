import Loading from "../Global/loader";
import ErrorMessage from "../Global/error-message";
import CompanyForm from "../components/page-components/CompanyInformation/info-form";


const CompanyInforamtionPage = () => {
    const isLoading = false;
    const isError = false;
    const error = null;

    if (isLoading) return <Loading />;
    if (isError) return <ErrorMessage error={error} />;

    return (
        <>
            <h2 className="title">Company Information</h2>
            <hr className="my-6" />
            <CompanyForm/>
        </>
    );
};

export default CompanyInforamtionPage;
