// import { useFormContext, Controller } from "react-hook-form";
// import { cn } from "../../lib/utils";

// type CheckboxFieldProps = {
//   formField: {
//     name: string;
//     label: string;
//     description?: string;
//     disabled?: boolean;
//     className?: string;
//   };
// };

// export const CheckboxField = ({ formField }: CheckboxFieldProps) => {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={formField.name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <div className={cn("space-y-2", formField.className)}>
//           <div className="flex items-center gap-3">
//             <input
//               type="checkbox"
//               id={formField.name}
//               checked={field.value}
//               onChange={(e) => field.onChange(e.target.checked)}
//               onBlur={field.onBlur}
//               disabled={formField.disabled}
//               className={cn(
//                 "h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500",
//                 {
//                   "border-red-500": error,
//                   "opacity-50 cursor-not-allowed": formField.disabled,
//                 }
//               )}
//             />
//             <label
//               htmlFor={formField.name}
//               className="block text-sm font-medium text-gray-700"
//             >
//               {formField.label}
//             </label>
//           </div>

//           {formField.description && (
//             <p className="text-xs text-gray-500">{formField.description}</p>
//           )}

//           {error && (
//             <p className="text-xs text-red-500 mt-1">{error.message}</p>
//           )}
//         </div>
//       )}
//     />
//   );
// };


import { cn } from "../../lib/utils";

export const Checkbox = ({
  checked,
  onCheckedChange,
  disabled,
  className,
  label,
  description
}: {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  description?: string;
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          disabled={disabled}
          className={cn(
            "h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500",
            {
              "border-red-500": false,
              "opacity-50 cursor-not-allowed": disabled,
            }
          )}
        />
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
      </div>
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
};