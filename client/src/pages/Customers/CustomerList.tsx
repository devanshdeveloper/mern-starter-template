import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip, User } from '@nextui-org/react';
import { Edit, Trash2, Mail } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  orders: number;
  totalSpent: number;
  lastOrder: string;
  avatar?: string;
}

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
  onEmail: (customer: Customer) => void;
}

const CustomerList = ({ customers, onEdit, onDelete, onEmail }: CustomerListProps) => {
  return (
    <Table aria-label="Customers table">
      <TableHeader>
        <TableColumn>Customer</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Orders</TableColumn>
        <TableColumn>Total Spent</TableColumn>
        <TableColumn>Last Order</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>
              <User
                name={customer.name}
                description={customer.email}
                avatarProps={{
                  src: customer.avatar,
                  fallback: customer.name.charAt(0),
                }}
              />
            </TableCell>
            <TableCell>
              <Chip
                size="sm"
                color={customer.status === 'active' ? 'success' : 'default'}
                variant="flat"
              >
                {customer.status}
              </Chip>
            </TableCell>
            <TableCell>{customer.orders}</TableCell>
            <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
            <TableCell>{new Date(customer.lastOrder).toLocaleDateString()}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onClick={() => onEmail(customer)}
                >
                  <Mail className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onClick={() => onEdit(customer)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="danger"
                  onClick={() => onDelete(customer.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomerList;