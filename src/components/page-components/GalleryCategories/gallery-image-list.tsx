import { DataTable } from "../../../Global/Table/data-table";
import ErrorMessage from "../../../Global/error-message";
import { useCustomQuery } from "../../../Global/get-query";
import Loading from "../../../Global/loader";
import { QueryKey } from "../../../Types/query.types";
import { Button } from "../../ui/button";
import { useState } from "react";
import type { GalleryImagesResponse } from "../../../Models/gallery.model";
import GalleryImageForm from "./gallery-image-form";
import { GalleryImageColumns } from "./gallery-image-column";

type GalleryImageListProps = {
  categoryId: string;
};

const GalleryImageList = ({ categoryId }: GalleryImageListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: images, isLoading, error } = useCustomQuery<GalleryImagesResponse>({
    endPoint: `${QueryKey.GALLERY_IMAGES}?categoryId=${categoryId}`,
    queryKey: [QueryKey.GALLERY_IMAGES, categoryId],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gallery Images</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          Add New Images
        </Button>
      </div>

      <DataTable
        columns={GalleryImageColumns}
        data={images?.data || []}
      />

      <GalleryImageForm
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        categoryId={categoryId}
      />
    </div>
  );
};

export default GalleryImageList;