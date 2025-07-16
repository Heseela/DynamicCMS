import { DataTable } from "../../../Global/Table/data-table";
import ErrorMessage from "../../../Global/error-message";
import { useCustomQuery } from "../../../Global/get-query";
import Loading from "../../../Global/loader";
import { QueryKey } from "../../../Types/query.types";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { FormColumns } from "./form-column";
import type { TFormList } from "../../../Models/form.model";

const FormList = () => {
  const { data: response, isLoading, error } = useCustomQuery<TFormList>({
    endPoint: QueryKey.FORMS,
    queryKey: [QueryKey.FORMS],
  });
  
  const forms = response?.data || [];

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Forms</h2>
        <Link to="/form/add">
          <Button>Create New Form</Button>
        </Link>
      </div>

      <DataTable
        columns={FormColumns}
        data={forms}
      />
    </div>
  );
};

export default FormList;