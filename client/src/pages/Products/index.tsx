import  { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@nextui-org/react';
import { Plus } from 'lucide-react';
import ProductList from './ProductList';
import ProductFilters from './ProductFilters';
import ProductForm from '../../components/forms/ProductForm';
import type { Product } from '../../types';

// Dummy data - Replace with API call
const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    stock: 15,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Running Shoes',
    description: 'Comfortable running shoes for professional athletes',
    price: 129.99,
    stock: 8,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Products = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEdit = (product: Product) => {
    console.log('Edit product:', product);
  };

  const handleDelete = (productId: string) => {
    console.log('Delete product:', productId);
  };

  const handleAddProduct = (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('Add product:', data);
  };

  const filteredProducts = dummyProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Products | E-Commerce Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-gray-500">Manage your product inventory</p>
          </div>
          <Button
            color="primary"
            startContent={<Plus className="w-4 h-4" />}
            onPress={() => setIsFormOpen(true)}
          >
            Add Product
          </Button>
        </div>

        <ProductFilters
          search={search}
          category={category}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
        />

        <ProductList
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ProductForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleAddProduct}
        />
      </div>
    </>
  );
};

export default Products;