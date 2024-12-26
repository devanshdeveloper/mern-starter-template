import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip } from '@nextui-org/react';
import { Edit, Trash2 } from 'lucide-react';
import type { Product } from '../../types';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductList = ({ products, onEdit, onDelete }: ProductListProps) => {
  return (
    <Table aria-label="Products table">
      <TableHeader>
        <TableColumn>Image</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Category</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>Stock</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
              />
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>
              <Chip size="sm" variant="flat">{product.category}</Chip>
            </TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>
              <Chip
                size="sm"
                color={product.stock > 10 ? "success" : "warning"}
              >
                {product.stock} in stock
              </Chip>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onClick={() => onEdit(product)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="danger"
                  onClick={() => onDelete(product.id)}
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

export default ProductList;