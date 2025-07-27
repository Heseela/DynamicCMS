// import { useState, useTransition } from "react";
// import axios from "axios";
// import type { TFormField } from "../../../Types/global.types";
// import { useAuth } from "../../context/AuthProvider";
// import { useMutation } from "@tanstack/react-query";
// import { QueryKey } from "../../../Types/query.types";
// import type { TMediaSchema } from "../../../Models/media.model";

// interface ImageResponse {
//   message: string;
//   files: {
//     id: string;
//     url: string;
//     originalName: string;
//   }[];
//   count: number;
// }

// interface ApiError {
//   response?: {
//     data?: {
//       message: string;
//     };
//   };
//   message: string;
// }

// export type ImageFormField<T extends Record<string, any>> = TFormField<T> & {
//   type: "image";
//   accept?: string;
//   multiple?: boolean;
//   maxCount?: number;
//   maxSize?: number;
// };

// type Props = {
//   initialValues?: TMediaSchema[]
//   onChange: (value: TMediaSchema[]) => void;
//   maxSize?: number,
//   accept?: string
//   multiple?: boolean
// };

// export function MediaField({
//   onChange,
//   maxSize = 1024 * 1024 * 5,
//   accept = "image/*",
//   multiple = false,
// }: Props) {
//   const { access_token } = useAuth();
//   const [isPending, startTransition] = useTransition();

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

//   const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     startTransition(async () => {
//       try {
//         setErrorMessage(null);

//         const files = e.target.files;

//         if (!files) return;

//         // validations

//         const formData = new FormData();

//         for (const file of files) {
//           formData.append("images", file);
//         }

//         const response = await uploadImage(formData);
//         const uploadedFiles = response?.files || [];

//         if (uploadedFiles.length === 0) {
//           throw new Error("No files were uploaded");
//         }

//         const newImages = uploadedFiles.map(file => ({
//           imageId: file.id,
//           url: file.url,
//           originalName: file.originalName
//         }));

//         onChange(newImages);
//       } catch (error: any) {
//         console.error("Upload error:", error);
//         setErrorMessage(
//           error?.response?.data?.message ||
//           "Failed to upload image. Please try again."
//         );
//       }
//     })
//   };

//   return (
//     <div className="image-upload-container">
//       <input
//         type="file"
//         accept={accept}
//         multiple={multiple}
//         onChange={onUpload}
//       />

//       {errorMessage && (
//         <div className="text-red-500 mt-2 text-sm">{errorMessage}</div>
//       )}
//     </div>
//   );
// }

import { useState, useTransition } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../../Types/query.types";
import type { TMediaSchema } from "../../../Models/media.model";
import { Button } from "../../ui/button";
import { Upload, Loader2 } from "lucide-react"; // Added Loader2 for spinner

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

type Props = {
  onChange: (value: TMediaSchema[]) => void;
  maxSize?: number;
  accept?: string;
  multiple?: boolean;
  maxCount?: number;
  currentCount?: number;
};

export function MediaField({
  onChange,
  maxSize = 1024 * 1024 * 5, // 5MB
  accept = "image/*",
  multiple = false,
  maxCount = 10,
  currentCount = 0,
}: Props) {
  const { access_token } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputId = `media-upload-${Math.random().toString(36).substring(2, 9)}`;

  const { mutateAsync: uploadImage, isPending: isUploading } = useMutation<ImageResponse, ApiError, FormData>({
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

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(async () => {
      try {
        setErrorMessage(null);
        const files = e.target.files;

        if (!files || files.length === 0) return;

        if (multiple && currentCount + files.length > maxCount) {
          setErrorMessage(`You can upload maximum ${maxCount} images`);
          return;
        }

        const invalidFiles = Array.from(files).filter(file => {
          if (file.size > maxSize) {
            return true;
          }
          if (accept !== "*/*" && !file.type.match(accept.replace("*", ".*"))) {
            return true;
          }
          return false;
        });

        if (invalidFiles.length > 0) {
          setErrorMessage(
            `Some files are invalid. Please check file types and sizes (max ${maxSize / 1024 / 1024}MB)`
          );
          return;
        }

        const formData = new FormData();
        Array.from(files).forEach(file => formData.append("images", file));

        const response = await uploadImage(formData);
        const uploadedFiles = response?.files || [];

        if (uploadedFiles.length === 0) {
          throw new Error("No files were uploaded");
        }

        const newImages = uploadedFiles.map(file => ({
          imageId: file.id,
          url: file.url,
          originalName: file.originalName
        }));

        onChange(newImages);
      } catch (error: any) {
        console.error("Upload error:", error);
        setErrorMessage(
          error?.response?.data?.message ||
          "Failed to upload image. Please try again."
        );
      } finally {
        if (e.target) {
          e.target.value = "";
        }
      }
    });
  };

  const isLoading = isPending || isUploading;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="relative"
          disabled={currentCount >= maxCount || isLoading}
        >
          <label
            htmlFor={inputId}
            className="flex items-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            <span>{isLoading ? "Uploading..." : "Upload"}</span>
          </label>
          <input
            id={inputId}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={onUpload}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            disabled={currentCount >= maxCount || isLoading}
          />
        </Button>
        {multiple && (
          <span className="text-sm font-medium text-gray-500">
            {currentCount}/{maxCount} images
          </span>
        )}
      </div>

      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
    </div>
  );
}