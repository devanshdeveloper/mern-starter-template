import BagHappyIcon from "../components/icons/BagHappyIcon";
import BoxIcon from "../components/icons/BoxIcon";
import CardIcon from "../components/icons/CardIcon";
import DocumentIcon from "../components/icons/DocumentIcon";
import DocumentUploadIcon from "../components/icons/DocumentUploadIcon";
import EditIcon from "../components/icons/EditIcon";
import HomeIcon from "../components/icons/HomeIcon";
import Profile2UserIcon from "../components/icons/Profile2UserIcon";
import ShoppingCartIcon from "../components/icons/ShoppingCartIcon";
import UserIcon from "../components/icons/UserIcon";

export const sidebarData = [
  {
    id: "main",
    type: "title",
    title: "Main",
  },
  {
    id: "dashboard",
    type: "item",
    title: "Dashboard",
    to: "/",
    icon: HomeIcon,
  },
  {
    id: "inventory",
    type: "title",
    title: "Inventory",
  },
  {
    id: "products-and-services",
    type: "item",
    title: "Product /Services",
    to: "/app/products-and-services",
    icon: BoxIcon,
  },
  {
    id: "inventory-item",
    type: "item",
    title: "Inventory",
    to: "/app/inventory",
    icon: UserIcon,
  },
  {
    id: "customer",
    type: "title",
    title: "Customer",
  },
  {
    id: "customers",
    type: "item",
    title: "Customers",
    to: "/app/customers",
    icon: Profile2UserIcon,
  },
  {
    id: "vendor",
    type: "item",
    title: "Vendor",
    to: "/app/vendors",
    icon: UserIcon,
  },
  {
    id: "sales",
    type: "title",
    title: "Sales",
  },
  {
    id: "invoice",
    type: "item",
    title: "Invoice",
    to: "/app/invoice",
    icon: DocumentIcon,
  },
  {
    id: "sales-return",
    type: "item",
    title: "Sales Return",
    to: "/app/sales-return",
    icon: EditIcon,
    // icon: DocumentIcon,
  },
  {
    id: "purchase",
    type: "title",
    title: "Sales",
  },
  {
    id: "purchase-orders",
    type: "item",
    title: "Purchase Orders",
    to: "/app/purchase-orders",
    icon: ShoppingCartIcon,
  },
  {
    id: "purchases",
    type: "item",
    title: "Purchases",
    to: "/app/purchases",
    icon: BagHappyIcon,
  },
  {
    id: "purchases-return",
    type: "item",
    title: "Purchases Return",
    to: "/app/purchases-return",
    icon: UserIcon,
    // icon: DocumentIcon,
  },
  {
    id: "finance-and-accounts",
    type: "title",
    title: "Finance and Accounts",
  },
  {
    id: "expenses",
    type: "item",
    title: "Expenses",
    to: "/app/expenses",
    icon: DocumentUploadIcon,
  },
  {
    id: "purchases",
    type: "item",
    title: "Payments",
    to: "/app/payments",
    icon: CardIcon,
  },
];
