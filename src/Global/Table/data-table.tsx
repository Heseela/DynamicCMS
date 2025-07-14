import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";



import {
   type Key,
   type ReactElement,
   type JSXElementConstructor,
   type ReactNode,
   type ReactPortal,
   type ComponentType,
} from "react"

import { DataTablePagination } from "./data-table-pagination";
import type { TMeta } from "../../Types/global.types";
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: any[];
    meta?: TMeta;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    meta,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="">
            <div className="rounded-md border shadow-sm">
                <Table className="w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table
                                .getRowModel()
                                .rows.map(
                                    (row: {
                                        id: string;
                                        original: any;
                                        getIsSelected: any;
                                        getVisibleCells: any;
                                    }) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map(
                                                (cell: {
                                                    id: Key | null | undefined;
                                                    column: {
                                                        columnDef: {
                                                            cell:
                                                            | string
                                                            | number
                                                            | boolean
                                                            | ReactElement<
                                                                any,
                                                                string | JSXElementConstructor<any>
                                                            >
                                                            | Iterable<ReactNode>
                                                            | ReactPortal
                                                            | ComponentType<any>
                                                            | null
                                                            | undefined;
                                                        };
                                                    };
                                                    getContext: () => any;
                                                }) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                )
                                            )}
                                        </TableRow>
                                    )
                                )
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {meta && <DataTablePagination meta={meta} table={table} />}
        </div>
    );
}
