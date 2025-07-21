import { useParams } from "react-router-dom";
import { useCustomQuery } from "../../../Global/get-query";
import { QueryKey } from "../../../Types/query.types";
import Loading from "../../../Global/loader";
import ErrorMessage from "../../../Global/error-message";
import type { TAsyncGalleryCategory } from "../../../Models/gallery.model";
import GalleryImageList from "./gallery-image-list";

const GalleryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: category, isLoading, error } = useCustomQuery<TAsyncGalleryCategory>({
    endPoint: `${QueryKey.GALLERY_CATEGORIES}/${id}`,
    queryKey: [QueryKey.GALLERY_CATEGORIES, id],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;
  if (!category) return <div>Category not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{category.name}</h1>
      </div>
      
      <GalleryImageList categoryId={id!} />
    </div>
  );
};

export default GalleryDetailPage;