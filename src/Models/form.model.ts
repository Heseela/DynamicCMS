import { z } from "zod";
import type { TMeta } from "../Types/global.types";
import type { FormFieldComponentProps } from "../components/page-components/Form/fields/fields";

export enum FormFieldType {
  Text = 'text',
  Email = 'email',
  Tel = 'tel',
  Textarea = 'textarea',
  Number = 'number',
  File = 'file',
  Select = 'select',
  Relation = 'relation'
}

export enum FormFieldDataSourceEntity {
  Job = 'job',
  Course = 'course'
}

export const FormFieldDataSourceEntities = ["job", "course"] as const;
export type TFormFieldDataSourceEntity = typeof FormFieldDataSourceEntities[number];

export type TFormFieldType =
  | FormFieldType.Text
  | FormFieldType.Email
  | FormFieldType.Tel
  | FormFieldType.Textarea
  | FormFieldType.Number
  | FormFieldType.File
  | FormFieldType.Select
  | FormFieldType.Relation;

const FieldValidationSchema = z.object({
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  pattern: z.string()
    .optional()
    .refine(val => {
      if (!val) return true;
      try {
        new RegExp(val);
        return true;
      } catch {
        return false;
      }
    }, { message: "Invalid regular expression pattern" }),
}).partial();
const FormFieldOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const DataSourceSchema = z.object({
  entity: z.enum(FormFieldDataSourceEntities),
  filter: z.string().optional(),
  multiple: z.boolean().optional(),
});

const BaseFieldSchema = z.object({
  type: z.nativeEnum(FormFieldType),
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be between 3 and 50 characters" })
    .max(50, { message: "Name must be between 3 and 50 characters" })
    .regex(/^[A-Za-z0-9]+$/, { message: "No white space, special characters allowed" }),
  label: z
    .string()
    .trim()
    .max(50, { message: "Max 50 characters allowed" }),
  placeholder: z
    .string()
    .trim()
    .max(50, { message: "Max 50 characters allowed" }),
  required: z.boolean().optional(),
  order: z.number().optional(),
  validation: FieldValidationSchema.optional(),
});

export const TextFieldSchema = BaseFieldSchema.extend({
  type: z.literal(FormFieldType.Text),
  defaultValue: z.string().optional(),
});
export const EmailFieldSchema = BaseFieldSchema.extend({
  type: z.literal(FormFieldType.Email),
  defaultValue: z.string().email({ message: "Invalid email format" }).optional(),
});
export const TelFieldSchema = BaseFieldSchema.extend({
  type: z.literal(FormFieldType.Tel),
  defaultValue: z.string().optional(),
});
export const TextareaFieldSchema = BaseFieldSchema.extend({
  type: z.literal(FormFieldType.Textarea),
  defaultValue: z.string().optional(),
});

export const NumberFieldSchema = BaseFieldSchema.extend({
  type: z.literal(FormFieldType.Number),
  defaultValue: z.coerce.number().optional(),
});

export const FileFieldSchema = BaseFieldSchema.extend({
  type: z.literal(FormFieldType.File),
  accept: z
      .string()
      .trim()
      .min(1, { message: "Accept attribute is required for file fields" }),
});

export const SelectFieldSchema = BaseFieldSchema.extend({
    type: z.literal(FormFieldType.Select),
    options: z
    .array(FormFieldOptionSchema)
    .min(1, { message: "At least one option is required" }),
    multiple: z.boolean().optional(),
    defaultValue: z.string().optional(),
});

export const RelationFieldSchema = BaseFieldSchema.extend({
    type: z.literal(FormFieldType.Relation),
    dataSource: DataSourceSchema,
    defaultValue: z.string().optional(),
});

export const FormFieldSchema = z.discriminatedUnion("type", [
  TextFieldSchema,
  EmailFieldSchema,
  NumberFieldSchema,
  TextareaFieldSchema,
  TelFieldSchema,
  FileFieldSchema,
  SelectFieldSchema,
  RelationFieldSchema,
]);

export const FormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  fields: z.array(FormFieldSchema),
  submitBtnLabel: z.string().min(1, "Submit button label is required")
});

export type FormFieldComponents = {
  [key in FormFieldType]?: React.ComponentType<FormFieldComponentProps>;
};

export type TFormField = z.infer<typeof FormFieldSchema>;
export type TForm = z.infer<typeof FormSchema> & {
  id?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
};


export type TFormList = {
  data: TForm[];
  meta: TMeta;
};

export type TFormSubmission = {
  id?: string;
  formSlug: string;
  data: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
};

export type TFormSubmissionList = {
  data: TFormSubmission[];
  meta: TMeta;
};