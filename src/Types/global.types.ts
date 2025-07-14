// export type TInputType = "text" | "date" | "number" | "textarea" | "password" | "tel" | 'url' | 'email';

// export type TSelectOptionType =
//     | "select"
//     | "checkbox"
//     | "radio"
//     | "multi-select"
//     | "multi-select-ant";

// export type TImageType = "image";

// type BaseFormFieldWithStringName<T extends Record<string, any>> = {
//     label?: string;
//     placeholder?: string;
//     name: keyof T & string; 
//     required?: boolean;
//     disabled?: boolean;
//     className?: string;
//   };

// type BaseFormField<T> = {
//     label?: string;
//     placeholder?: string;
//     name: keyof T;
//     required?: boolean;
//     disabled?: boolean;
//     className?: string;
//     description?: string;
//     errorMessage?: string;
//     defaultValue?: unknown;
// };

// type SelectFormField<T> = BaseFormField<T> & {
//     type: TSelectOptionType;
//     allowMultiple?: boolean;
//     options: {
//         value: string;
//         label: string;
//         disabled?: boolean;
//     }[];
//     isSearchable?: boolean;
//     closeMenuOnSelect?: boolean;
// };

// type InputFormField<T> = BaseFormField<T> & {
//     type: TInputType;
//     min?: number;
//     max?: number;
//     step?: number;
//     pattern?: string;
//     autoComplete?: string;
//     rows?: number;
//     onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// };

// type FileFormField<T> = BaseFormField<T> & {
//     type: "file";
//     accept?: string;
//     multiple?: boolean;
//     maxCount?: number;
//     maxSize?: number;
// };

// type ImageFormField<T extends Record<string, any>> = BaseFormFieldWithStringName<T> & {
//   type: "image";
//   accept?: string;
//   multiple?: boolean;
//   maxCount?: number;
//   maxSize?: number;
//   imageOptions?: { width?: number; quality?: number };
// };

// export type TFormField<T> = 
//     | SelectFormField<T> 
//     | InputFormField<T> 
//     | FileFormField<T>
//     | ImageFormField<T>; 

// export function isSelectField<T>(field: TFormField<T>): field is SelectFormField<T> {
//     return [
//         "select", 
//         "checkbox", 
//         "radio", 
//         "multi-select", 
//         "multi-select-ant"
//     ].includes(field.type);
// }

// export function isImageField<T>(field: TFormField<T>): field is ImageFormField<T> {
//     return field.type === "image";
// }

// export type TMeta = {
//     page: number;
//     take: number;
//     itemCount: number;
//     pageCount: number;
//     hasPreviousPage: boolean;
//     hasNextPage: boolean;
// };



export type TInputType = "text" | "date" | "number" | "textarea" | "password" | "tel" | 'url' | 'email';

export type TSelectOptionType =
    | "select"
    | "checkbox"
    | "radio"
    | "multi-select"
    | "multi-select-ant";

export type TImageType = "image";

type BaseFormField<T extends Record<string, any>> = {
    label?: string;
    placeholder?: string;
    name: keyof T & string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    description?: string;
    errorMessage?: string;
    defaultValue?: unknown;
};

type SelectFormField<T extends Record<string, any>> = BaseFormField<T> & {
    type: TSelectOptionType;
    allowMultiple?: boolean;
    options: {
        value: string;
        label: string;
        disabled?: boolean;
    }[];
    isSearchable?: boolean;
    closeMenuOnSelect?: boolean;
};

type InputFormField<T extends Record<string, any>> = BaseFormField<T> & {
    type: TInputType;
    min?: number;
    max?: number;
    step?: number;
    pattern?: string;
    autoComplete?: string;
    rows?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type FileFormField<T extends Record<string, any>> = BaseFormField<T> & {
    type: "file";
    accept?: string;
    multiple?: boolean;
    maxCount?: number;
    maxSize?: number;
};

type ImageFormField<T extends Record<string, any>> = BaseFormField<T> & {
    type: "image";
    accept?: string;
    multiple?: boolean;
    maxCount?: number;
    maxSize?: number;
    imageOptions?: { width?: number; quality?: number };
};

export type TFormField<T extends Record<string, any>> = 
    | SelectFormField<T> 
    | InputFormField<T> 
    | FileFormField<T>
    | ImageFormField<T>;

export function isSelectField<T extends Record<string, any>>(
    field: TFormField<T>
): field is SelectFormField<T> {
    return [
        "select", 
        "checkbox", 
        "radio", 
        "multi-select", 
        "multi-select-ant"
    ].includes(field.type);
}

export function isImageField<T extends Record<string, any>>(
    field: TFormField<T>
): field is ImageFormField<T> {
    return field.type === "image";
}

export type TMeta = {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
};

export type TDataSearchParams = {
    page?: string;
    pageSize?: string;
    q?: string
}


export type SelectOption = {
    label: string;
    value: string;
}

export type TPaginatedOptions = {
    data: SelectOption[];
    meta: TMeta
}

export enum EAlignment {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

export enum EAlignmentExcludeCenter {
    Left = 'left',
    Right = 'right'
}

export enum ELinkType {
    External = "external",
    Internal = "internal",
}

export enum ERefRelation {
    Pages = "pages",
    Blogs = "blogs",
}

export enum EOrder {
    Asc = "ASC",
    Desc = "DESC",
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: TMeta;
}