
import { z } from "zod";
import { FormFieldDataSourceEntity, FormFieldType } from "../form.model";


export const FieldValidationPropSchema = z.object({
  minLength: z.coerce.number().int({ message: "Must be an integer" }).min(0).optional(),
  maxLength: z.coerce.number().int({ message: "Must be an integer" }).min(0).optional(),
  pattern: z.string().optional().refine(val => {
    if (!val) return true;
    try { new RegExp(val); return true } 
    catch { return false }
  }, { message: "Invalid validation pattern" })
}).partial();

export const FormFieldOptionSchema = z.object({
  value: z.string().trim().min(1, "Value is required"),
  label: z.string().trim().min(1, "Label is required")
});

export const FormFieldDataSourcePropSchema = z.object({
  entity: z.nativeEnum(FormFieldDataSourceEntity),
  filter: z.string().optional(),
  multiple: z.boolean().optional()
});

const BaseField = z.object({
  name: z.string().trim()
    .min(3, "Name must be between 3 and 50 characters")
    .max(50, "Name must be between 3 and 50 characters")
    .regex(/^[A-Za-z0-9]+$/, "No white space, special characters allowed"),
  label: z.string().trim().max(50, "Max 50 characters allowed").optional(),
  placeholder: z.string().trim().max(50, "Max 50 characters allowed").optional(),
  required: z.boolean().optional(),
  validation: FieldValidationPropSchema.optional()
});

export type TBaseFormField = z.infer<typeof BaseField>;

export const TextFieldSchema = BaseField.extend({
    type: z.literal(FormFieldType.Text),
    defaultValue: z.string().optional(),
});
export const EmailFieldSchema = BaseField.extend({
    type: z.literal(FormFieldType.Email),
    defaultValue: z.string().email({ message: "Invalid email format" }).optional(),
});
export const TelFieldSchema = BaseField.extend({
    type: z.literal(FormFieldType.Tel),
    defaultValue: z.string().optional(),
});
export const TextareaFieldSchema = BaseField.extend({
    type: z.literal(FormFieldType.Textarea),
    defaultValue: z.string().optional(),
});
export const NumberFieldSchema = BaseField.extend({
    type: z.literal(FormFieldType.Number),
    defaultValue: z.coerce.number().optional(),
});

// export const CheckboxFieldSchema = BaseField.extend({
//     type: z.literal(FormFieldType.Checkbox),
//     defaultValue: z.boolean().optional(),
// });

// --- File field (must have accept) ---
export const FileFieldSchema = BaseField.extend({
    type: z.literal(FormFieldType.File),
    accept: z
        .string()
        .trim()
        .min(1, { message: "Accept attribute is required for file fields" }),
});

// --- Select field (must have options; may have multiple) ---
export const SelectFieldSchema = BaseField.extend({
    type: z.literal(FormFieldType.Select),
    options: z
        .array(FormFieldOptionSchema)
        .min(1, { message: "At least one option is required" }),
    multiple: z.boolean().optional(),
    defaultValue: z.string().optional(),
});

// export const RadioFieldSchema = BaseField.extend({
//     type: z.literal(FormFieldType.Radio),
//     options: z
//         .array(FormFieldOptionSchema)
//         .min(1, { message: "At least one option is required" }),
//     defaultValue: z.string().optional(),
// });

// --- Relation field (must have dataSource) ---
export const RelationFieldSchema = BaseField.extend({
    type: z.literal(FormFieldType.Relation),
    dataSource: FormFieldDataSourcePropSchema,
    defaultValue: z.string().optional(),
});

// --- Discriminated union of all field definitions ---
export const FormFieldDefSchema = z.discriminatedUnion("type", [
    TextFieldSchema,
    EmailFieldSchema,
    TelFieldSchema,
    TextareaFieldSchema,
    NumberFieldSchema,
    FileFieldSchema,
    SelectFieldSchema,
    RelationFieldSchema,
]);

export type TFormFieldDef = z.infer<typeof FormFieldDefSchema>;
