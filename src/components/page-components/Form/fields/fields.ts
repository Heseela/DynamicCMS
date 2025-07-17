import { type FC } from "react"
import BaseField from "./base-field"
import FileField from "./file-field"
import SelectField from "./select-field"
import RelationField from "./relation-field"
import { FormFieldType } from "../../../../Models/form.model"

export type FormFieldComponentProps = {
    idx: number,
}

export const fields: { [key in FormFieldType]: FC<FormFieldComponentProps> } = {
    [FormFieldType.Text]: BaseField,
    [FormFieldType.Email]: BaseField,
    [FormFieldType.Number]: BaseField,
    [FormFieldType.Textarea]: BaseField,
    [FormFieldType.Tel]: BaseField,
    [FormFieldType.File]: FileField,
    [FormFieldType.Select]: SelectField,
    [FormFieldType.Relation]: RelationField,
};