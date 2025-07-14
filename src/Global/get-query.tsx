// import { type QueryKey, useQuery, type UseQueryResult } from "@tanstack/react-query";

// type GetQueryParams = {
//     endPoint: string;
//     id?: string;
//     queryKey?: QueryKey;
//     method?: "get";
// };

// export function useCustomQuery<T>(
//     props: GetQueryParams
// ): UseQueryResult<T, Error> {
//     const { endPoint, id } = props;

//     const queryFn = async () => {
//         const url = id ? `${endPoint}/${id}` : endPoint;
//         const response = await fetch(url, {
//             headers: {
//                 'Accept': 'application/json', 
//             }
//         });

//         if (!response.ok) {
//             const errorData = await response.json().catch(() => null);
//             throw new Error(
//                 errorData?.message || 
//                 `Request failed with status ${response.status}`
//             );
//         }

//         const contentType = response.headers.get('content-type');
//         if (!contentType?.includes('application/json')) {
//             throw new Error(
//                 `Expected JSON response, got ${contentType || 'unknown content type'}`
//             );
//         }

//         return response.json() as Promise<T>;
//     };

//     return useQuery<T, Error>({
//         queryKey: [endPoint, id],
//         queryFn,
//         retry: (failureCount, error) => {
//             if (error.message.includes('status 4') && 
//                 !error.message.includes('status 408') && 
//                 !error.message.includes('status 429')) {
//                 return false;
//             }
//             return failureCount < 3; 
//         }
//     });
// }

import { type QueryKey, useQuery, type UseQueryResult } from "@tanstack/react-query";

type GetQueryParams = {
    endPoint?: string;
    id?: string;
    enabled?:boolean;
    queryKey?: QueryKey;
    method?: "get";
    params?: Record<string, any>; 

};

export function useCustomQuery<T>(
    props: GetQueryParams
): UseQueryResult<T, Error> {
    const { endPoint, id, queryKey = [endPoint, id] } = props;

    const queryFn = async () => {
        const baseUrl = import.meta.env.VITE_URL || '';
        const apiPath = endPoint?.startsWith('/') ? endPoint : `/${endPoint}`;
        const url = id 
            ? `${baseUrl}${apiPath}/${id}`
            : `${baseUrl}${apiPath}`;

        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            let errorMessage = `Request failed with status ${response.status}`;
            
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
            } catch {
                const text = await response.text();
                if (text) errorMessage = text;
            }
            
            throw new Error(errorMessage);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            throw new Error(`Expected JSON response, got ${contentType || 'unknown content type'}`);
        }

        return response.json() as Promise<T>;
    };

    return useQuery<T, Error>({
        queryKey: queryKey,
        queryFn,
        retry: (failureCount, error) => {
            if (error.message.includes('status 4') && 
                !error.message.includes('status 408') && 
                !error.message.includes('status 429')) {
                return false;
            }
            return failureCount < 3;
        },
       
    });
}