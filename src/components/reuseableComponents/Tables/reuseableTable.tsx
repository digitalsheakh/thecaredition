// components/shared/DataTable.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => string | number | React.ReactNode);
  render?: (item: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  isLoading: boolean;
  error?: string;
  emptyMessage?: string | React.ReactNode;
  skeletonCount?: number;
};

export function DataTable<T extends { _id?: string }>({
  columns,
  data,
  isLoading,
  error,
  emptyMessage = "No data found",
  skeletonCount = 5,
}: DataTableProps<T>) {
  return (
  <div className="space-y-4">
  {error && (
    <div className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded mb-4 font-medium">
      {error}
    </div>
  )}

  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
    <Table className="w-full">
      <TableHeader>
        <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-300">
          {columns.map((col) => (
            <TableHead 
              key={String(col.accessor)} 
              className={`${col.headerClassName || "text-left"} px-6 py-5 text-sm font-bold text-gray-900 uppercase tracking-wider font-orbitron border-r border-gray-200 last:border-r-0`}
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white divide-y divide-gray-200">
        {isLoading ? (
          [...Array(skeletonCount)].map((_, i) => (
            <TableRow key={`skeleton-${i}`} className="hover:bg-gray-50 transition-all duration-300 ease-in-out">
              {columns.map((col, colIdx) => (
                <TableCell key={`skeleton-col-${colIdx}`} className="px-6 py-5 border-r border-gray-100 last:border-r-0">
                  <Skeleton className="h-8 w-full bg-gray-200 rounded-md" />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : data.length === 0 ? (
          <TableRow>
            <TableCell 
              colSpan={columns.length} 
              className="text-center py-16 text-gray-500 font-rajdhani text-lg bg-gray-50"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 font-orbitron mb-1">No Data Found</h3>
                  <p className="text-gray-600 font-rajdhani">{emptyMessage}</p>
                </div>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, rowIdx) => (
            <TableRow key={row._id || rowIdx} className="hover:bg-gray-50 transition-all duration-300 ease-in-out group border-b border-gray-100 last:border-b-0">
              {columns.map((col) => (
                <TableCell 
                  key={`${row._id || rowIdx}-${String(col.accessor)}`}
                  className={`${col.className || ""} px-6 py-4 align-top border-r border-gray-100 last:border-r-0 group-hover:border-gray-200 transition-colors duration-300`}
                >
                  {col.render 
                    ? col.render(row)
                    : typeof col.accessor === "function"
                    ? col.accessor(row)
                    : (row[col.accessor as keyof T] as React.ReactNode) ?? "-"}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
</div>
  );
}

// Example usage with actions dropdown:
export function ActionsDropdown<T>({
  items,
}: {
  items: {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
    destructive?: boolean;
  }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <Link href={item.href} passHref legacyBehavior>
                <DropdownMenuItem 
                  className={item.className}
                  onClick={item.onClick}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </DropdownMenuItem>
              </Link>
            ) : (
              <DropdownMenuItem
                className={item.destructive ? "text-orange-600 focus:text-orange-600" : item.className}
                onClick={item.onClick}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </DropdownMenuItem>
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}