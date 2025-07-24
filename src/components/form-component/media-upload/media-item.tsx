// import { Trash } from "lucide-react"
// import type { TMediaSchema } from "../../../Models/media.model"
// import { Button } from "../../ui/button"

// type Props = {
//     media: TMediaSchema,
//     onRemove: () => void
// }

// export default function MediaItem({ media, onRemove }: Props) {
//     return (
//         <div className="flex items-center justify-between gap-6">
//             <img
//                 src={media.url}
//                 height={100}
//                 width={100}
//                 className="h-10 w-auto"
//             />



//             <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 onClick={onRemove}
//                 className="text-red-500 hover:text-red-600 hover:bg-red-50"
//             >
//                 <Trash className="w-4 h-4" />
//             </Button>

//         </div>
//     )
// }


import { Trash } from "lucide-react";
import type { TMediaSchema } from "../../../Models/media.model";
import { Button } from "../../ui/button";

type Props = {
    media: TMediaSchema;
    onRemove: () => void;
};

export default function MediaItem({ media, onRemove }: Props) {
    return (
        <div className="relative group rounded-md overflow-hidden border w-24 h-24">
            <img
                src={media.url}
                alt={media.originalName}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                    type="button"
                    variant={"destructive"}
                    size={'icon'}
                    onClick={onRemove}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                >
                    <Trash className="h-4 w-4 text-white" />
                </Button>
            </div>
        </div>
    );
}