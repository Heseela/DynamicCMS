// import { useEffect, useState } from "react";
// import { Upload, type UploadFile, type UploadProps } from "antd";
// import { useFormContext, useFormState } from "react-hook-form";
// import axios from "axios";
// import type { TFormField } from "../../Types/global.types";
// import { useAuth } from "../context/AuthProvider";
// import { useMutation } from "@tanstack/react-query";
// import { QueryKey } from "../../Types/query.types";

// interface UploadedImage {
//   slug: string;
//   url: string;
//   name: string;
// }

// interface ImageResponse {
//   images: {
//     slug: string;
//     url: string;
//     name: string;
//     originalName?: string;
//   }[];
// }

// interface ApiError {
//   response?: {
//     data?: {
//       message: string;
//     };
//   };
//   message: string;
// }

// export type ImageFormField<T> = TFormField<T> & { 
//   type: "image";
//   accept?: string;
//   multiple?: boolean;
//   maxCount?: number;
//   maxSize?: number; // in MB
// };

// type Props<T> = {
//   formField: ImageFormField<T>;
//   imageURLs?: string | string[];
//   reset?: boolean;
//   imageOptions?: {
//     width?: number;
//     quality?: number;
//   };
// };

// export function ImageUploadFormField<T>({
//   formField,
//   imageURLs,
//   reset = true,
// }: Props<T>) {
//   const { setValue, getValues, clearErrors } = useFormContext();
//   const { isSubmitSuccessful } = useFormState();
//   const { access_token } = useAuth();

//   const [fileList, setFileList] = useState<UploadFile[]>([]);
//   const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
//   const [uploading, setUploading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const { mutateAsync: uploadImage } = useMutation<ImageResponse, ApiError, FormData>({
//     mutationFn: async (formData: FormData) => {
//       const response = await axios.post<ImageResponse>(
//         `${import.meta.env.VITE_URL}${QueryKey.IMAGES}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );
//       return response.data;
//     },
//   });

//   const { mutateAsync: deleteImage } = useMutation<void, ApiError, string>({
//     mutationFn: async (slug: string) => {
//       await axios.delete(
//         `${import.meta.env.VITE_URL}${QueryKey.IMAGES}/${slug}`,
//         {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//           },
//           withCredentials: true,
//         }
//       );
//     },
//   });

//   const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
//     setFileList(formField.multiple ? newFileList : newFileList.slice(-1));
//   };

//   const onPreview = async (file: UploadFile) => {
//     let src = file.url as string;
//     if (!src && file.originFileObj) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj as Blob);
//         reader.onload = () => resolve(reader.result as string);
//       });
//     }

//     if (!src) return;

//     const image = new Image();
//     image.src = src;
//     const previewWindow = window.open();
//     if (previewWindow) {
//       previewWindow.document.write(`
//         <html>
//           <head>
//             <title>Image Preview</title>
//             <style>
//               body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
//               img { max-width: 100%; max-height: 100%; }
//             </style>
//           </head>
//           <body>
//             ${image.outerHTML}
//           </body>
//         </html>
//       `);
//     }
//   };

//   const beforeUpload = (file: File) => {
//     if (formField.maxSize && file.size > formField.maxSize * 1024 * 1024) {
//       setErrorMessage(`File size exceeds ${formField.maxSize}MB`);
//       return Upload.LIST_IGNORE;
//     }
//     return true;
//   };

//   const customRequest = async ({ file, onSuccess, onError }: any) => {
//     try {
//       setUploading(true);
//       setErrorMessage(null);
      
//       const formData = new FormData();
//       formData.append("images", file);
//       formData.append("name", file.name);

//       const response = await uploadImage(formData);
//       const uploadedImage = response?.images?.[0];
      
//       if (!uploadedImage) {
//         throw new Error("No image data in response");
//       }

//       const newImage = {
//         slug: uploadedImage.slug,
//         url: uploadedImage.url,
//         name: uploadedImage.name || file.name,
//       };

//       setUploadedImages(prev =>
//         formField.multiple ? [...prev, newImage] : [newImage]
//       );

//       setFileList(prev => {
//         const newFile = {
//           uid: file.uid,
//           name: newImage.name,
//           status: "done" as const,
//           url: newImage.url,
//         };
//         return formField.multiple
//           ? [...prev.filter(f => f.uid !== file.uid), newFile]
//           : [newFile];
//       });

//       clearErrors(formField.name as string);
//       onSuccess(response);
//     } catch (error: any) {
//       console.error("Upload error:", error);
//       onError(error);
//       setErrorMessage(
//         error?.response?.data?.message ||
//           "Failed to upload image. Please try again."
//       );
//     } finally {
//       setUploading(false);
//     }
//   };

//   const onRemove = async (file: UploadFile) => {
//     try {
//       const imageToRemove = uploadedImages.find(img => file.url?.includes(img.slug));
//       if (!imageToRemove) return;

//       // Optimistic update
//       setFileList(prev => prev.filter(f => f.uid !== file.uid));
//       setUploadedImages(prev => prev.filter(img => img.slug !== imageToRemove.slug));

//       // Update form value
//       const currentValue = getValues(formField.name as string);
//       const newValue = formField.multiple
//         ? Array.isArray(currentValue)
//           ? currentValue.filter((slug: string) => slug !== imageToRemove.slug)
//           : []
//         : undefined;
      
//       setValue(formField.name as string, newValue);

//       // Delete from server
//       await deleteImage(imageToRemove.slug);
//     } catch (error) {
//       console.error("Delete error:", error);
//       setErrorMessage("Failed to delete image. Please try again.");
//     }
//   };

//   useEffect(() => {
//     if (!imageURLs) return;

//     const normalizedImageURLs = Array.isArray(imageURLs) ? imageURLs : [imageURLs];
//     const currentValue = getValues(formField.name as string);

//     if (formField.multiple) {
//       if (Array.isArray(currentValue)) {
//         const newFileList = normalizedImageURLs.map((url, index) => ({
//           uid: `${formField.name as string}-${index}`,
//           name: `Uploaded image ${index + 1}`,
//           url,
//           status: "done" as const,
//         }));

//         setFileList(newFileList);
//         setUploadedImages(
//           currentValue.map((slug: string, index: number) => ({
//             slug,
//             url: normalizedImageURLs[index],
//             name: `Uploaded image ${index + 1}`,
//           }))
//         );
//       }
//     } else {
//       setFileList([{
//         uid: formField.name as string,
//         name: "Uploaded image",
//         url: normalizedImageURLs[0],
//         status: "done" as const,
//       }]);
//       setUploadedImages([{
//         slug: currentValue,
//         url: normalizedImageURLs[0],
//         name: "Uploaded image",
//       }]);
//     }
//   }, [imageURLs]);

//   useEffect(() => {
//     if (uploadedImages.length > 0) {
//       setValue(
//         formField.name as string,
//         formField.multiple
//           ? uploadedImages.map(img => img.slug)
//           : uploadedImages[0]?.slug ?? undefined
//       );
//     } else {
//       setValue(formField.name as string, formField.multiple ? [] : undefined);
//     }
//   }, [uploadedImages, formField.multiple, formField.name, setValue]);

//   useEffect(() => {
//     if (isSubmitSuccessful && reset) {
//       setFileList([]);
//       setUploadedImages([]);
//     }
//   }, [isSubmitSuccessful, reset]);

//   return (
//     <div className="image-upload-container">
//       <Upload
//         customRequest={customRequest}
//         listType="picture-card"
//         fileList={fileList}
//         onChange={onChange}
//         onRemove={onRemove}
//         onPreview={onPreview}
//         beforeUpload={beforeUpload}
//         accept={formField.accept || "image/*"}
//         multiple={formField.multiple}
//         maxCount={formField.maxCount}
//         disabled={uploading}
//       >
//         {fileList.length < (formField.maxCount || 1) && "+ Upload"}
//       </Upload>
//       {errorMessage && (
//         <div className="text-red-500 mt-2 text-sm">{errorMessage}</div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Upload, type UploadFile, type UploadProps } from "antd";
import { useFormContext, useFormState } from "react-hook-form";
import axios from "axios";
import type { TFormField } from "../../Types/global.types";
import { useAuth } from "../context/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../Types/query.types";

interface UploadedImage {
  id: string;
  url: string;
  name: string;
  originalName?: string;
}

interface ImageResponse {
  message: string;
  files: {
    id: string;
    url: string;
    originalName: string;
  }[];
  count: number;
}

interface ApiError {
  response?: {
    data?: {
      message: string;
    };
  };
  message: string;
}

export type ImageFormField<T extends Record<string, any>> = TFormField<T> & { 
  type: "image";
  accept?: string;
  multiple?: boolean;
  maxCount?: number;
  maxSize?: number; 
};

type Props<T extends Record<string, any>> = {
  formField: ImageFormField<T>;
  imageURLs?: string | string[];
  reset?: boolean;
  imageOptions?: {
    width?: number;
    quality?: number;
  };
};

export function ImageUploadFormField<T extends Record<string, any>>({
  formField,
  imageURLs,
  reset = true,
}: Props<T>) {
  const { setValue, getValues, clearErrors } = useFormContext();
  const { isSubmitSuccessful } = useFormState();
  const { access_token } = useAuth();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync: uploadImage } = useMutation<ImageResponse, ApiError, FormData>({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post<ImageResponse>(
        `${import.meta.env.VITE_URL}${QueryKey.IMAGES}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
  });

  const { mutateAsync: deleteImage } = useMutation<void, ApiError, string>({
    mutationFn: async (id: string) => {
      await axios.delete(
        `${import.meta.env.VITE_URL}${QueryKey.IMAGES}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          withCredentials: true,
        }
      );
    },
  });

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(formField.multiple ? newFileList : newFileList.slice(-1));
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src && file.originFileObj) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as Blob);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    if (!src) return;

    const image = new Image();
    image.src = src;
    const previewWindow = window.open();
    if (previewWindow) {
      previewWindow.document.write(`
        <html>
          <head>
            <title>Image Preview</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
              img { max-width: 100%; max-height: 100%; }
            </style>
          </head>
          <body>
            ${image.outerHTML}
          </body>
        </html>
      `);
    }
  };

  const beforeUpload = (file: File) => {
    if (formField.maxSize && file.size > formField.maxSize * 1024 * 1024) {
      setErrorMessage(`File size exceeds ${formField.maxSize}MB`);
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      setUploading(true);
      setErrorMessage(null);
      
      const formData = new FormData();
      formData.append("images", file);

      const response = await uploadImage(formData);
      const uploadedFile = response?.files?.[0];
      
      if (!uploadedFile) {
        throw new Error("No file data in response");
      }

      const newImage: UploadedImage = {
        id: uploadedFile.id,
        url: uploadedFile.url,
        name: uploadedFile.originalName || file.name,
        originalName: uploadedFile.originalName
      };

      setUploadedImages(prev =>
        formField.multiple ? [...prev, newImage] : [newImage]
      );

      setFileList(prev => {
        const newFile = {
          uid: file.uid,
          name: newImage.name,
          status: "done" as const,
          url: newImage.url,
        };
        return formField.multiple
          ? [...prev.filter(f => f.uid !== file.uid), newFile]
          : [newFile];
      });

      clearErrors(formField.name as string);
      onSuccess(response);
    } catch (error: any) {
      console.error("Upload error:", error);
      onError(error);
      setErrorMessage(
        error?.response?.data?.message ||
          "Failed to upload image. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  const onRemove = async (file: UploadFile) => {
    try {
      const imageToRemove = uploadedImages.find(img => file.url?.includes(img.id));
      if (!imageToRemove) return;

      setFileList(prev => prev.filter(f => f.uid !== file.uid));
      setUploadedImages(prev => prev.filter(img => img.id !== imageToRemove.id));

      const currentValue = getValues(formField.name as string);
      const newValue = formField.multiple
        ? Array.isArray(currentValue)
          ? currentValue.filter((id: string) => id !== imageToRemove.id)
          : []
        : undefined;
      
      setValue(formField.name as string, newValue);

      await deleteImage(imageToRemove.id);
    } catch (error) {
      console.error("Delete error:", error);
      setErrorMessage("Failed to delete image. Please try again.");
    }
  };

  useEffect(() => {
    if (!imageURLs) return;

    const normalizedImageURLs = Array.isArray(imageURLs) ? imageURLs : [imageURLs];
    const currentValue = getValues(formField.name as string);

    if (formField.multiple) {
      if (Array.isArray(currentValue)) {
        const newFileList = normalizedImageURLs.map((url, index) => ({
          uid: `${formField.name as string}-${index}`,
          name: `Uploaded image ${index + 1}`,
          url,
          status: "done" as const,
        }));

        setFileList(newFileList);
        setUploadedImages(
          currentValue.map((id: string, index: number) => ({
            id,
            url: normalizedImageURLs[index],
            name: `Uploaded image ${index + 1}`,
          }))
        );
      }
    } else {
      setFileList([{
        uid: formField.name as string,
        name: "Uploaded image",
        url: normalizedImageURLs[0],
        status: "done" as const,
      }]);
      setUploadedImages([{
        id: currentValue,
        url: normalizedImageURLs[0],
        name: "Uploaded image",
      }]);
    }
  }, [imageURLs]);

  useEffect(() => {
    if (uploadedImages.length > 0) {
      setValue(
        formField.name as string,
        formField.multiple
          ? uploadedImages.map(img => img.id)
          : uploadedImages[0]?.id ?? undefined
      );
    } else {
      setValue(formField.name as string, formField.multiple ? [] : undefined);
    }
  }, [uploadedImages, formField.multiple, formField.name, setValue]);

  useEffect(() => {
    if (isSubmitSuccessful && reset) {
      setFileList([]);
      setUploadedImages([]);
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="image-upload-container">
      <Upload
        customRequest={customRequest}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onRemove={onRemove}
        onPreview={onPreview}
        beforeUpload={beforeUpload}
        accept={formField.accept || "image/*"}
        multiple={formField.multiple}
        maxCount={formField.maxCount}
        disabled={uploading}
      >
        {fileList.length < (formField.maxCount || 1) && "+ Upload"}
      </Upload>
      {errorMessage && (
        <div className="text-red-500 mt-2 text-sm">{errorMessage}</div>
      )}
    </div>
  );
}