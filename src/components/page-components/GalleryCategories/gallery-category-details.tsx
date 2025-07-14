import { useParams } from "react-router-dom";
import { useCustomQuery } from "../../../Global/get-query";
import { QueryKey } from "../../../Types/query.types";
import Loading from "../../../Global/loader";
import ErrorMessage from "../../../Global/error-message";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { useCustomMutation } from "../../../Global/custom-muation";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import type { GalleryImagesResponse, TAsyncGalleryCategory } from "../../../Models/gallery.model";
import { FileUploadField } from "../../form-component/upload-image";

const GalleryCategoryDetails = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const { data: category, isLoading: isCategoryLoading, error: categoryError } =
        useCustomQuery<TAsyncGalleryCategory>({
            endPoint: `${QueryKey.GALLERY_CATEGORIES}/${id}`,
            queryKey: [QueryKey.GALLERY_CATEGORIES, id],
            enabled: !!id,
        });

    const { data: categoryImages, isLoading: isImagesLoading, error: imagesError } =
        useCustomQuery<GalleryImagesResponse>({
            endPoint: `${QueryKey.GALLERY_IMAGES}?category=${id}`,
            queryKey: [QueryKey.GALLERY_IMAGES, id],
            enabled: !!id,
        });

    const { mutate: updateCategory, isPending: isUpdating } = useCustomMutation({
        endPoint: `${QueryKey.GALLERY_CATEGORIES}/${id}`,
        queryKey: [QueryKey.GALLERY_CATEGORIES, id],
        method: "patch",
    });

    const form = useForm({
        defaultValues: {
            addImageIds: [] as string[],
        }
    });


    const onSubmit = () => {
        const values = form.getValues();
        updateCategory(
            { addImageIds: values.addImageIds },
            {
                onSuccess: () => {
                    toast.success("Images added to category!");
                    queryClient.invalidateQueries({ 
                        queryKey: [QueryKey.GALLERY_CATEGORIES, id] 
                      });
                      queryClient.invalidateQueries({ 
                        queryKey: [QueryKey.GALLERY_IMAGES] 
                      });
                },
                onError: (error) => {
                    toast.error(error?.message || "Failed to add images");
                },
            }
        );
    };

    if (isCategoryLoading || isImagesLoading) return <Loading />;
    if (categoryError || imagesError) return <ErrorMessage />;

    return (
        <div className="space-y-6 p-4">
            <h1 className="text-2xl font-bold">Gallery Category: {category?.name}</h1>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Add Images to Category</h2>
                <FileUploadField
                    formField={{
                        name: "addImageIds",
                        label: "Add Images to Category",
                        type: "file",
                        required: false,
                        accept: "image/*",
                    }}
                    imageURL={categoryImages?.data.map(img => img.url)}
                    maxCount={10}
                    reset={false}
                />
                <Button
                    onClick={onSubmit}
                    disabled={isUpdating}
                    className="mt-4"
                >
                    {isUpdating ? "Saving..." : "Save Images"}
                </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Images in this Category</h2>
                {categoryImages?.data.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categoryImages.data.map((image) => (
                            <div key={image.id} className="border rounded-lg overflow-hidden">
                                <img
                                    src={image.url}
                                    alt={`Gallery image ${image.id}`}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-2">
                                    <p className="text-sm truncate">{image.id}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No images in this category yet.</p>
                )}
            </div>
        </div>
    );
};

export default GalleryCategoryDetails;