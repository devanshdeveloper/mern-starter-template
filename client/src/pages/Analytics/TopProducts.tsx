import React from 'react';
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Progress,
} from '@nextui-org/react';

const TopProducts = () => {
  const products = [
    { name: 'Wireless Headphones', sales: 1234, revenue: 246800, progress: 85 },
    { name: 'Smart Watch', sales: 856, revenue: 171200, progress: 65 },
    { name: 'Running Shoes', sales: 645, revenue: 83850, progress: 45 },
    { name: 'Laptop Bag', sales: 432, revenue: 34560, progress: 30 },
  ];

  return (
    <Card>
      <CardBody>
        <h3 className="text-lg font-semibold mb-4">Top Products</h3>
        <Table removeWrapper aria-label="Top products table">
          <TableHeader>
            <TableColumn>PRODUCT</TableColumn>
            <TableColumn>SALES</TableColumn>
            <TableColumn>REVENUE</TableColumn>
            <TableColumn>PROGRESS</TableColumn>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.name}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sales.toLocaleString()}</TableCell>
                <TableCell>${product.revenue.toLocaleString()}</TableCell>
                <TableCell>
                  <Progress
                    value={product.progress}
                    color="primary"
                    size="sm"
                    className="max-w-md"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default TopProducts;
