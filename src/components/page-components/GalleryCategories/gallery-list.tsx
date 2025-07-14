import { DataTable } from "../../../Global/Table/data-table";
import ErrorMessage from "../../../Global/error-message";
import { useCustomQuery } from "../../../Global/get-query";
import Loading from "../../../Global/loader";
import { QueryKey } from "../../../Types/query.types";
import { Button } from "../../ui/button";
import { useState } from "react";
import type { TAsyncGalleryCategories } from "../../../Models/gallery.model";
import { GalleryCategoryColumns } from "./gallery-column";
import GalleryCategoryPopupForm from "./gallery-form";

const GalleryCategoryList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: categories, isLoading, error } = useCustomQuery<TAsyncGalleryCategories>({
    endPoint: QueryKey.GALLERY_CATEGORIES,
    queryKey: [QueryKey.GALLERY_CATEGORIES],
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Categories</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          Add New Category
        </Button>
      </div>

      <DataTable
        columns={GalleryCategoryColumns}
        data={categories  || []}
      />

      <GalleryCategoryPopupForm
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};

export default GalleryCategoryList;