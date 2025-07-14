import { useParams } from "react-router-dom";
import { useCustomQuery } from "../../../Global/get-query";
import { QueryKey } from "../../../Types/query.types";
import Loading from "../../../Global/loader";
import ErrorMessage from "../../../Global/error-message";
import { BlogCategoryDefaultValues, type TAsyncBlogCategory } from "../../../Models/blog-categories.model";
import { useState } from "react";
import BlogCategoryPopupForm from "./category-form";

const EditBlogCategory = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(true);

  const { data: category, isLoading, error } = useCustomQuery<TAsyncBlogCategory>({
    endPoint: `${QueryKey.BLOG_CATEGORIES}/${id}`,
    queryKey: [QueryKey.BLOG_CATEGORIES, id],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  const categoryValues = category || BlogCategoryDefaultValues;

  return (
    <BlogCategoryPopupForm
      open={isOpen}
      onOpenChange={setIsOpen}
      categoryValues={categoryValues}
      id={id}
      formTitle="Edit Blog Category"
    />
  );
};

export default EditBlogCategory;