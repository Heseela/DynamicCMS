import { useMutation, useQuery } from '@tanstack/react-query';
import { QueryKey } from '../../../../Types/query.types';
import apiClient from '../../../../lib/api-client';
import type { TPageDto } from '../../../../Models/page.model';

export function useGetPage(slug: string) {
  return useQuery({
    queryKey: [QueryKey.PAGES, slug],
    queryFn: () => apiClient.get(`/pages/${slug}`).then(res => res.data),
  });
}

export function useUpdatePage() {
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: TPageDto }) => 
      apiClient.patch(`/pages/${slug}`, data).then(res => res.data),
  });
}

export function useCreatePage() {
  return useMutation({
    mutationFn: (data: { name: string }) => 
      apiClient.post(`/pages`, data).then(res => res.data),
  });
}

export function useDeletePage() {
  return useMutation({
    mutationFn: (slug: string) => 
      apiClient.delete(`/pages/${slug}`).then(res => res.data),
  });
}