import React, { useMemo, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useInternalLinks } from './internal-links';
import type { SelectOption } from '../../../../../Types/global.types';
import { cn, createQueryString } from '../../../../../lib/utils';
import { FormControl, FormItem, FormLabel, FormMessage } from '../../../../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../../../../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../../../ui/command';
import { Button } from '../../../../ui/button';

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
                            <span className='truncate font-normal'>{selectedValue?.label ?? 'Select a value...'}</span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="!min-w-full p-0 bg-white">
                        <Command shouldFilter={false}>
                            <CommandInput className='outline-none' placeholder={"Select a value"} onValueChange={val => setSearch(val)} />
                            <CommandEmpty>No results found.</CommandEmpty>
                            {isLoading && <CommandEmpty>Loading...</CommandEmpty>}
                            <CommandGroup>
                                <CommandList>
                                    {data.map((group) => {
                                        return !!group.options?.data?.length && (
                                            <CommandGroup className='capitalize' heading={group.label} key={group.label}>
                                                {group.options?.data.map((option) => {
                                                    return (
                                                        <CommandItem
                                                            key={option.value}
                                                            value={group.label === 'pages' ? `/${option.value}` : `/${group.label}/${option.value}`}
                                                            onSelect={(currentValue) => {
                                                                onChange(currentValue)
                                                                setSelectedValue(option)
                                                                setOpen(false)
                                                            }}
                                                            className='justify-between'
                                                        >
                                                            <div className='truncate'>
                                                                {option.label}
                                                            </div>

                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    selectedValue?.value === option.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    )
                                                })}
                                            </CommandGroup>
                                        )
                                    })}
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

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}