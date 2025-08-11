import { useState, useEffect } from "react";

// Form hook for handling form state and validation
export function useForm(initialValues, validationRules = {}) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (name, value) => {
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        Object.keys(validationRules).forEach((field) => {
            const rule = validationRules[field];
            const value = values[field];

            if (rule.required && (!value || value.trim() === "")) {
                newErrors[field] = `${field} is required`;
            } else if (rule.validator && !rule.validator(value)) {
                newErrors[field] = rule.message || `${field} is invalid`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (onSubmit) => {
        setIsSubmitting(true);

        if (validate()) {
            try {
                await onSubmit(values);
                setValues(initialValues); // Reset form on success
            } catch (error) {
                console.error("Form submission error:", error);
            }
        }

        setIsSubmitting(false);
    };

    const reset = () => {
        setValues(initialValues);
        setErrors({});
        setIsSubmitting(false);
    };

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        reset,
    };
}
