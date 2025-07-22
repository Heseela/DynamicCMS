import { type FieldValues, type Path } from "react-hook-form";
import { EAlignment, EAlignmentExcludeCenter } from "../../../../../Types/global.types";
import SelectField from "../../../../form-component/select-form-field";

type Props<T> = {
    name: Path<T>;
    label?: string;
    placeholder?: string;
    required?: boolean;
    excludeCenter?: boolean;
};

export default function AlignmentSelect<T extends FieldValues>({
    name,
    label = "Alignment",
    placeholder = "Select an option",
    required = false,
    excludeCenter = false,
}: Props<T>) {
    const options = Object.entries(excludeCenter ? EAlignmentExcludeCenter : EAlignment)
        .map(([key, value]) => ({
            value,
            label: key,
        }));

    return (
        <SelectField
            formField={{
                name,
                label,
                options,
                placeholder,
                required,
            }}
        />
    );
}