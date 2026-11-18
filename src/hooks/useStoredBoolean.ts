import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useStoredBoolean(key: string, initial: boolean) {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((stored) => {
        if (stored !== null) setValue(stored === "true");
      })
      .catch(() => {});
  }, [key]);

  const update = useCallback(
    (next: boolean) => {
      setValue(next);
      AsyncStorage.setItem(key, String(next)).catch(() => {});
    },
    [key]
  );

  return [value, update] as const;
}