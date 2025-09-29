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
  toastColor: string;
};

export type PasswordFieldProps = {
  setPassword: (value: string) => void;
  value: string;
  disabled: boolean;
};

export interface ApiError {
  message: string;
}