import { useEffect, useState } from "react";
import { Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useFormContext, useFormState } from "react-hook-form";
import axios from "axios";
import type { TFormField } from "../../Types/global.types";
import { useAuth } from "../context/AuthProvider";
import { useCustomMutation } from "../../Global/custom-muation";
import { QueryKey } from "../../Types/query.types";
import { useMutation } from "@tanstack/react-query";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type Props<T extends Record<string, any>> = {
  formField: TFormField<T> & { type: "file" };
  imageURL?: string | string[];
  reset?: boolean;
  maxCount?: number;
};

type FileObj = {
  uid: string;
  fileId: string;
  url: string;
};

export function FileUploadFormField<T extends Record<string, any>>({  formField,
  imageURL,
  reset = true,
  maxCount,
}: Props<T>) {
  const { setValue, getValues, clearErrors } = useFormContext();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { isSubmitSuccessful } = useFormState();
  const [fileObjs, setFileObjs] = useState<FileObj[]>([]);
  const { access_token } = useAuth();

  const { mutateAsync } = useCustomMutation<FormData>({
    endPoint: QueryKey.FILES,
    method: "post",
  });

  const { mutateAsync: deleteMutate } = useMutation<void, Error, string>({
    mutationFn: async (imageId) =>
      await axios.delete(
        `${import.meta.env.VITE_URL}${QueryKey.FILES}/${imageId}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          withCredentials: true,
        }
      ),
  });

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(maxCount && maxCount > 1 ? newFileList : newFileList.slice(-1));
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await mutateAsync(formData);
      
      if (!response?.files?.[0]) {
        throw new Error("No file data in response");
      }

      const uploadedFile = response.files[0];
      const newFileObj = {
        uid: file.uid,
        fileId: uploadedFile.id,
        url: uploadedFile.url,
      };

      setFileObjs((prev) =>
        maxCount && maxCount > 1 ? [...prev, newFileObj] : [newFileObj]
      );

      setFileList((prev) => {
        const newFile = {
          ...file,
          url: uploadedFile.url,
          status: "done",
          name: uploadedFile.originalName || file.name,
        };
        return maxCount && maxCount > 1
          ? [...prev.filter((f) => f.uid !== file.uid), newFile]
          : [newFile];
      });

      clearErrors(formField.name as string);
      onSuccess(response);
    } catch (error: any) {
      console.error("Upload error:", error);
      onError(error);
      setErrorMessage(
        error?.response?.data?.message ||
          "Failed to upload file. Please try again."
      );
    }
  };

  const onRemove = async (file: UploadFile) => {
    const fileToRemove = fileObjs.find((f) => f.uid === file.uid);

    setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
    setFileObjs((prev) => prev.filter((f) => f.uid !== file.uid));

    const currentValue = getValues(formField.name as string);
    setValue(
      formField.name as string,
      maxCount && maxCount > 1
        ? Array.isArray(currentValue)
          ? currentValue.filter((id: string) => id !== fileToRemove?.fileId)
          : undefined
        : undefined
    );

    if (fileToRemove?.fileId) {
      try {
        await deleteMutate(fileToRemove.fileId);
      } catch (error) {
        console.error("Delete error:", error);
        setErrorMessage("Failed to delete file. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (imageURL) {
      if (Array.isArray(imageURL)) {
        const currentValue = getValues(formField.name as string);
        if (Array.isArray(currentValue) && currentValue.length === imageURL.length) {
          const newFileList = imageURL.map((url, index) => ({
            uid: `${formField.name as string}-${index}`,
            name: `Uploaded file ${index + 1}`,
            url,
            status: "done" as const,
          }));

          setFileList(newFileList);
          setFileObjs(
            currentValue.map((id: string, index: number) => ({
              uid: `${formField.name as string}-${index}`,
              fileId: id,
              url: imageURL[index],
            }))
          );
        }
      } else {
        const currentValue = getValues(formField.name as string);
        setFileList([
          {
            uid: formField.name as string,
            name: "Uploaded file",
            url: imageURL,
            status: "done" as const,
          },
        ]);
        setFileObjs([
          {
            uid: formField.name as string,
            fileId: currentValue,
            url: imageURL,
          },
        ]);
      }
    }
  }, [imageURL]);

  useEffect(() => {
    if (fileObjs.length > 0) {
      setValue(
        formField.name as string,
        maxCount && maxCount > 1
          ? fileObjs.map((item) => item.fileId)
          : fileObjs[0]?.fileId ?? undefined
      );
    } else {
      setValue(formField.name as string, undefined);
    }
  }, [fileObjs, maxCount]);

  useEffect(() => {
    if (isSubmitSuccessful && reset) {
      setFileList([]);
      setFileObjs([]);
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="file-upload-container">
      <Upload
        customRequest={customRequest}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onRemove={onRemove}
        onPreview={onPreview}
        accept={formField.accept}
        maxCount={maxCount || 1}
      >
        {fileList.length < (maxCount || 1) && "+ Upload"}
      </Upload>
      {errorMessage && (
        <div className="text-red-500 mt-2 text-sm">{errorMessage}</div>
      )}
    </div>
  );
}