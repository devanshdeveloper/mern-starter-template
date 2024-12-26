import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { TrendingUp } from 'lucide-react';

const RevenueChart = () => {
  return (
    <Card className="col-span-2">
      <CardBody className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">Revenue Overview</h3>
            <p className="text-sm text-gray-500">Monthly revenue performance</p>
          </div>
          <select className="bg-transparent border border-gray-200 rounded-lg px-3 py-1 text-sm">
            <option value="year">This Year</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
        </div>
        <div className="relative h-[300px]">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent rounded-lg" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary-500/5 to-transparent rounded-lg" />
          <div className="absolute inset-0 flex items-center justify-center">
            <TrendingUp className="w-12 h-12 text-primary-500/20" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default RevenueChart;