
// import { useMemo } from "react";
// import { useCustomQuery } from "../../../../../Global/get-query";
// import type { TPaginatedOptions } from "../../../../../Types/global.types";
// import { QueryKey } from "../../../../../Types/query.types";

// export function useInternalLinks(queryString: string = "") {
//     const { 
//         data: pages, 
//         isLoading: isPagesLoading 
//     } = useCustomQuery<TPaginatedOptions>({
//         endPoint: `${QueryKey.PAGES}?${queryString}`,
//     });

//     const { 
//         data: blogs, 
//         isLoading: isBlogsLoading 
//     } = useCustomQuery<TPaginatedOptions>({
//         endPoint: `${QueryKey.BLOGS}?${queryString}`,
//     });

//     const isLoading = isPagesLoading || isBlogsLoading;

//     const transformedData = useMemo(() => {
//         return [
//             {
//                 label: 'pages',
//                 options: pages?.data?.map((page: any) => ({
//                     value: page.slug,
//                     label: page.name 
//                 })) || [], 
//             },
//             {
//                 label: 'blogs',
//                 options: blogs?.data?.map((blog: any) => ({
//                     value: blog.slug, 
//                     label: blog.title
//                 })) || [], 
//             },
//         ];
//     }, [pages, blogs]);

//     return {
//         data: transformedData,
//         isLoading
//     };
// }



import { useMemo } from "react";
import { useCustomQuery } from "../../../../../Global/get-query";
import type { TAsyncBlogs } from "../../../../../Models/blogs.model";
import type { TAsyncPages } from "../../../../../Models/pages.model";
import { QueryKey } from "../../../../../Types/query.types";

export function useInternalLinks(queryString: string = "") {
  const { 
    data: pagesResponse, 
    isLoading: isPagesLoading 
  } = useCustomQuery<TAsyncPages>({
    endPoint: `${QueryKey.PAGES}?${queryString}`,
  });

  const { 
    data: blogsResponse, 
    isLoading: isBlogsLoading 
  } = useCustomQuery<TAsyncBlogs>({
    endPoint: `${QueryKey.BLOGS}?${queryString}`,
  });

  const isLoading = isPagesLoading || isBlogsLoading;

  const transformedData = useMemo(() => {
    return [
      {
        label: 'pages' as const,
        options: (pagesResponse?.data || []).map((page) => ({
          value: page.slug,
          label: page.name
        })), 
      },
      {
        label: 'blogs' as const,
        options: (blogsResponse?.data || []).map((blog) => ({
          value: blog.slug,
          label: blog.title
        })), 
      },
    ];
  }, [pagesResponse, blogsResponse]);

  return {
    data: transformedData,
    isLoading
  };
}