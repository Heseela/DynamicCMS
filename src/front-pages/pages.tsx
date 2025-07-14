import Loading from "../Global/loader";
import ErrorMessage from "../Global/error-message";import PagesList from "../components/page-components/Pages/page-list";

const Pages = () => {

    const isLoading = false;
    const isError = false;
    const error = null;

    if (isLoading) return <Loading />;
    if (isError) return <ErrorMessage error={error} />;

    return (
        <>
            <h2 className="title">Pages</h2>
            <hr className="my-6" />

            <PagesList/>
        </>
    );
};

export default Pages;
