export enum CustomerType {
  REGULAR = "Regular",
  PREMIUM = "Premium",
  VIP = "VIP",
}

export class Customer {
  private static readonly DISCOUNTS: Record<CustomerType, number> = {
    [CustomerType.REGULAR]: 0.05,
    [CustomerType.PREMIUM]: 0.1,
    [CustomerType.VIP]: 0.2,
  };

  constructor(public name: string, public customerType: CustomerType) {}

  get discount(): number {
    return Customer.DISCOUNTS[this.customerType] || 0;
  }
}
