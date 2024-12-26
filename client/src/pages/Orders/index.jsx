import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import OrderList from "./OrderList";
import OrderFilters from "./OrderFilters";

const dummyOrders: Order[] = [
  {
    id: "1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    status: "delivered",
    total: 328.98,
    items: [
      { productId: "1", quantity: 1, price: 199.99 },
      { productId: "2", quantity: 1, price: 129.99 },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    status: "processing",
    total: 199.99,
    items: [{ productId: "1", quantity: 1, price: 199.99 }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Orders = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Order["status"] | "all">("all");

  const filteredOrders = dummyOrders.filter((order) => {
    const matchesSearch = order.customerName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = status === "all" || order.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Helmet>
        <title>Orders | E-Commerce Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-gray-500">Manage customer orders</p>
        </div>

        <OrderFilters
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={(e) => setStatus(e)}
        />

        <OrderList orders={filteredOrders} />
      </div>
    </>
  );
};

export default Orders;
