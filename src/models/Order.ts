import { Customer } from "./Customer";
import { Product } from "./Product";

export class Order {
  private items: Product[] = [];
  private totalPrice: number = 0;
  private discountedPrice: number = 0;

  constructor(public customer: Customer) {}

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
