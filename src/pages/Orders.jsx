import React, {useState} from "react";
import DataTable from "../components/DataTable.jsx"; // Adjust path as needed

const Orders = () => {
    // Test data - same as your template
    const [orders] = useState([
        {
            id: "ORD-001",
            symbol: "AAPL",
            type: "BUY",
            shares: 10,
            price: 150.25,
            status: "Filled",
            date: "2024-01-15 10:30 AM",
            total: 1502.5,
        },
        {
            id: "ORD-002",
            symbol: "GOOGL",
            type: "SELL",
            shares: 5,
            price: 2850.0,
            status: "Filled",
            date: "2024-01-14 02:15 PM",
            total: 14250.0,
        },
        {
            id: "ORD-003",
            symbol: "TSLA",
            type: "BUY",
            shares: 15,
            price: 235.8,
            status: "Pending",
            date: "2024-01-15 09:45 AM",
            total: 3537.0,
        },
        {
            id: "ORD-004",
            symbol: "MSFT",
            type: "SELL",
            shares: 20,
            price: 275.75,
            status: "Cancelled",
            date: "2024-01-13 11:20 AM",
            total: 5515.0,
        },
        {
            id: "ORD-005",
            symbol: "AMZN",
            type: "BUY",
            shares: 8,
            price: 145.6,
            status: "Pending",
            date: "2024-01-15 08:30 AM",
            total: 1164.8,
        },
        // Add more test data for pagination
        {
            id: "ORD-006",
            symbol: "NFLX",
            type: "BUY",
            shares: 12,
            price: 489.5,
            status: "Filled",
            date: "2024-01-12 03:20 PM",
            total: 5874.0,
        },
        {
            id: "ORD-007",
            symbol: "META",
            type: "SELL",
            shares: 7,
            price: 355.12,
            status: "Filled",
            date: "2024-01-12 11:45 AM",
            total: 2485.84,
        },
        {
            id: "ORD-008",
            symbol: "NVDA",
            type: "BUY",
            shares: 3,
            price: 522.35,
            status: "Pending",
            date: "2024-01-11 09:30 AM",
            total: 1567.05,
        },
        {
            id: "ORD-009",
            symbol: "JPM",
            type: "BUY",
            shares: 25,
            price: 170.88,
            status: "Filled",
            date: "2024-01-11 02:10 PM",
            total: 4272.0,
        },
        {
            id: "ORD-010",
            symbol: "V",
            type: "SELL",
            shares: 15,
            price: 260.75,
            status: "Cancelled",
            date: "2024-01-10 10:15 AM",
            total: 3911.25,
        },
        {
            id: "ORD-011",
            symbol: "WMT",
            type: "BUY",
            shares: 20,
            price: 163.42,
            status: "Filled",
            date: "2024-01-10 03:45 PM",
            total: 3268.4,
        },
        {
            id: "ORD-012",
            symbol: "DIS",
            type: "SELL",
            shares: 18,
            price: 90.56,
            status: "Pending",
            date: "2024-01-09 11:30 AM",
            total: 1630.08,
        },
    ]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    // Helper functions for styling
    const getStatusColor = (status) => {
        switch (status) {
            case "Filled":
                return "bg-green-100 text-green-800";
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "Cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getTypeColor = (type) => {
        return type === "BUY" ? "text-green-600" : "text-red-600";
    };

    // Define columns for DataTable
    const columns = [
        {
            accessorKey: "id",
            header: "Order ID",
            cell: ({row}) => (
                <span className="text-sm font-medium text-gray-900">
          {row.original.id}
        </span>
            ),
        },
        {
            accessorKey: "symbol",
            header: "Symbol",
            cell: ({row}) => (
                <span className="text-sm text-gray-900">{row.original.symbol}</span>
            ),
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({row}) => (
                <span className={`text-sm font-medium ${getTypeColor(row.original.type)}`}>
          {row.original.type}
        </span>
            ),
        },
        {
            accessorKey: "shares",
            header: "Shares",
            cell: ({row}) => (
                <span className="text-sm text-gray-900">{row.original.shares}</span>
            ),
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({row}) => (
                <span className="text-sm text-gray-900">
          ${row.original.price.toFixed(2)}
        </span>
            ),
        },
        {
            accessorKey: "total",
            header: "Total",
            cell: ({row}) => (
                <span className="text-sm text-gray-900">
          ${row.original.total.toFixed(2)}
        </span>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            enableSorting: false,
            cell: ({row}) => (
                <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        row.original.status
                    )}`}
                >
          {row.original.status}
        </span>
            ),
        },
        {
            accessorKey: "date",
            header: "Date",
            cell: ({row}) => (
                <span className="text-sm text-gray-500">{row.original.date}</span>
            ),
        },
    ];

    // Handle sort (for now just console.log, will connect to API later)
    const handleSort = (columnId, direction) => {
        console.log(`Sorting by ${columnId} in ${direction} order`);
        // Will implement API call here later
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                <p className="text-gray-600">Track your buy and sell orders</p>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Order History</h3>
                </div>

                <DataTable
                    data={orders}
                    columns={columns}
                    // Pagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalItems={orders.length}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={(newSize) => {
                        setPageSize(newSize);
                        setCurrentPage(0); // Reset to first page
                    }}
                    pageSizeOptions={[10, 20, 50]}
                    // Sorting
                    onSort={handleSort}
                    enableSorting={true}
                    manualSorting={false} // Using client-side sorting for now
                    // Pagination
                    manualPagination={false} // Using client-side pagination for now
                    // Table styling
                    className="orders-table"
                />
            </div>
        </div>
    );
};

export default Orders;