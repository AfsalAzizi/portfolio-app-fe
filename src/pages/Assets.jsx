import React from "react";

const Assets = () => {
  const assets = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      shares: 50,
      avgPrice: 145.2,
      currentPrice: 150.25,
      totalValue: 7512.5,
      gainLoss: "+$252.50",
      gainLossPercent: "+3.48%",
      positive: true,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      shares: 25,
      avgPrice: 2750.0,
      currentPrice: 2850.0,
      totalValue: 71250.0,
      gainLoss: "+$2500.00",
      gainLossPercent: "+3.64%",
      positive: true,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      shares: 30,
      avgPrice: 280.5,
      currentPrice: 275.75,
      totalValue: 8272.5,
      gainLoss: "-$142.50",
      gainLossPercent: "-1.69%",
      positive: false,
    },
    {
      symbol: "TSLA",
      name: "Tesla, Inc.",
      shares: 15,
      avgPrice: 220.0,
      currentPrice: 235.8,
      totalValue: 3537.0,
      gainLoss: "+$237.00",
      gainLossPercent: "+7.18%",
      positive: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assets</h1>
        <p className="text-gray-600">Your portfolio holdings and performance</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Portfolio Holdings
          </h3>
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
              {assets.map((asset, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {asset.symbol}
                      </div>
                      <div className="text-sm text-gray-500">{asset.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {asset.shares}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${asset.avgPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${asset.currentPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${asset.totalValue.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`text-sm font-medium ${
                        asset.positive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {asset.gainLoss}
                    </div>
                    <div
                      className={`text-xs ${
                        asset.positive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {asset.gainLossPercent}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Assets;
