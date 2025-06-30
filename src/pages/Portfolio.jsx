import React, { useState, useEffect } from "react";
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
import Cookies from "js-cookie";

const Portfolio = () => {
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [portfolioStats, setPortfolioStats] = useState({
    totalValue: 0,
    totalGain: 0,
    totalAssets: 0,
    pendingOrders: 0,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
  });

  // Fetch holdings data from API
  const fetchHoldings = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        "http://localhost:3000/api/assets/holdings",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch holdings data");
      }

      const data = await response.json();
      console.log("Holdings API response:", data);

      setHoldings(data.holdings || []);
      setPagination({
        total: data.total || 0,
        page: data.page || 1,
        limit: data.limit || 10,
      });

      // Calculate portfolio statistics
      calculatePortfolioStats(data.holdings || []);
    } catch (error) {
      console.error("Error fetching holdings:", error);
      setError("Failed to load portfolio data");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate portfolio statistics from holdings data
  const calculatePortfolioStats = (holdingsData) => {
    const totalValue = holdingsData.reduce(
      (sum, holding) => sum + (holding.totalValue || 0),
      0
    );
    const totalGain = holdingsData.reduce(
      (sum, holding) => sum + (holding.gainLoss || 0),
      0
    );
    const totalAssets = holdingsData.length;

    setPortfolioStats({
      totalValue,
      totalGain,
      totalAssets,
      pendingOrders: 3, // This would come from a separate API call
    });
  };

  // Generate portfolio history from holdings data
  const generatePortfolioHistory = () => {
    // This would ideally come from a separate API endpoint
    // For now, we'll generate mock data based on current holdings
    const baseValue = portfolioStats.totalValue;
    return [
      { date: "Jan", value: baseValue * 0.8, gain: 0 },
      { date: "Feb", value: baseValue * 0.85, gain: baseValue * 0.05 },
      { date: "Mar", value: baseValue * 0.78, gain: -baseValue * 0.07 },
      { date: "Apr", value: baseValue * 0.9, gain: baseValue * 0.12 },
      { date: "May", value: baseValue * 0.87, gain: -baseValue * 0.03 },
      { date: "Jun", value: baseValue * 0.95, gain: baseValue * 0.08 },
      { date: "Jul", value: baseValue * 1.0, gain: baseValue * 0.05 },
      { date: "Aug", value: baseValue * 0.97, gain: -baseValue * 0.03 },
      { date: "Sep", value: baseValue * 1.05, gain: baseValue * 0.08 },
      { date: "Oct", value: baseValue * 1.02, gain: -baseValue * 0.03 },
      { date: "Nov", value: baseValue * 1.08, gain: baseValue * 0.06 },
      { date: "Dec", value: baseValue, gain: baseValue * 0.02 },
    ];
  };

  // Generate asset allocation from holdings data
  const generateAssetAllocation = () => {
    // Since the API doesn't provide sector info, we'll group by symbol for now
    // In a real implementation, you'd want to add sector data to your holdings
    const symbolMap = {};

    holdings.forEach((holding) => {
      const symbol = holding.symbol;
      if (!symbolMap[symbol]) {
        symbolMap[symbol] = 0;
      }
      symbolMap[symbol] += holding.totalValue || 0;
    });

    const colors = [
      "#3B82F6",
      "#10B981",
      "#F59E0B",
      "#EF4444",
      "#8B5CF6",
      "#06B6D4",
      "#84CC16",
      "#F97316",
    ];

    return Object.entries(symbolMap).map(([symbol, value], index) => ({
      name: symbol,
      value: Math.round((value / portfolioStats.totalValue) * 100),
      color: colors[index % colors.length],
    }));
  };

  // Generate top performing stocks from holdings data
  const generateTopStocks = () => {
    return holdings
      .sort((a, b) => (b.gainLossPercent || 0) - (a.gainLossPercent || 0))
      .slice(0, 5)
      .map((holding) => ({
        symbol: holding.symbol,
        name: holding.name || holding.symbol,
        return: holding.gainLossPercent || 0,
        value: holding.totalValue || 0,
      }));
  };

  useEffect(() => {
    fetchHoldings();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: $${entry.value?.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium mb-2">
            Error Loading Portfolio
          </div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchHoldings}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const portfolioHistory = generatePortfolioHistory();
  const assetAllocation = generateAssetAllocation();
  const topStocks = generateTopStocks();

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
            Asset Allocation by Stock
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

        {/* Top Performing Stocks */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Top Performing Stocks
          </h3>
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
                    {stock.return.toFixed(2)}%
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

      {/* Holdings Summary Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Your Holdings</h3>
          <p className="text-sm text-gray-600">
            Showing {holdings.length} of {pagination.total} holdings
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shares
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gain/Loss
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {holdings.map((holding, index) => (
                <tr key={holding._id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {holding.symbol}
                      </div>
                      <div className="text-sm text-gray-500">
                        {holding.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {holding.shares}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${holding.avgPrice?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${holding.currentPrice?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${holding.totalValue?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`text-sm font-medium ${
                        holding.gainLoss >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      ${holding.gainLoss?.toFixed(2)}
                    </div>
                    <div
                      className={`text-xs ${
                        holding.gainLossPercent >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {holding.gainLossPercent >= 0 ? "+" : ""}
                      {holding.gainLossPercent?.toFixed(2)}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              <p className="text-2xl font-bold text-gray-900">
                ${portfolioStats.totalValue.toLocaleString()}
              </p>
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
              <p
                className={`text-2xl font-bold ${
                  portfolioStats.totalGain >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {portfolioStats.totalGain >= 0 ? "+" : ""}$
                {portfolioStats.totalGain.toFixed(2)}
              </p>
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
              <p className="text-2xl font-bold text-gray-900">
                {portfolioStats.totalAssets}
              </p>
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
