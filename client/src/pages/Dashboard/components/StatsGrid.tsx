import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';
import StatsCard from '../../../components/dashboard/StatsCard';

const StatsGrid = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$54,239',
      change: '+12.5%',
      icon: DollarSign,
      trend: 'up' as const,
    },
    {
      title: 'Total Orders',
      value: '1,429',
      change: '+8.2%',
      icon: ShoppingBag,
      trend: 'up' as const,
    },
    {
      title: 'Total Customers',
      value: '3,842',
      change: '+5.7%',
      icon: Users,
      trend: 'up' as const,
    },
    {
      title: 'Conversion Rate',
      value: '2.4%',
      change: '+1.2%',
      icon: TrendingUp,
      trend: 'up' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;