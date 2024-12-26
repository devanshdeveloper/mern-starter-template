import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Select, SelectItem } from '@nextui-org/react';
import { Package, DollarSign, Hash, Tags, FileText } from 'lucide-react';

const schema = yup.object({
  name: yup.string().required('Product name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  stock: yup.number().integer('Stock must be an integer').min(0, 'Stock cannot be negative').required('Stock is required'),
  category: yup.string().required('Category is required'),
  image: yup.string().url('Must be a valid URL').required('Image URL is required'),
}).required();

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
}

const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Beauty',
  'Health',
];

const ProductForm = ({ isOpen, onClose, onSubmit }: ProductFormProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormData>({
    resolver: yupResolver(schema)
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmitForm = (data: ProductFormData) => {
    onSubmit(data);
    handleClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalBody className="gap-4">
            <Input
              {...register('name')}
              label="Product Name"
              placeholder="Enter product name"
              startContent={<Package className="w-4 h-4 text-gray-400" />}
              errorMessage={errors.name?.message}
              isInvalid={!!errors.name}
            />
            
            <Textarea
              {...register('description')}
              label="Description"
              placeholder="Enter product description"
              startContent={<FileText className="w-4 h-4 text-gray-400" />}
              errorMessage={errors.description?.message}
              isInvalid={!!errors.description}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register('price')}
                type="number"
                label="Price"
                placeholder="0.00"
                startContent={<DollarSign className="w-4 h-4 text-gray-400" />}
                errorMessage={errors.price?.message}
                isInvalid={!!errors.price}
              />

              <Input
                {...register('stock')}
                type="number"
                label="Stock"
                placeholder="0"
                startContent={<Hash className="w-4 h-4 text-gray-400" />}
                errorMessage={errors.stock?.message}
                isInvalid={!!errors.stock}
              />
            </div>

            <Select
              {...register('category')}
              label="Category"
              placeholder="Select a category"
              startContent={<Tags className="w-4 h-4 text-gray-400" />}
              errorMessage={errors.category?.message}
              isInvalid={!!errors.category}
            >
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </Select>

            <Input
              {...register('image')}
              label="Image URL"
              placeholder="https://example.com/image.jpg"
              errorMessage={errors.image?.message}
              isInvalid={!!errors.image}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={handleClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Add Product
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ProductForm;