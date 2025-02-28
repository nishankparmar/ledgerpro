
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

  const handleSubmit = async (
    onSubmit: (values: T) => Promise<void> | void,
    validationFn?: (values: T) => FormErrors<T>
  ) => {
    return async (e: React.FormEvent) => {
      e.preventDefault();
      
      const isValid = validate(validationFn);
      if (!isValid) return;

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
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
