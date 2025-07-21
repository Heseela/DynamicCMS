import { DataTable } from "../../../Global/Table/data-table";
import { DataTablePagination } from "../../../Global/Table/data-table-pagination";
import ErrorMessage from "../../../Global/error-message";
import { useCustomQuery } from "../../../Global/get-query";
import Loading from "../../../Global/loader";
import type { TAsyncPages } from "../../../Models/pages.model";
import type { TMeta } from "../../../Types/global.types";
import { QueryKey } from "../../../Types/query.types";
import SearchInput from "../../search/search-input";
import { pagesColumns } from "./pages.columns";


const DEFAULT_META: TMeta = {
    page: 1,
    take: 10,
    itemCount: 0,
    pageCount: 1,
    hasPreviousPage: false,
    hasNextPage: false
  };


export default function PagesList() {
  const { data: pagesData, isLoading, error } = useCustomQuery<TAsyncPages>({
    endPoint: QueryKey.PAGES,
    queryKey: [QueryKey.PAGES],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <section className='space-y-6'>
      <section className='flex'>
        <SearchInput />
      </section>
      <DataTable 
        columns={pagesColumns} 
        data={pagesData?.data || []} 
      />
      <DataTablePagination 
        meta={pagesData?.meta || DEFAULT_META} 
      />
    </section>
  );
}