import React from 'react';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { Search } from 'lucide-react';

interface ProductFiltersProps {
  search: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const ProductFilters = ({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: ProductFiltersProps) => {
  const categories = [
    'All',
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Input
        value={search}
        onValueChange={onSearchChange}
        placeholder="Search products..."
        startContent={<Search className="w-4 h-4 text-gray-400" />}
        className="w-full sm:w-64"
      />
      <Select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        placeholder="Select category"
        className="w-full sm:w-48"
      >
        {categories.map((cat) => (
          <SelectItem key={cat} value={cat}>
            {cat}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default ProductFilters;