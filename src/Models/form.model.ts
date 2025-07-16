// import { z } from "zod";
// import type { TMeta } from "../Types/global.types";

// export enum FormFieldType {
//     Text = 'text',
//     Email = 'email',
//     Tel = 'tel',
//     Textarea = 'textarea',
//     Number = 'number',
//     File = 'file',
//     Select = 'select',
//     Checkbox = 'checkbox',
//     Radio = 'radio',
//     Relation = 'relation'
// }

// export enum FormFieldDataSourceEntity {
//     Blogs = 'blogs',
//     Pages = 'pages'
// }

// // --- FieldValidationPropDto ---
// export const FieldValidationPropSchema = z
//     .object({
//         minLength: z.coerce.number().int({ message: "Must be an integer" }).min(0).optional(),
//         maxLength: z.coerce.number().int({ message: "Must be an integer" }).min(0).optional(),
//         pattern: z
//             .string()
//             .optional()
//             .refine((val) => {
//                 if (val === undefined) return true;
//                 try {
//                     new RegExp(val);
//                     return true;
//                 } catch {
//                     return false;
//                 }
//             }, { message: "Invalid validation pattern" }),
//     })
//     .partial();

// // --- FormFieldOptionDto ---
// export const FormFieldOptionSchema = z.object({
//     value: z.string().trim().min(1, { message: "Value is required" }),
//     label: z.string().trim().min(1, { message: "Label is required" }),
// });

// // --- FormFieldDataSourcePropDto ---
// export const FormFieldDataSourcePropSchema = z.object({
//     entity: z.nativeEnum(FormFieldDataSourceEntity),
//     filter: z.string().optional(),
//     multiple: z.boolean().optional(),
// });

// // --- Base props shared by all fields ---
// const BaseField = z.object({
//     name: z
//         .string()
//         .trim()
//         .min(3, { message: "Name must be between 3 and 50 characters" })
//         .max(50, { message: "Name must be between 3 and 50 characters" })
//         .regex(/^[A-Za-z0-9]+$/, { message: "No white space, special characters allowed" }),
//     label: z
//         .string()
//         .trim()
//         .max(50, { message: "Max 50 characters allowed" }),
//     placeholder: z
//         .string()
//         .trim()
//         .max(50, { message: "Max 50 characters allowed" }),
//     required: z.boolean().optional(),
//     validation: FieldValidationPropSchema.optional(),
// });

// export type TBaseFormField = z.infer<typeof BaseField>;

// // --- Simple fields (no extra props) ---
// export const TextFieldSchema = BaseField.extend({
//     type: z.literal(FormFieldType.Text),
//     defaultValue: z.string().optional(),
// });
// export const EmailFieldSchema = BaseField.extend({
//     type: z.literal(FormFieldType.Email),
//     defaultValue: z.string().email({ message: "Invalid email format" }).optional(),
// });
// export const TelFieldSchema = BaseField.extend({
//     type: z.literal(FormFieldType.Tel),
//     defaultValue: z.string().optional(),
// });
// export const TextareaFieldSchema = BaseField.extend({
//     type: z.literal(FormFieldType.Textarea),
//     defaultValue: z.string().optional(),
// });
// export const NumberFieldSchema = BaseField.extend({
//     type: z.literal(FormFieldType.Number),
//     defaultValue: z.coerce.number().optional(),
// });

// export const CheckboxFieldSchema = BaseField.extend({
//     type: z.literal(FormFieldType.Checkbox),
//     defaultValue: z.boolean().optional(),
// });

// // --- File field (must have accept) ---
// export const FileFieldSchema = BaseField.extend({
//     type: z.literal(FormFieldType.File),
//     accept: z
//         .string()
//         .trim()
//         .min(1, { message: "Accept attribute is required for file fields" }),
// });

// // --- Select field (must have options; may have multiple) ---
// export const SelectFieldSchema = BaseField.extend({
//     type: z.literal(FormFieldType.Select),
//     options: z
//         .array(FormFieldOptionSchema)
//         .min(1, { message: "At least one option is required" }),
//     multiple: z.boolean().optional(),
//     defaultValue: z.string().optional(),
// });

// export const RadioFieldSchema = BaseField.extend({
//     type: z.literal(FormFieldType.Radio),
//     options: z
//         .array(FormFieldOptionSchema)
//         .min(1, { message: "At least one option is required" }),
//     defaultValue: z.string().optional(),
// });

// // --- Relation field (must have dataSource) ---
// export const RelationFieldSchema = BaseField.extend({
//     type: z.literal(FormFieldType.Relation),
//     dataSource: FormFieldDataSourcePropSchema,
//     defaultValue: z.string().optional(),
// });

// // --- Discriminated union of all field definitions ---
// export const FormFieldDefSchema = z.discriminatedUnion("type", [
//     TextFieldSchema,
//     EmailFieldSchema,
//     TelFieldSchema,
//     TextareaFieldSchema,
//     NumberFieldSchema,
//     CheckboxFieldSchema,
//     RadioFieldSchema,
//     FileFieldSchema,
//     SelectFieldSchema,
//     RelationFieldSchema,
// ]);

// export type TFormFieldDef = z.infer<typeof FormFieldDefSchema>;

// export const FormDtoSchema = z.object({
//     title: z
//         .string()
//         .trim()
//         .min(3, { message: "Title must be between 3 and 50 characters" })
//         .max(50, { message: "Title must be between 3 and 50 characters" }),
//     fields: z
//         .array(FormFieldDefSchema)
//         .min(1, { message: "At least one field is required" })
//         .max(50, { message: "Maximum 50 fields allowed" }),
//     submitBtnLabel: z
//         .string()
//         .trim()
//         .max(50, { message: "Submit button label must be between 3 and 50 characters" })
// });

// export const FormSubmissionSchema = z.object({
//     formId: z.string().uuid({ message: "formId must be a valid UUID" }),
//     responses: z.record(z.string(), z.any()), // Adjust depending on how you store responses
// });

// export type TFormSubmission = z.infer<typeof FormSubmissionSchema>;

// export type TFormDto = z.infer<typeof FormDtoSchema>;

// export type TForm = {
//     id: string;
//     slug: string;
//     createdAt: string;
//     updatedAt: string;
// } & TFormDto;

// export type TFormList = {
//     data: TForm[];
//     meta: TMeta;
// };

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
  Checkbox = 'checkbox',
  Radio = 'radio',
  Relation = 'relation'
}

export enum FormFieldDataSourceEntity {
  Job = 'job',
}


export type TFormFieldType = 
  | FormFieldType.Text 
  | FormFieldType.Email
  | FormFieldType.Tel
  | FormFieldType.Textarea
  | FormFieldType.Number
  | FormFieldType.File
  | FormFieldType.Select
  | FormFieldType.Checkbox
  | FormFieldType.Radio
  | FormFieldType.Relation;

const FieldValidationSchema = z.object({
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  pattern: z.string().optional(),
}).partial();

const FormFieldOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const DataSourceSchema = z.object({
  entity: z.nativeEnum(FormFieldDataSourceEntity),
  filter: z.string().optional(),
  multiple: z.boolean().optional(),
});

const BaseFieldSchema = z.object({
  type: z.nativeEnum(FormFieldType),
  name: z.string(),
  label: z.string(),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  order: z.number().optional(),
  validation: FieldValidationSchema.optional(),
});

export const TextFieldSchema = BaseFieldSchema.extend({
  type: z.literal(FormFieldType.Text),
});

export const FileFieldSchema = BaseFieldSchema.extend({
  type: z.literal(FormFieldType.File),
  accept: z.string(),
});

export const SelectFieldSchema = BaseFieldSchema.extend({
  type: z.literal(FormFieldType.Select),
  options: z.array(FormFieldOptionSchema),
  multiple: z.boolean().optional(),
});

export const RelationFieldSchema = BaseFieldSchema.extend({
  type: z.literal(FormFieldType.Relation),
  dataSource: DataSourceSchema,
  multiple: z.boolean().optional(),
});

export const FormFieldSchema = z.discriminatedUnion("type", [
  TextFieldSchema,
  FileFieldSchema,
  SelectFieldSchema,
  RelationFieldSchema,
]);

export const FormSchema = z.object({
  title: z.string(),
  fields: z.array(FormFieldSchema),
});

export type FormFieldComponents = {
  [key in FormFieldType]?: React.ComponentType<FormFieldComponentProps>;
};

export type TFormField = z.infer<typeof FormFieldSchema>;
export type TForm = z.infer<typeof FormSchema> & {
  id?: string;
  slug: string;
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