import jumboCenter from "@/assets/layouts/hero-layout/jumbotron-center.svg"
import { type TBaseFormField, type TFormFieldDef } from "../../Models/forms"
import { FormFieldDataSourceEntity, FormFieldType } from "../../Models/form.model"

const baseField: TBaseFormField = {
    name: "",
    label: "",
    required: false,
    placeholder: "",
    validation: undefined,

}

export const formFieldsLayout: {
    field: TFormFieldDef,
    image: string,
    alt: string
}[] = [
        {
            field: {
                type: FormFieldType.Text,
                defaultValue: "",
                ...baseField
            },
            alt: "Text",
            image: jumboCenter,
        },
        {
            field: {
                type: FormFieldType.Email,
                defaultValue: "",
                ...baseField
            },
            alt: "Email",
            image: jumboCenter
        },
        {
            field: {
                type: FormFieldType.Number,
                defaultValue: undefined,
                ...baseField
            },
            alt: "Number",
            image: jumboCenter
        },
        {
            field: {
                type: FormFieldType.Tel,
                defaultValue: "",
                ...baseField
            },
            alt: "Tel",
            image: jumboCenter
        },
        {
            field: {
                type: FormFieldType.Textarea,
                defaultValue: "",
                ...baseField
            },
            alt: "Text Area",
            image: jumboCenter
        },
        {
            field: {
                type: FormFieldType.Checkbox,
                defaultValue: false,
                ...baseField
            },
            alt: "Checkbox",
            image: jumboCenter
        },
        {
            field: {
                type: FormFieldType.File,
                accept: "",
                ...baseField,
            },
            alt: "File",
            image: jumboCenter
        },
        {
            field: {
                type: FormFieldType.Select,
                options: [],
                multiple: false,
                ...baseField
            },
            alt: "Select",
            image: jumboCenter
        },
        {
            field: {
                type: FormFieldType.Radio,
                options: [],
                ...baseField
            },
            alt: "Radio",
            image: jumboCenter
        },
        {
            field: {
                type: FormFieldType.Relation,
                dataSource: {
                    entity: FormFieldDataSourceEntity.Course,
                    filter: "",
                    multiple: false
                },
                ...baseField
            },
            alt: "Relation",
            image: jumboCenter
        },
    ]