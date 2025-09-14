import { useEffect, useState } from "react";
import { Upload, type UploadFile, type UploadProps } from "antd";
import { useFormContext, useFormState } from "react-hook-form";
import axios, { AxiosError } from "axios";
import type { TFormField } from "../../Types/global.types";
import { useAuth } from "../context/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "../../Types/query.types";
import type { TMediaSchema } from "../../Models/media.model";

interface UploadedImage {
  id: string;
  url: string;
  originalName?: string;
}

const MAX_SIZE = 5 * 1024 * 1024;

interface ImageResponse {
  message: string;
  files: {
    id: string;
    url: string;
    originalName: string;
  }[];
  count: number;
}

type Props = {
  name: string;
  onChange: (media: TMediaSchema[]) => void;
  multiple?: boolean;
  accept?: string;
};

export function ImageUploadFormField({
  name,
  onChange,
  accept,
  multiple
}: Props) {
  const form = useFormContext();
  const { access_token } = useAuth();

  const { mutateAsync: uploadImage, isPending } = useMutation({
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
    onError(error) {
      form.setError(name, {
        message: error.message,
      })
    },
  });

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const formData = new FormData();

    for (const file of files) {
      // perform validation - max size for each file
      formData.append("images", file);
    }

    const response = await uploadImage(formData);

    const uploadedFiles = response?.files || [];

    const newImages: TMediaSchema[] = uploadedFiles.map(file => ({
      id: file.id,
      url: file.url,
      originalName: file.originalName
    }));

    onChange(newImages);
  }

  return (
    <div className="image-upload-container">
      <input
        type="file"
        accept={accept || "image/*"}
        onChange={upload}
        multiple={multiple}
      />
    </div>
  );
}