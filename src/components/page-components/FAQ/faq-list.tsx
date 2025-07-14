
import { DataTable } from "../../../Global/Table/data-table";
import ErrorMessage from "../../../Global/error-message";
import { useCustomQuery } from "../../../Global/get-query";
import Loading from "../../../Global/loader";
import type { TAsyncFaq } from "../../../Models/faq.model";
import { QueryKey } from "../../../Types/query.types";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { FaqColumns } from "./faq-column";

const FaqList = () => {
  const { data: response, isLoading, error } = useCustomQuery<{
    data: TAsyncFaq[];
    meta: any;
  }>({
    endPoint: QueryKey.FAQS,
    queryKey: [QueryKey.FAQS],
  });
  
  const faqs = response?.data || [];

  console.log("Fetched FAQs:", faqs);

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All FAQs</h2>
        <Link to="/faqs/add">
          <Button>Add New FAQ</Button>
        </Link>
      </div>

      <DataTable
        columns={FaqColumns}
        data={faqs || []}
      />
    </div>
  );
};

export default FaqList;

