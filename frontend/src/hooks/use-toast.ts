import { useCallback, useEffect, useState } from "react";

export const useToast = () => {
  const [message, setMessage] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setMessage(msg);
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setMessage(null);
    }, 1500);
    return () => clearTimeout(timer);
  }, [message]);

  return { message, showToast };
};
