import type { IProduct } from "../components/store/types/product.types";

export type InputFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  type: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  value?: string;
  disabled: boolean;
};

export type ToastProps = {
  message: string;
};

export type CatalogUnitProps = {
  product: IProduct;
  showToast: (msg: string) => void;
};

export type PasswordFieldProps = {
  setPassword: (value: string) => void;
  value: string;
  disabled: boolean;
};

export interface ApiError {
  message: string;
}
