import type { TPaginatedOptions } from "../../../../../Types/global.types";
import { QueryKey } from "../../../../../Types/query.types";
import { useFetchData } from "../../../../../hooks/useFetchData";


export function useInternalLinks(queryString: string = "") {
    const { data: pages, isLoading: isPagesLoading } = useFetchData<TPaginatedOptions>({
        endpoint: QueryKey.PAGES,
        queryKey: ['pages', 'options', queryString],
        queryString,
    });

    const { data: blogs, isLoading: isBlogsLoading } = useFetchData<TPaginatedOptions>({
        endpoint: '/blogs/options',
        queryKey: ['blogs', 'options', queryString],
        queryString,
    });

    const isLoading = isPagesLoading || isBlogsLoading;

    return {
        data: [
            {
                label: 'pages',
                options: pages,
            },
            {
                label: 'blogs',
                options: blogs,
            },
        ],
        isLoading
    }
}