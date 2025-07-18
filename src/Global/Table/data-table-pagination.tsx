import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {type Table } from "@tanstack/react-table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";

import { useSearchParams } from "react-router-dom";
import type { TMeta } from "../../Types/global.types";
import { Button } from "../../components/ui/button";

interface DataTablePaginationProps<TData> {
    table?: Table<TData>;
    meta: TMeta;
}

export function DataTablePagination<TData>({
    meta,
}: DataTablePaginationProps<TData>) {

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className="flex items-center justify-between px-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                Total: {meta.itemCount} Records
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${meta.take}`}
                        onValueChange={(value) => {
                            if (value) {
                                searchParams.set("take", value);
                                setSearchParams(searchParams);
                            } else {
                                searchParams.delete("take");
                                setSearchParams(searchParams);
                            }
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={meta.take} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {meta.page} of {meta.pageCount}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => {
                            searchParams.set("page", "1");
                            setSearchParams(searchParams);
                        }}
                        disabled={!meta.hasPreviousPage}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            searchParams.set("page", `${meta.page - 1}`);
                            setSearchParams(searchParams);
                        }}
                        disabled={!meta.hasPreviousPage}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            searchParams.set("page", `${meta.page + 1}`);
                            setSearchParams(searchParams);
                        }}
                        disabled={!meta.hasNextPage}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => {
                            searchParams.set("page", `${meta.pageCount}`);
                            setSearchParams(searchParams);
                        }}
                        disabled={!meta.hasNextPage}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
