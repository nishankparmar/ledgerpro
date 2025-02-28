
import { useState } from 'react';

type FormErrors<T> = Partial<Record<keyof T, string>>;

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    // Clear error when user types
    if (errors[name as keyof T]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = (validationFn?: (values: T) => FormErrors<T>): boolean => {
    if (!validationFn) return true;
    
    const validationErrors = validationFn(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (
    onSubmit: (values: T) => Promise<void> | void,
    validationFn?: (values: T) => FormErrors<T>
  ) => {
    // Return a function directly instead of a Promise<function>
    return (e: React.FormEvent) => {
      e.preventDefault();
      
      const isValid = validate(validationFn);
      if (!isValid) return;

      setIsSubmitting(true);
      try {
        // Handle both Promise and non-Promise returns from onSubmit
        const result = onSubmit(values);
        if (result instanceof Promise) {
          result.finally(() => {
            setIsSubmitting(false);
          });
        } else {
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setIsSubmitting(false);
      }
    };
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
  };
}
