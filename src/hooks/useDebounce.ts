import { useState, useEffect } from "react";

function useDebounce(value: string, delay: number) {
  const [initialValue, setInitialValue] = useState(value);

  useEffect(() => {
    let timer = setTimeout(() => setInitialValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return initialValue;
}

export default useDebounce;
