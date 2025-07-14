// import { useParams } from "react-router-dom";
// import { useCustomQuery } from "../../../Global/get-query";
// import { QueryKey } from "../../../Types/query.types";
// import Loading from "../../../Global/loader";
// import ErrorMessage from "../../../Global/error-message";
// import { BlogDefaultValues, type TAsyncBlog } from "../../../Models/blogs.model";
// import BlogForm from "./blog-form";

// const EditBlog = () => {
//   const { slug } = useParams();

//   const { data: blog, isLoading, error } = useCustomQuery<TAsyncBlog>({
//     endPoint: `${QueryKey.BLOGS}/${slug}`,
//     queryKey: [QueryKey.BLOGS, slug],
//   });

//   if (isLoading) return <Loading />;
//   if (error) return <ErrorMessage />;

//   const blogValues = blog || BlogDefaultValues;

//   return <BlogForm blogValues={blogValues} slug={slug} formTitle="Edit Blog" />;
// };

// export default EditBlog;


import { useParams } from "react-router-dom";
import { useCustomQuery } from "../../../Global/get-query";
import { BlogDefaultValues, type TAsyncBlog } from "../../../Models/blogs.model";
import { QueryKey } from "../../../Types/query.types";
import Loading from "../../../Global/loader";
import ErrorMessage from "../../../Global/error-message";
import BlogForm from "./blog-form";

const EditBlog = () => {
  const { slug } = useParams();

  const { data: blog, isLoading, error } = useCustomQuery<TAsyncBlog>({
    endPoint: `${QueryKey.BLOGS}/${slug}`,
    queryKey: [QueryKey.BLOGS, slug],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  const blogValues = blog || BlogDefaultValues;

  return <BlogForm blogValues={blogValues} slug={slug} formTitle="Edit Blog" />;
};

export default EditBlog;