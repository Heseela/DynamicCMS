import { useCustomQuery } from "../Global/get-query";
import type { TAsyncBlogCategories, TBlogCategoryOption } from "../Models/blog-categories.model";
import { QueryKey } from "../Types/query.types";

export const useBlogCategories = () => {
  return useCustomQuery<TAsyncBlogCategories>({
    endPoint: QueryKey.BLOG_CATEGORIES,
    queryKey: [QueryKey.BLOG_CATEGORIES],
  });
};

export const useBlogCategoryOptions = () => {
  return useCustomQuery<TBlogCategoryOption[]>({
    endPoint: `${QueryKey.BLOG_CATEGORIES}/options`,
    queryKey: [`${QueryKey.BLOG_CATEGORIES}-options`],
  });
};