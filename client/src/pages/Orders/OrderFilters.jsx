import { Input, Select, SelectItem } from "@nextui-org/react";
import { Search } from "lucide-react";

const OrderFilters = ({ search, status, onSearchChange, onStatusChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Input
        value={search}
        onValueChange={onSearchChange}
        placeholder="Search orders..."
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
    </div>
  );
};

export default OrderFilters;
