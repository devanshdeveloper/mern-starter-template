import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
}

const StatsCard = ({ title, value, change, icon: Icon, trend }: StatsCardProps) => {
  return (
    <Card>
      <CardBody className="flex flex-row items-center space-x-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
          <p className={`text-sm ${
            trend === 'up' ? 'text-green-500' : 'text-red-500'
          }`}>
            {change}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default StatsCard;