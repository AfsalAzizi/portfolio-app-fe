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
        <div className="flex flex-row">
        {assets?.map((el, i) => <>
              <div key={el.symbol+i} class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm m-4 min-w-64">
          <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{el?.symbol}</h5>
            </a>
            <p className="my-2 text-gray-500">{el.name}</p>
            <p class="mb-3 font-normal text-gray-700">Avg. Price: { el?.avgPrice}</p>
          <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
              Buy / Sell
          </a>
      </div>
        </>)}
        </div>
      </div>
    </div>
  );
};

export default Assets;
