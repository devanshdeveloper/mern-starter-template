import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { Package } from 'lucide-react';

const TopProducts = () => {
  const products = [
    { name: 'Wireless Headphones', sales: 245, revenue: 48755 },
    { name: 'Smart Watch', sales: 187, revenue: 37212 },
    { name: 'Running Shoes', sales: 142, revenue: 28255 },
    { name: 'Laptop Bag', sales: 132, revenue: 26132 },
  ];

  return (
    <Card>
      <CardBody className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Top Products</h3>
          <Package className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.name} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">{product.sales} sales</p>
              </div>
              <p className="font-semibold">${product.revenue.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default TopProducts;