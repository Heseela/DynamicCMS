import { useParams } from 'react-router-dom';
import PageForm from '../components/page-components/PageSection/page-form';
import ErrorMessage from '../Global/error-message';
import Loading from '../Global/loader';
import { useCustomQuery } from '../Global/get-query';
import { QueryKey } from '../Types/query.types';
import type { TPage } from '../Types/page.types';

const PageFormWrapper = () => {
  const { slug } = useParams();
  const { data: page, isLoading, error } = useCustomQuery<TPage>({
    endPoint: `${QueryKey.PAGES}/${slug}`,
    queryKey: [QueryKey.PAGES, slug],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (!page) return <div>Page not found</div>;

  return <PageForm page={page} />;
};

export default PageFormWrapper;