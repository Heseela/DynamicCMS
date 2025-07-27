import { useParams } from "react-router-dom";
import { useState } from "react";
import { GalleryImageColumns } from "./gallery-image-columns";
import GalleryImageUploadForm from "./gallery-image-upload-form";
import { useCustomQuery } from "../../../../Global/get-query";
import type { GalleryImagesResponse, TAsyncGalleryCategory } from "../../../../Models/gallery.model";
import { QueryKey } from "../../../../Types/query.types";
import Loading from "../../../../Global/loader";
import ErrorMessage from "../../../../Global/error-message";
import { Button } from "../../../ui/button";
import { DataTable } from "../../../../Global/Table/data-table";
import { useQueryClient } from "@tanstack/react-query";

const SingleGalleryPage = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [pagination] = useState({
    page: 1,
    take: 10,
  });

  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = 
    useCustomQuery<TAsyncGalleryCategory[]>({
      endPoint: QueryKey.GALLERY_CATEGORIES,
      queryKey: [QueryKey.GALLERY_CATEGORIES],
    });

  const category = categories?.find(cat => cat.id === id);

  const { 
    data: imagesResponse, 
    isLoading: isImagesLoading, 
    error: imagesError,
    refetch: refetchImages
  } = useCustomQuery<GalleryImagesResponse>({
    endPoint: `${QueryKey.GALLERY_IMAGES}?category=${id}&page=${pagination.page}&take=${pagination.take}`,
    queryKey: [QueryKey.GALLERY_IMAGES, id, pagination.page, pagination.take],
    enabled: !!id,
  });

  if (isCategoriesLoading || isImagesLoading) return <Loading />;
  if (categoriesError || imagesError) return <ErrorMessage />;
  if (!category) return <ErrorMessage/>;

  const images = imagesResponse?.data || [];
  const meta = imagesResponse?.meta;

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-gray-500">
            {meta?.itemCount || 0} images in this category
          </p>
        </div>
        <Button onClick={() => setIsUploadModalOpen(true)}>
          Add Gallery Images
        </Button>
      </div>

      <DataTable
        columns={GalleryImageColumns({ categoryId: id, refetchImages })}
        data={images}
      />

      <GalleryImageUploadForm
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
        categoryId={id}
        onSuccess={() => {
          refetchImages();
          queryClient.invalidateQueries({ 
            queryKey: [QueryKey.GALLERY_CATEGORIES] 
          });
          queryClient.invalidateQueries({ 
            queryKey: [QueryKey.GALLERY_IMAGES] 
          });
        }}
      />
    </div>
  );
};

export default SingleGalleryPage;