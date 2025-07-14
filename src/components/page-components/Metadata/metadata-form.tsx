import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useCustomMutation } from "../../../Global/custom-muation";
import { QueryKey } from "../../../Types/query.types";
import { MetadataSchema, type TMetadata, MetadataDefaultValues } from "../../../Models/metadata.model";
import InputField from "../../form-component/input-form";
import SubmitButton from "../../../Global/Button";
import { FormField, FormItem, FormControl, FormMessage } from "../../ui/form";
import { Button } from "../../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";

type MetadataFormProps = {
  initialData?: TMetadata;
  onSuccess?: () => void;
};

export const MetadataForm = ({ 
  initialData = MetadataDefaultValues, 
  onSuccess
}: MetadataFormProps) => {
  const { slug } = useParams();
  
  const formMethods = useForm<TMetadata>({
    resolver: zodResolver(MetadataSchema),
    defaultValues: initialData
  });
  
  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: "keywords"
  });

  const { mutate, isPending } = useCustomMutation<TMetadata>({
    endPoint: QueryKey.METADATA,
    queryKey: [QueryKey.METADATA, slug],
    method: "patch",
    params: { page: slug }
  });

  useEffect(() => {
    formMethods.reset(initialData);
  }, [initialData, formMethods]);

  const onSubmit = (values: TMetadata) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Metadata updated successfully!");
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update metadata");
      },
    });
  };

  const addKeyword = () => {
    append("");
  };

  const removeKeyword = (index: number) => {
    remove(index);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          formField={{
            label: "Title",
            name: "title",
            type: "text",
            placeholder: "Enter page title",
            required: true,
          }}
        />

        <InputField
          formField={{
            label: "Description",
            name: "description",
            type: "text",
            placeholder: "Enter page description",
          }}
        />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Keywords</h3>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addKeyword}
              aria-label="Add keyword"
            >
              <Plus size={16} className="mr-2" />
              Add Keyword
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <FormField
                control={formMethods.control}
                name={`keywords.${index}`}
                render={() => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <InputField
                        formField={{
                          name: `keywords.${index}`,
                          type: "text",
                          placeholder: "Enter keyword",
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeKeyword(index)}
                aria-label={`Remove keyword ${index + 1}`}
              >
                <Trash2 className="text-red-600" size={16} />
              </Button>
            </div>
          ))}
        </div>

        <SubmitButton
          isLoading={isPending}
          title="Save Metadata"
          showBackBtn={false}
        />
      </form>
    </FormProvider>
  );
};
