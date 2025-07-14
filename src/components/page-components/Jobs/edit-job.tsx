import { useParams } from "react-router-dom";
import { useCustomQuery } from "../../../Global/get-query";
import { type TAsyncJob } from "../../../Models/job.model";
import { QueryKey } from "../../../Types/query.types";
import Loading from "../../../Global/loader";
import ErrorMessage from "../../../Global/error-message";
import JobForm from "./job-form";

const EditJob = () => {
  const { id } = useParams();

  const { data: job, isLoading, error } = useCustomQuery<TAsyncJob>({
    endPoint: `${QueryKey.JOBS}/${id}`,
    queryKey: [QueryKey.JOBS, id],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage/>;


  return <JobForm jobValues={job} id={id} formTitle="Edit Job" />;
};

export default EditJob;