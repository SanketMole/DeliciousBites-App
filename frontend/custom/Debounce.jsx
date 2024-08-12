import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [debouncedvalue, setdebouncedvalue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setdebouncedvalue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedvalue;
};
