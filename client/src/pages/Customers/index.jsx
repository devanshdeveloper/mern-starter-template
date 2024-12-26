import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@nextui-org/react';
import { UserPlus } from 'lucide-react';
import CustomerList from './CustomerList';
import CustomerFilters from './CustomerFilters';
import CustomerStats from './CustomerStats';
import CustomerForm from '../../components/forms/CustomerForm';

// Dummy data - Replace with API call
const dummyCustomers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    orders: 12,
    totalSpent: 1249.99,
    lastOrder: new Date().toISOString(),
    avatar: 'https://i.pravatar.cc/150?u=1',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'active',
    orders: 8,
    totalSpent: 849.99,
    lastOrder: new Date(Date.now() - 86400000).toISOString(),
    avatar: 'https://i.pravatar.cc/150?u=2',
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    status: 'inactive',
    orders: 3,
    totalSpent: 249.99,
    lastOrder: new Date(Date.now() - 172800000).toISOString(),
    avatar: 'https://i.pravatar.cc/150?u=3',
  },
] ;

const Customers = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEdit = (customer) => {
    console.log('Edit customer:', customer);
  };

  const handleDelete = (customerId) => {
    console.log('Delete customer:', customerId);
  };

  const handleEmail = (customer) => {
    console.log('Email customer:', customer);
  };

  const handleAddCustomer = (data) => {
    console.log('Add customer:', data);
    // Here you would typically make an API call to create the customer
  };

  const filteredCustomers = dummyCustomers.filter((customer) => {
    const matchesSearch = customer.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      status === 'all' || customer.status === status;
    return matchesSearch && matchesStatus;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'orders':
        return b.orders - a.orders;
      case 'spent':
        return b.totalSpent - a.totalSpent;
      case 'recent':
        return new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime();
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <>
      <Helmet>
        <title>Customers | E-Commerce Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Customers</h1>
            <p className="text-gray-500">Manage your customer base</p>
          </div>
          <Button
            color="primary"
            startContent={<UserPlus className="w-4 h-4" />}
            onPress={() => setIsFormOpen(true)}
          >
            Add Customer
          </Button>
        </div>

        <CustomerStats />

        <CustomerFilters
          search={search}
          status={status}
          sortBy={sortBy}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onSortChange={setSortBy}
        />

        <CustomerList
          customers={sortedCustomers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onEmail={handleEmail}
        />

        <CustomerForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleAddCustomer}
        />
      </div>
    </>
  );
};

export default Customers;