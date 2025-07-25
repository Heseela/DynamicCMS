import * as React from "react";
import { ChevronsUpDown, Loader2, AlertCircle, RefreshCw, Check } from "lucide-react";
import { Button } from "../ui/button";
import type { SelectOption } from "../../Types/global.types";
import { useDebounce } from "../../hooks/useDebounce";
import { useInfiniteOptions } from "../../hooks/useInfiniteOptions";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Alert, AlertDescription } from "../ui/alert";

interface InfiniteSelectProps {
  endpoint: string;
  placeholder?: string;
  selected?: SelectOption;
  onSelectionChange?: (values: SelectOption) => void;
  className?: string;
  limit?: number;
}

export function InfiniteSelect({
  endpoint,
  placeholder = "Select options...",
  selected = undefined,
  onSelectionChange,
  className,
  limit = 10,
}: InfiniteSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const debouncedSearch = useDebounce(search, 500);

  const createQueryString = (params: Record<string, string>) => {
    return new URLSearchParams(params).toString();
  };

  const { 
    options, 
    totalCount, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isLoading, 
    isFetching, 
    isFetchingNextPage, 
    refetch 
  } = useInfiniteOptions(
    endpoint, 
    createQueryString({
      pageSize: limit.toString(),
      q: debouncedSearch
    })
  );

  const observerRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const handleSelect = React.useCallback(
    (option: SelectOption) => {
      onSelectionChange?.(option);
      setOpen(false);
    },
    [onSelectionChange]
  );

  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (
        scrollHeight - scrollTop - clientHeight < 20 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  return (
      <div className={`w-full ${className}`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-h-10 h-auto bg-white" 
          >
            <div className="flex flex-wrap gap-1 flex-1 overflow-hidden">
              {!selected?.label ? (
                <span className="text-muted-foreground truncate">{placeholder}</span>
              ) : (
                <span className="truncate">{selected.label}</span>
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-full bg-white p-0" 
          align="start"
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <Command shouldFilter={false} className="w-full">
            <CommandInput
              placeholder="Search options..." 
              value={search} 
              onValueChange={setSearch} 
              className="outline-none "
            />
            <CommandList
              ref={listRef} 
              onScroll={handleScroll} 
              className="max-h-64 overflow-y-auto w-full"
            >
              {error ? (
                <Alert className="m-2 border-none">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm flex items-center justify-between">
                    <span>{error.message}</span>
                    <Button variant="ghost" size="sm" onClick={() => refetch()}>
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  {options.length === 0 && !isLoading && !isFetching ? (
                    <CommandEmpty>
                      {debouncedSearch 
                        ? `No options found for "${debouncedSearch}"` 
                        : "No options found."}
                    </CommandEmpty>
                  ) : (
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={() => handleSelect(option)}
                          className="cursor-pointer px-3 flex items-center justify-between"
                        >
                          <span className="truncate">{option.label}</span>
                          <Check
                            className={
                              selected?.value === option.value 
                                ? "mr-2 h-4 w-4 opacity-100" 
                                : "mr-2 h-4 w-4 opacity-0"
                            }
                          />
                        </CommandItem>
                      ))}

                      {hasNextPage && <div ref={observerRef} className="h-4" />}

                      {(isLoading || isFetchingNextPage) && (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="ml-2 text-sm text-muted-foreground">
                            {isLoading ? "Loading..." : "Loading more..."}
                          </span>
                        </div>
                      )}

                      {options.length > 0 && !hasNextPage && (
                        <div className="p-2 text-xs text-muted-foreground text-center border-t">
                          Showing {options.length} of {totalCount} options
                        </div>
                      )}
                    </CommandGroup>
                  )}
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}