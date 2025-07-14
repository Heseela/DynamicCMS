import { useState } from "react";
import { DataTable } from "../../../Global/Table/data-table";
import { PagesColumns } from "./page-column";
import { Button } from "../../ui/button";
import type { TAsyncPage } from "../../../Models/pages.model";
import { QueryKey } from "../../../Types/query.types";
import { useCustomQuery } from "../../../Global/get-query";
import PageForm from "./page-form";
import Loading from "../../../Global/loader";
import ErrorMessage from "../../../Global/error-message";

const PagesList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: pages, isLoading, error } = useCustomQuery<TAsyncPage[]>({
    endPoint: QueryKey.PAGES,
    queryKey: [QueryKey.PAGES],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage/>;

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Pages</h2>
        <Button onClick={() => setIsModalOpen(true)}>Add New Page</Button>
      </div>
      
      <DataTable
        columns={PagesColumns}
        data={pages || []}
      />

      <PageForm
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </div>
  );
};

export default PagesList;