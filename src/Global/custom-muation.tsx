import { type QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";


type TMutation = {
    endPoint: string;
    id?: string;
    queryKey?: QueryKey;
    method: "post" | "patch" | "put" | "delete";
    params?: Record<string, any>; 

};

export function useCustomMutation<T>(props: TMutation) {
  const { method, id, endPoint, queryKey } = props;
  const queryClient = useQueryClient();

  const mutateResponse = useMutation({
    mutationFn: async (values: T | FormData) => {
      const baseUrl = import.meta.env.VITE_URL || '';
      const apiPath = endPoint.startsWith('/') ? endPoint : `/${endPoint}`;
      const url = id ? `${baseUrl}${apiPath}/${id}` : `${baseUrl}${apiPath}`;
      
      const isFormData = values instanceof FormData;
      const headers = new Headers();
      
      if (!isFormData) {
        headers.append('Content-Type', 'application/json');
      }
      headers.append('Accept', 'application/json');

      const response = await fetch(url, {
        method: method.toUpperCase(),
        headers,
        body: isFormData ? values : JSON.stringify(values),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (!response.ok) {
        const errorMessage = data?.message || data?.error || 
                           `Request failed with status ${response.status}`;
        throw new Error(errorMessage);
      }

      return data;
    },

    onSuccess: (data) => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
      return data;
    },
  });

  return mutateResponse;
}
  

  type TDeleteMutation = {
    endPoint: string;
    queryKey?: QueryKey;
    id: string;
};

export function useDeleteMutation(props: TDeleteMutation) {
    const { id, endPoint, queryKey } = props;
    const queryClient = useQueryClient();
  
    const mutateResponse = useMutation({
      mutationFn: async () => {
        const baseUrl = import.meta.env.VITE_URL || '';
        const apiPath = endPoint.startsWith('/') ? endPoint : `/${endPoint}`;
        const url = `${baseUrl}${apiPath}/${id}`;
        
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
          },
        });

        // Handle empty response
        const text = await response.text();
        const data = text ? JSON.parse(text) : null;

        if (!response.ok) {
          const errorMessage = data?.message || data?.error || 
                             `Failed to delete resource (status ${response.status})`;
          throw new Error(errorMessage);
        }

        return data;
      },
      onSuccess: () => {
        if (queryKey) {
          queryClient.invalidateQueries({ queryKey });
        }
      },
    });
  
    return mutateResponse;
}
  