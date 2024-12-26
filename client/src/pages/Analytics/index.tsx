import React from 'react';
import { Helmet } from 'react-helmet-async';
import AnalyticsChart from './AnalyticsChart';
import RevenueChart from './RevenueChart';
import TopProducts from './TopProducts';

const Analytics = () => {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$84,245',
      trend: 12.5,
      previousValue: '$74,876 last month',
      period: 'last month',
    },
    {
      title: 'Total Orders',
      value: '2,845',
      trend: 8.2,
      previousValue: '2,634 last month',
      period: 'last month',
    },
    {
      title: 'Average Order Value',
      value: '$124',
      trend: -2.4,
      previousValue: '$127 last month',
      period: 'last month',
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      trend: 1.8,
      previousValue: '3.1% last month',
      period: 'last month',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Analytics | E-Commerce Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-gray-500">Monitor your business performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <AnalyticsChart key={metric.title} {...metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <TopProducts />
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
