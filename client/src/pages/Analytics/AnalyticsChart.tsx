import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string;
  trend: number;
  previousValue: string;
  period: string;
}

const AnalyticsCard = ({
  title,
  value,
  trend,
  previousValue,
  period,
}: AnalyticsCardProps) => {
  const isPositive = trend > 0;

  return (
    <Card>
      <CardBody className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-semibold mt-1">{value}</p>
          </div>
          <div
            className={`flex items-center ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="ml-1 text-sm">{Math.abs(trend)}%</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          {previousValue} {period}
        </p>
      </CardBody>
    </Card>
  );
};

export default AnalyticsCard;
