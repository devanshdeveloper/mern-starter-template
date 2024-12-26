import React from 'react';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { Search } from 'lucide-react';

interface CustomerFiltersProps {
  search: string;
  status: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const CustomerFilters = ({
  search,
  status,
  sortBy,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: CustomerFiltersProps) => {
  const statuses = ['all', 'active', 'inactive'];
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'orders', label: 'Orders' },
    { value: 'spent', label: 'Total Spent' },
    { value: 'recent', label: 'Most Recent' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Input
        value={search}
        onValueChange={onSearchChange}
        placeholder="Search customers..."
        startContent={<Search className="w-4 h-4 text-gray-400" />}
        className="w-full sm:w-64"
      />
      <Select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        placeholder="Filter by status"
        className="w-full sm:w-48"
      >
        {statuses.map((s) => (
          <SelectItem key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </SelectItem>
        ))}
      </Select>
      <Select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        placeholder="Sort by"
        className="w-full sm:w-48"
      >
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default CustomerFilters;