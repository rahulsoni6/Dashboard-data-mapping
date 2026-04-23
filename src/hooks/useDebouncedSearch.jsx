import { useEffect, useState } from "react";

const useDebouncedSearch = (searchText, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(searchText);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchText);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchText, delay]);

  return debouncedValue;
};
export default useDebouncedSearch;
