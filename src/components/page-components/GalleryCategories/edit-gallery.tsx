import { useParams } from "react-router-dom";
import { useCustomQuery } from "../../../Global/get-query";
import { QueryKey } from "../../../Types/query.types";
import Loading from "../../../Global/loader";
import ErrorMessage from "../../../Global/error-message";
import { useState } from "react";
import { GalleryCategoryDefaultValues, type TAsyncGalleryCategory } from "../../../Models/gallery.model";
import GalleryCategoryPopupForm from "./gallery-form";

const EditGalleryCategory = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(true);

  const { data: category, isLoading, error } = useCustomQuery<TAsyncGalleryCategory>({
    endPoint: `${QueryKey.GALLERY_CATEGORIES}/${id}`,
    queryKey: [QueryKey.GALLERY_CATEGORIES, id],
    enabled: !!id,
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  const categoryValues = category || GalleryCategoryDefaultValues;

  return (
    <GalleryCategoryPopupForm
      open={isOpen}
      onOpenChange={setIsOpen}
      categoryValues={categoryValues}
      id={id}
      formTitle="Edit Gallery Category"
    />
  );
};

export default EditGalleryCategory;