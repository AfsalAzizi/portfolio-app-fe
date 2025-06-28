import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Portfolio = () => {
  // Portfolio value over time data
  const portfolioHistory = [
    { date: "Jan", value: 100000, gain: 0 },
    { date: "Feb", value: 105000, gain: 5000 },
    { date: "Mar", value: 98000, gain: -7000 },
    { date: "Apr", value: 112000, gain: 14000 },
    { date: "May", value: 108000, gain: -4000 },
    { date: "Jun", value: 125000, gain: 17000 },
    { date: "Jul", value: 132000, gain: 7000 },
    { date: "Aug", value: 128000, gain: -4000 },
    { date: "Sep", value: 140000, gain: 12000 },
    { date: "Oct", value: 135000, gain: -5000 },
    { date: "Nov", value: 145000, gain: 10000 },
    { date: "Dec", value: 150000, gain: 5000 },
  ];

  // Asset allocation data
  const assetAllocation = [
    { name: "Technology", value: 45, color: "#3B82F6" },
    { name: "Healthcare", value: 20, color: "#10B981" },
    { name: "Finance", value: 15, color: "#F59E0B" },
    { name: "Consumer", value: 12, color: "#EF4444" },
    { name: "Energy", value: 8, color: "#8B5CF6" },
  ];

  // Top performing stocks
  const topStocks = [
    { symbol: "AAPL", name: "Apple Inc.", return: 25.5, value: 25000 },
    { symbol: "GOOGL", name: "Alphabet Inc.", return: 18.2, value: 18000 },
    { symbol: "MSFT", name: "Microsoft Corp.", return: 15.8, value: 15000 },
    { symbol: "TSLA", name: "Tesla Inc.", return: 12.3, value: 12000 },
    { symbol: "AMZN", name: "Amazon.com Inc.", return: 8.7, value: 8000 },
  ];

  // Monthly returns comparison
  const monthlyReturns = [
    { month: "Jan", portfolio: 5.2, sp500: 4.1 },
    { month: "Feb", portfolio: -2.1, sp500: -1.8 },
    { month: "Mar", portfolio: 8.5, sp500: 6.2 },
    { month: "Apr", portfolio: 3.2, sp500: 2.9 },
    { month: "May", portfolio: -1.5, sp500: -0.8 },
    { month: "Jun", portfolio: 6.8, sp500: 5.1 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Portfolio Overview</h1>
        <p className="text-gray-600">
          Your investment performance and allocation
        </p>
      </div>

      {/* Portfolio Value Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Portfolio Value Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={portfolioHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Allocation Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Asset Allocation
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetAllocation}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {assetAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Returns Comparison */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Monthly Returns vs S&P 500
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyReturns}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="portfolio" fill="#3B82F6" name="Your Portfolio" />
              <Bar dataKey="sp500" fill="#6B7280" name="S&P 500" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Stocks */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Top Performing Stocks
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {topStocks.map((stock, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {stock.symbol.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{stock.symbol}</p>
                    <p className="text-sm text-gray-600">{stock.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      stock.return >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stock.return >= 0 ? "+" : ""}
                    {stock.return}%
                  </p>
                  <p className="text-sm text-gray-600">
                    ${stock.value.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">$150,000</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Return</p>
              <p className="text-2xl font-bold text-green-600">+50.0%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Holdings</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Beta</p>
              <p className="text-2xl font-bold text-gray-900">1.2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
