import { useState } from "react";
import type { TFormFieldDef } from "../../../Models/form.model";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { formFieldsLayout } from "../../../lib/layouts/form-fields-layout";

type Props = {
    onSelect: (field: TFormFieldDef) => void,
    children: React.ReactNode
}

export default function AddFormFieldDialog({ onSelect, children }: Props) {
    const [selectorOpen, setSelectorOpen] = useState(false);

    function handleAdd(field: TFormFieldDef) {
        onSelect(field);
        setSelectorOpen(false);
    }

    return (
        <Dialog open={selectorOpen} onOpenChange={setSelectorOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className='full-screen-dialog block'>
                <DialogHeader>
                    <DialogTitle>
                        <span id="dialog-title">Add Form Field</span>
                    </DialogTitle>
                </DialogHeader>
                <section className='pt-10 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-6'>
                    {formFieldsLayout.map((l, ind) => (
                        <section
                            key={ind}
                            role='button'
                            className='border rounded-md p-4 space-y-2 hover:ring-1 hover:ring-offset-2 transition-all cursor-pointer'
                            onClick={() => handleAdd(l.field)}
                        >
                            <img
                                src={l.image}
                                alt={l.alt}
                                className='w-full h-auto rounded-md'
                            />
                            <p className='text-sm text-center'>{l.alt}</p>
                        </section>
                    ))}
                </section>
            </DialogContent>
        </Dialog>
    )
}