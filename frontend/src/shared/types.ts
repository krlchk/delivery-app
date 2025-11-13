import type { ReactNode } from "react";
import type { IOrderItem } from "../components/store/order/types";
import type { IProduct } from "../components/store/product/types";
import type { IUser } from "../components/store/users/types";

export type InputFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  type: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  value?: string;
  disabled?: boolean;
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

export interface IMyOrder {
  id: number;
  status: "new" | "delivering" | "completed" | "cancelled";
  clientId: number;
  deliveryAddress: string;
  createdAt: Date;
  items: IOrderItem[];
}

export interface ModalWindowProps {
  isOpen?: boolean;
  handleClick: () => void;
  child?: ReactNode;
  // error?: () => void | null;
}

export interface HomePageOrderUnitProps{
  orderProps:IMyOrder,
  allUsers:IUser[]
}
