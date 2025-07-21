import { useState } from "react";
import type { TBlock } from "../../../../Models/page.model";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../ui/dialog";
import { blockLayouts } from "../../../../lib/layouts/block-layouts";


type Props = {
    onSelect: (block: TBlock) => void,
    length: number,
    children: React.ReactNode
}

export default function AddBlockDialog({ onSelect, length, children }: Props) {
    const [selectorOpen, setSelectorOpen] = useState(false);

    function handleAdd(block: TBlock) {
        if (length >= 5) return;
        onSelect(block);
        setSelectorOpen(false);
    }

    return (
        <Dialog open={selectorOpen} onOpenChange={setSelectorOpen}>
            <DialogTrigger asChild>
                {
                    length < 5 && children
                }
            </DialogTrigger>
            <DialogContent className='full-screen-dialog block'>
                <DialogHeader>
                    <DialogTitle>
                        <span id="dialog-title">Add Block</span>
                    </DialogTitle>
                </DialogHeader>
                <div className='pt-10 grid grid-cols-3 gap-6'>
                    {blockLayouts.map((l, ind) => (
                        <div
                            key={ind}
                            role='button'
                            className='border rounded-md p-4 space-y-2 hover:ring-1 hover:ring-offset-2 transition-all cursor-pointer'
                            onClick={() => handleAdd(l.block)}
                        >
                            <p className='text-sm text-center'>{l.alt}</p>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}