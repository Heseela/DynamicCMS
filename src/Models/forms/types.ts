import type { TForm } from ".";
import type { TMeta } from "../../Types/global.types";

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
  Blogs = 'blogs',
  Pages = 'pages'
}

export type TFormList = {
  data: TForm[];
  meta: TMeta;
};