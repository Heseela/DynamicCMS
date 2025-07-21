import React, { useState } from 'react';
import type { THeroSectionDto } from '../../../../Models/hero.model';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../../ui/dialog';
import { heroLayouts } from '../../../../lib/layouts/hero-layouts';

type Props = {
    onSelect: (layout: THeroSectionDto["layout"]) => void,
    length: number,
    children: React.ReactNode
}

export default function AddHeroSectionDialog({ onSelect, length, children }: Props) {
    const [selectorOpen, setSelectorOpen] = useState(false);

    function handleAdd(layout: THeroSectionDto["layout"]) {
        if (length >= 5) return;
        onSelect(layout);
        setSelectorOpen(false);
    }

    return (
        <Dialog open={selectorOpen} onOpenChange={setSelectorOpen}>
            <DialogTrigger asChild>
                {length < 5 && children}
            </DialogTrigger>
            <DialogContent className='full-screen-dialog block'>
                <DialogHeader>
                    <DialogTitle>
                        <span id="dialog-title">Add Hero</span>
                    </DialogTitle>
                </DialogHeader>
                <div className='pt-10 grid grid-cols-3 gap-6'>
                    {heroLayouts.map((layout, index) => (
                        <div
                            key={index}
                            role='button'
                            className='border rounded-md p-4 space-y-2 hover:ring-1 hover:ring-offset-2 transition-all cursor-pointer'
                            onClick={() => handleAdd(layout.layout)}
                            tabIndex={0}
                        >
                            <p className='text-sm font-meedium text-center mt-2'>{layout.alt}</p>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}