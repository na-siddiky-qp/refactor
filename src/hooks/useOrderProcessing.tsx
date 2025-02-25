import { useCallback } from "react";
import { Customer, CustomerType } from "../models/Customer.ts";
import { Order } from "../models/Order.ts";
import { Product } from "../models/Product.ts";

export const useOrderProcessing = () => {
  const processOrder = useCallback(() => {
    const customer = new Customer("John Doe", CustomerType.VIP);
    const order = new Order(customer);

    order.addItem(new Product("Laptop", 1000));
    order.addItem(new Product("Mouse", 50));
    order.addItem(new Product("Keyboard", 80));

    order.printOrder();
    generateInvoice(order);
  }, []);

  const generateInvoice = (order: Order) => {
    console.log("Generating Invoice...");
    logInvoiceDetails(order);
  };

  const logInvoiceDetails = (order: Order) => {
    console.log(`Customer: ${order.customer.name}`);
    console.log(`Total: $${order["totalPrice"].toFixed(2)}`);
    console.log(`Discounted Total: $${order["discountedPrice"].toFixed(2)}`);
    console.log(`Items: ${order["items"].map((p: any) => p.name).join(", ")}`);
    console.log("Thank you for shopping with us!");
  };

  return { processOrder };
};
