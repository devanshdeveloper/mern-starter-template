import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { User, Mail, Phone, MapPin } from "lucide-react";

const schema = yup
  .object({
    name: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    address: yup.string().required("Address is required"),
    status: yup
      .string()
      .oneOf(["active", "inactive"])
      .required("Status is required"),
  })
  .required();

interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive";
}

interface CustomerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CustomerFormData) => void;
}

const CustomerForm = ({ isOpen, onClose, onSubmit }: CustomerFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomerFormData>({
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmitForm = (data: CustomerFormData) => {
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
          <ModalHeader>Add New Customer</ModalHeader>
          <ModalBody className="gap-4">
            <Input
              {...register("name")}
              label="Full Name"
              placeholder="Enter full name"
              startContent={<User className="w-4 h-4 text-gray-400" />}
              errorMessage={errors.name?.message}
              isInvalid={!!errors.name}
            />

            <Input
              {...register("email")}
              type="email"
              label="Email"
              placeholder="Enter email address"
              startContent={<Mail className="w-4 h-4 text-gray-400" />}
              errorMessage={errors.email?.message}
              isInvalid={!!errors.email}
            />

            <Input
              {...register("phone")}
              label="Phone Number"
              placeholder="Enter phone number"
              startContent={<Phone className="w-4 h-4 text-gray-400" />}
              errorMessage={errors.phone?.message}
              isInvalid={!!errors.phone}
            />

            <Input
              {...register("address")}
              label="Address"
              placeholder="Enter address"
              startContent={<MapPin className="w-4 h-4 text-gray-400" />}
              errorMessage={errors.address?.message}
              isInvalid={!!errors.address}
            />

            <Select
              {...register("status")}
              label="Status"
              placeholder="Select status"
              errorMessage={errors.status?.message}
              isInvalid={!!errors.status}
            >
              <SelectItem key="active" value="active">
                Active
              </SelectItem>
              <SelectItem key="inactive" value="inactive">
                Inactive
              </SelectItem>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={handleClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Add Customer
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CustomerForm;
