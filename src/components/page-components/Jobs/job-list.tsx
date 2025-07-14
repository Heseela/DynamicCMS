import { DataTable } from "../../../Global/Table/data-table";
import ErrorMessage from "../../../Global/error-message";
import { useCustomQuery } from "../../../Global/get-query";
import Loading from "../../../Global/loader";
import type { TAsyncJob } from "../../../Models/job.model";
import { QueryKey } from "../../../Types/query.types";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { JobColumns } from "./job-column";

const JobList = () => {
  const { data: response, isLoading, error } = useCustomQuery<{
    data: TAsyncJob[];
    meta: any;
  }>({
    endPoint: QueryKey.JOBS,
    queryKey: [QueryKey.JOBS],
  });
  
  const jobs = response?.data || [];

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Jobs</h2>
        <Link to="/jobs/add">
          <Button>Add New Job</Button>
        </Link>
      </div>

      <DataTable
        columns={JobColumns}
        data={jobs || []}
      />
    </div>
  );
};

export default JobList;