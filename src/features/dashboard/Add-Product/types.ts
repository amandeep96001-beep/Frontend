export type TaxIncludedOption = 'yes' | 'no';
export type StockStatus = 'in-stock' | 'out-of-stock';

export interface DimensionsForm {
  length: string;
  width: string;
  height: string;
}

export interface BasicDetailFormState {
  title: string;
  description: string;
  brand: string;
  sku: string;
  type: string;
  basePrice: string;
  discountPrice: string;
  taxIncluded: TaxIncludedOption;
  tax: string;
  stockQuantity: string;
  stockStatus: StockStatus;
  isUnlimited: boolean;
  startDate: string;
  endDate: string;
  weight: string;
  dimensions: DimensionsForm;
  isFeatured: boolean;
}

export interface ProductMediaState {
  images: string[];
  categoryId: string;
  tag: string;
  selectedColor: string;
}

export interface CreateProductPayload {
  title: string;
  description: string;
  brand: string;
  categoryId: string;
  basePrice: number;
  discountPrice?: number;
  sku: string;
  type: string;
  weight?: number;
  dimensions: {
    length?: number;
    width?: number;
    height?: number;
  };
  isActive: boolean;
  image: string[];
  tax: number;
  tag?: string;
  color?: string;
  isFeatured?: boolean;
}
