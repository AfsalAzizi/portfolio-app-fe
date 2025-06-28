import React, { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';

const DataTable = ({
                       data = [],
                       columns = [],
                       // Pagination props
                       pageSize: defaultPageSize = 10,
                       pageSizeOptions = [10, 20, 50],
                       onPageChange,
                       onPageSizeChange,
                       // Server-side pagination props
                       pageCount,
                       currentPage = 0,
                       totalItems,
                       // Other props
                       loading = false,
                       onSort,
                       className = '',
                       enableSorting = true,
                       enablePagination = true,
                       manualPagination = true, // true for server-side pagination
                       manualSorting = true, // true for server-side sorting
                   }) => {
    // Internal state for sorting
    const [sorting, setSorting] = useState([]);

    // Table instance
    const table = useReactTable({
        data,
        columns,
        // Core
        getCoreRowModel: getCoreRowModel(),
        // Pagination
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        pageCount: pageCount || Math.ceil(totalItems / defaultPageSize),
        manualPagination,
        // Sorting
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
        onSortingChange: (updater) => {
            setSorting(updater);
            // Call parent's onSort if provided
            if (onSort && typeof updater === 'function') {
                const newSorting = updater(sorting);
                if (newSorting.length > 0) {
                    onSort(newSorting[0].id, newSorting[0].desc ? 'desc' : 'asc');
                } else {
                    onSort(null, null);
                }
            }
        },
        manualSorting,
        state: {
            sorting,
            pagination: {
                pageIndex: currentPage,
                pageSize: defaultPageSize,
            },
        },
        // Controlled pagination
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                const newState = updater({
                    pageIndex: currentPage,
                    pageSize: defaultPageSize,
                });

                if (newState.pageIndex !== currentPage && onPageChange) {
                    onPageChange(newState.pageIndex);
                }

                if (newState.pageSize !== defaultPageSize && onPageSizeChange) {
                    onPageSizeChange(newState.pageSize);
                    // Reset to first page when changing page size
                    if (onPageChange) {
                        onPageChange(0);
                    }
                }
            }
        },
    });

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    // Empty state
    if (!data || data.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <p className="text-gray-500">No data available</p>
            </div>
        );
    }

    return (
        <div className={`${className}`}>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                                        header.column.getCanSort() ? 'cursor-pointer select-none hover:bg-gray-100' : ''
                                    }`}
                                >
                                    <div className="flex items-center space-x-1">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        {header.column.getCanSort() && (
                                            <span className="text-gray-400">
                          {header.column.getIsSorted() === 'asc' ? '↑' : ''}
                                                {header.column.getIsSorted() === 'desc' ? '↓' : ''}
                                                {!header.column.getIsSorted() ? '↕' : ''}
                        </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {enablePagination && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    {/* Mobile view */}
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>

                    {/* Desktop view */}
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="text-sm text-gray-700">
                            Showing{' '}
                            <span className="font-medium">
                {currentPage * defaultPageSize + 1}
              </span>{' '}
                            to{' '}
                            <span className="font-medium">
                {Math.min((currentPage + 1) * defaultPageSize, totalItems)}
              </span>{' '}
                            of <span className="font-medium">{totalItems}</span> results
                        </div>

                        <div className="flex items-center space-x-6">
                            {/* Page size selector */}
                            <div className="flex items-center space-x-2">
                                <label className="text-sm text-gray-700">Show</label>
                                <select
                                    value={defaultPageSize}
                                    onChange={e => {
                                        const newSize = Number(e.target.value);
                                        table.setPageSize(newSize);
                                    }}
                                    className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    {pageSizeOptions.map(size => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                                <span className="text-sm text-gray-700">entries</span>
                            </div>

                            {/* Page navigation */}
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <button
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">First</span>
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M7.707 5.293a1 1 0 010 1.414L4.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  Page {currentPage + 1} of {table.getPageCount()}
                </span>

                                <button
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    disabled={!table.getCanNextPage()}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Last</span>
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M12.293 14.707a1 1 0 010-1.414L13.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;