import { Link } from "react-router-dom";
import { BlogColumns } from "./blog-column";
import { useCustomQuery } from "../../../Global/get-query";
import type { TAsyncBlogs } from "../../../Models/blogs.model";
import { QueryKey } from "../../../Types/query.types";
import Loading from "../../../Global/loader";
import ErrorMessage from "../../../Global/error-message";
import { DataTable } from "../../../Global/Table/data-table";
import { Button } from "../../ui/button";

const BlogList = () => {
  const { data: response, isLoading, error } = useCustomQuery<TAsyncBlogs>({
    endPoint: QueryKey.BLOGS,
    queryKey: [QueryKey.BLOGS],
  });
  
  const blogs = response?.data || [];

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Blogs</h2>
        <Link to="/blogs/add">
          <Button>Create New Blog</Button>
        </Link>
      </div>

      <DataTable
        columns={BlogColumns}
        data={blogs}
      />
    </div>
  );
};

export default BlogList;