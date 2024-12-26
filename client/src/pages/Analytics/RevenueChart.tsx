import { Card, CardBody } from '@nextui-org/react';

const RevenueChart = () => {
  return (
    <Card className="w-full">
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

        {/* Placeholder for chart - In a real app, use a charting library */}
        <div className="w-full h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Revenue Chart Placeholder</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default RevenueChart;
