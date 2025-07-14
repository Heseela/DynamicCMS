import { DataTable } from "../../../Global/Table/data-table";
import ErrorMessage from "../../../Global/error-message";
import { useCustomQuery } from "../../../Global/get-query";
import Loading from "../../../Global/loader";
import type { TAsyncBlogCategories } from "../../../Models/blog-categories.model";
import { QueryKey } from "../../../Types/query.types";
import { Button } from "../../ui/button";
import { BlogCategoryColumns } from "./category-column";
import { useState } from "react";
import BlogCategoryPopupForm from "./category-form";

const BlogCategoryList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: categories, isLoading, error } = useCustomQuery<TAsyncBlogCategories>({
    endPoint: QueryKey.BLOG_CATEGORIES,
    queryKey: [QueryKey.BLOG_CATEGORIES],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Categories</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          Add New Category
        </Button>
      </div>

      <DataTable
        columns={BlogCategoryColumns}
        data={categories || []}
      />

      <BlogCategoryPopupForm
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};

export default BlogCategoryList;