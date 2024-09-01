import { useState, useEffect } from "react";

export const useFormattedValue = (
  value: string | number | null,
  formatter: (v: string | number | null) => string
) => {
  const [formattedValue, setFormattedValue] = useState("$0.00");

  useEffect(() => {
    setFormattedValue(formatter(value));
  }, [value, formatter]);

  return formattedValue;
};
