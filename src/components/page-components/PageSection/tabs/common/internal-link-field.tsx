import { useMemo, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useInternalLinks } from './internal-links';
import { cn, createQueryString } from '../../../../../lib/utils';
import { FormControl, FormItem, FormLabel, FormMessage } from '../../../../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../../../../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../../../ui/command';
import { Button } from '../../../../ui/button';
import { useDebounce } from '../../../../../hooks/useDebounce';
import type { SelectOption } from '../../../../../Types/global.types';



type Props = {
    onChange: (value: string) => void
    selected?: SelectOption
}

export function InternalLinkField({
    onChange,
    selected
}: Props) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState<string>('');

    const debouncedValue = useDebounce(search, 500);

    const [selectedValue, setSelectedValue] = useState<Props["selected"]>(selected);

    const queryString = useMemo(() => createQueryString({ q: debouncedValue, pageSize: "20" }), [debouncedValue]);

    const { isLoading, data } = useInternalLinks(queryString);

    return (
        <FormItem>
            <FormLabel>Document to link to <span className='text-red-500'>*</span></FormLabel>

            <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className="hover:bg-secondary/20">
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between overflow-hidden disabled:!cursor-not-allowed disabled:pointer-events-auto"
                        >
                            <span className='truncate font-normal'>
                                {selectedValue?.label ?? 'Select a document...'}
                            </span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="!min-w-full p-0 bg-white">
                        <Command shouldFilter={false}>
                            <CommandInput 
                                placeholder="Search pages and blogs..." 
                                onValueChange={setSearch}
                                className='outline-none' 
                            />
                            <CommandEmpty>
                                {isLoading ? "Loading..." : "No documents found."}
                            </CommandEmpty>
                            <CommandGroup>
                                <CommandList>
                                    {data.map((group) => (
                                        <CommandGroup 
                                            className='capitalize ' 
                                            heading={group.label} 
                                            key={group.label}
                                        >
                                            {group.options.map((option) => (
                                                <CommandItem
                                                    key={option.value}
                                                    value={option.value}
                                                    onSelect={(currentValue) => {
                                                        const path = group.label === 'pages' 
                                                            ? `/${option.value}` 
                                                            : `/blog/${option.value}`;
                                                        
                                                        onChange(path);
                                                        setSelectedValue(option);
                                                        setOpen(false);
                                                    }}
                                                    className='justify-between'
                                                >
                                                    <div className='truncate '>
                                                        {option.label}
                                                    </div>
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedValue?.value === option.value 
                                                                ? "opacity-100" 
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    ))}
                                </CommandList>
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </FormControl>
            <FormMessage />
        </FormItem>
    );
}