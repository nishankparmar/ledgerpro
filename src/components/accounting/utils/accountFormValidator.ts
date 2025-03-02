
interface AccountFormValues {
  code: string;
  name: string;
  type: string; 
  classification: string;
  description: string;
  isActive: boolean;
  initialBalance: number;
}

export const validateAccountForm = (values: AccountFormValues, isEditing: boolean): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!values.code.trim()) {
    errors.code = 'Account code is required';
  } else if (!/^\d+$/.test(values.code)) {
    errors.code = 'Account code must contain only numbers';
  }
  
  if (!values.name.trim()) {
    errors.name = 'Account name is required';
  }
  
  if (!values.type) {
    errors.type = 'Account type is required';
  }
  
  if (!values.classification) {
    errors.classification = 'Account classification is required';
  }
  
  if (!isEditing && values.initialBalance < 0) {
    errors.initialBalance = 'Initial balance cannot be negative';
  }
  
  return errors;
};
