import { useParams } from 'react-router-dom';
import PageForm from '../components/page-components/PageSection/page-form';
import ErrorMessage from '../Global/error-message';
import Loading from '../Global/loader';
import { useGetPage } from '../components/page-components/PageSection/api/page';

const PageFormWrapper = () => {
  const { slug } = useParams();
  const { data: page, isLoading, error } = useGetPage(slug!);

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (!page) return <div>Page not found</div>;

  return <PageForm page={page} />;
};

export default PageFormWrapper;
