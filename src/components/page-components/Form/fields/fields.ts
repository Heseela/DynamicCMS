import { type FC } from "react"
import BaseField from "./base-field"
import FileField from "./file-field"
import SelectField from "./select-field"
import RelationField from "./relation-field"
import RadioField from "./radio-field"
import CheckboxField from "./checkbox-field"
import { FormFieldType } from "../../../../Models/form.model"

export type FormFieldComponentProps = {
    idx: number,
}

export const fields: Partial<Record<FormFieldType, FC<FormFieldComponentProps>>> = {
    [FormFieldType.Text]: BaseField,
    [FormFieldType.Email]: BaseField,
    [FormFieldType.Number]: BaseField,
    [FormFieldType.Textarea]: BaseField,
    [FormFieldType.Checkbox]: CheckboxField,
    [FormFieldType.Tel]: BaseField,
    [FormFieldType.File]: FileField,
    [FormFieldType.Select]: SelectField,
    [FormFieldType.Radio]: RadioField,
    [FormFieldType.Relation]: RelationField,
}