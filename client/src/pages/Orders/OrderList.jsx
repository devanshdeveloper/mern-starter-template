import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@nextui-org/react';
import type { Order } from '../../types';

interface OrderListProps {
  orders: Order[];
}

const OrderList = ({ orders }: OrderListProps) => {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'primary';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <Table aria-label="Orders table">
      <TableHeader>
        <TableColumn>Order ID</TableColumn>
        <TableColumn>Customer</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Items</TableColumn>
        <TableColumn>Total</TableColumn>
        <TableColumn>Date</TableColumn>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>#{order.id}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>
              <Chip
                size="sm"
                color={getStatusColor(order.status)}
                variant="flat"
              >
                {order.status}
              </Chip>
            </TableCell>
            <TableCell>{order.items.length} items</TableCell>
            <TableCell>${order.total.toFixed(2)}</TableCell>
            <TableCell>
              {new Date(order.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderList;