import React from "react";
import { useOrderProcessing } from "../hooks/useOrderProcessing.tsx";

const OrderManagementSystem: React.FC = () => {
  const { processOrder } = useOrderProcessing();

  return (
    <div>
      <h2>Order Management System</h2>
      <button onClick={processOrder}>Place Order</button>
    </div>
  );
};

export default OrderManagementSystem;
