import { useCustomQuery } from "../../../../../Global/get-query";
import type { TPaginatedOptions } from "../../../../../Types/global.types";
import { QueryKey } from "../../../../../Types/query.types";

export function useInternalLinks(queryString: string = "") {
    const { 
        data: pages, 
        isLoading: isPagesLoading 
    } = useCustomQuery<TPaginatedOptions>({
        endPoint: QueryKey.PAGES,
        queryKey: ['pages', 'options', queryString],
    });

    const { 
        data: blogs, 
        isLoading: isBlogsLoading 
    } = useCustomQuery<TPaginatedOptions>({
        endPoint: '/blog-categories/options',
        queryKey: ['blogs', 'options', queryString],
    });

    const isLoading = isPagesLoading || isBlogsLoading;

    return {
        data: [
            {
                label: 'pages',
                options: pages?.data || [], 
            },
            {
                label: 'blogs',
                options: blogs?.data || [], 
            },
        ],
        isLoading
    };
}