export class Customer {
  public name: string;
  public dob: string;
  public streetAddress: string;
  public city: string;
  public state: string;
  public postCode: string;
  public country: string;
  public phone: string;
  public email: string;
}

export class Product {
  public name: string;
  public description: string;
  public price: number;
}

export class SalesRecord {
  public customer: Customer;
  public product: Product;
  public sold: number;
}

export class Constants {
  public static readonly DATEFORMAT: string = "YYYY-MM-DD";
}
