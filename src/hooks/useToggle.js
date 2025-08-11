import { useState } from "react";

// Toggle hook for boolean states
export function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue);

    const toggle = () => setValue((prev) => !prev);
    const setTrue = () => setValue(true);
    const setFalse = () => setValue(false);

    return [value, { toggle, setTrue, setFalse }];
}

// Local storage hook
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading localStorage:", error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error("Error setting localStorage:", error);
        }
    };

    return [storedValue, setValue];
}
