import type { ToastProps } from "./types";

export const Toast = ({ message }: ToastProps) => {
  return (
    <div
      className={`animate-slide-in fixed right-5 top-5 z-50 rounded-lg bg-neutral-700 px-4 py-2 text-white shadow-lg`}
    >
      {message}
    </div>
  );
};
