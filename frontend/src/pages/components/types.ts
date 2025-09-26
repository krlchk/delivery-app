export type InputFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  type: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  value: string;
};

export type ToastProps = {
  message: string;
  toastColor: string;
};
