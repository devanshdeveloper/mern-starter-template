import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { Users, ShoppingCart, DollarSign, UserPlus } from 'lucide-react';

interface Stat {
  title: string;
  value: string;
  icon: React.ElementType;
  change: string;
  trend: 'up' | 'down';
}

const CustomerStats = () => {
  const stats: Stat[] = [
    {
      title: 'Total Customers',
      value: '3,842',
      icon: Users,
      change: '+12.5%',
      trend: 'up',
    },
    {
      title: 'Active Customers',
      value: '2,945',
      icon: UserPlus,
      change: '+8.2%',
      trend: 'up',
    },
    {
      title: 'Average Orders',
      value: '2.4',
      icon: ShoppingCart,
      change: '+5.7%',
      trend: 'up',
    },
    {
      title: 'Average Spent',
      value: '$245',
      icon: DollarSign,
      change: '+10.2%',
      trend: 'up',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardBody className="flex flex-row items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <stat.icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className={`text-sm ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </p>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default CustomerStats;