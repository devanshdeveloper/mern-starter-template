import React from 'react';
import { Card, CardBody, Avatar } from '@nextui-org/react';
import { ShoppingBag } from 'lucide-react';

const RecentOrders = () => {
  const orders = [
    {
      id: '1',
      customer: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?u=1',
      product: 'Wireless Headphones',
      total: 199.99,
      status: 'completed',
    },
    {
      id: '2',
      customer: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?u=2',
      product: 'Smart Watch',
      total: 299.99,
      status: 'processing',
    },
    {
      id: '3',
      customer: 'Bob Wilson',
      avatar: 'https://i.pravatar.cc/150?u=3',
      product: 'Running Shoes',
      total: 129.99,
      status: 'completed',
    },
  ];

  return (
    <Card className="col-span-2">
      <CardBody className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <ShoppingBag className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar src={order.avatar} name={order.customer} size="sm" />
                <div>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.product}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${order.total}</p>
                <p className={`text-sm ${
                  order.status === 'completed' ? 'text-green-500' : 'text-blue-500'
                }`}>
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default RecentOrders;