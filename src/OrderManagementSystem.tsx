import React from "react";

//  Issue: Use of Type Constants
//  Old Code: Used string literals like "Regular", "Premium", "VIP"
//  Solution: Replace with an Enum for type safety and consistency.

enum CustomerType {
  REGULAR = "Regular",
  PREMIUM = "Premium",
  VIP = "VIP",
}

//  Issue: Magic Numbers & Long Conditional in setDiscount()
//  Old Code: Used multiple if-else conditions to assign discount rates.
//  Solution: Replace the conditional logic with a constant object.

class Customer {
  private static readonly DISCOUNTS: Record<CustomerType, number> = {
    [CustomerType.REGULAR]: 0.05,
    [CustomerType.PREMIUM]: 0.1,
    [CustomerType.VIP]: 0.2,
  };

  constructor(public name: string, public customerType: CustomerType) {}

  //  Issue: Method setDiscount() mutating state unnecessarily
  //  Old Code:
  //  setDiscount(): void {
  //      if (this.type === "Regular") this.discount = 0.05;
  //      else if (this.type === "Premium") this.discount = 0.1;
  //      else if (this.type === "VIP") this.discount = 0.2;
  //      else this.discount = 0;
  //  }
  //  Solution: Use a getter instead of a mutable property.

  get discount(): number {
    return Customer.DISCOUNTS[this.customerType] || 0;
  }
}

//  Issue: Data Clumps (items[] and prices[] are separate)
//  Old Code: Stored items[] and prices[] separately
//  Solution: Introduce a Product class to bundle item and price.

class Product {
  constructor(public name: string, public price: number) {}
}

//  Issue: Long Methods (calculateTotal() was doing too much)
//  Old Code:
//  calculateTotal(): void {
//      this.totalPrice = this.prices.reduce((sum, price) => sum + price, 0);
//      this.applyDiscount();
//  }
//  Solution: Split into two separate methods for better readability.

class Order {
  private items: Product[] = [];
  private totalPrice: number = 0;
  private discountedPrice: number = 0;

  constructor(public customer: Customer) {}

  //  Issue: Method Naming (calculateTotal and applyDiscount were vague)
  //  Solution: Decomposed logic into calculateTotalPrice() and calculateDiscountedPrice()

  addItem(product: Product): void {
    this.items.push(product);
    this.recalculateOrder();
  }

  private recalculateOrder(): void {
    this.totalPrice = this.calculateTotalPrice();
    this.discountedPrice = this.calculateDiscountedPrice();
  }

  private calculateTotalPrice(): number {
    return this.items.reduce((sum, product) => sum + product.price, 0);
  }

  private calculateDiscountedPrice(): number {
    return this.totalPrice - this.totalPrice * this.customer.discount;
  }

  //  Issue: Large Method (printOrder() was too long)
  //  Old Code: printOrder() handled too many responsibilities
  //  Solution: Extract into separate methods for better readability.

  printOrder(): void {
    this.logOrderDetails();
    this.logPriceDetails();
  }

  private logOrderDetails(): void {
    console.log(`Customer: ${this.customer.name}`);
    console.log(`Items: ${this.items.map((p) => p.name).join(", ")}`);
  }

  private logPriceDetails(): void {
    console.log(`Total Price: $${this.totalPrice.toFixed(2)}`);
    console.log(`Discounted Price: $${this.discountedPrice.toFixed(2)}`);
  }
}

//  Issue: StepDown Rule Violation
//  Old Code: main() executed core logic first, making readability harder
//  Solution: Break processOrder and generateInvoice into separate functions.

const OrderManagementSystem: React.FC = () => {
  const processOrder = () => {
    const customer = new Customer("John Doe", CustomerType.VIP);
    const order = new Order(customer);

    order.addItem(new Product("Laptop", 1000));
    order.addItem(new Product("Mouse", 50));
    order.addItem(new Product("Keyboard", 80));

    order.printOrder();
    generateInvoice(order);
  };

  //  Issue: Large Method (generateInvoice() was too long)
  //  Old Code: Printed all invoice details in one method.
  //  Solution: Extract into smaller methods.

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

  return (
    <div>
      <h2>Order Management System</h2>
      <button onClick={processOrder}>Place Order</button>
    </div>
  );
};

export default OrderManagementSystem;
