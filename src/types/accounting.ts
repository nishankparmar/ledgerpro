
// Type definitions for the Chart of Accounts structure

// Account types in a double-entry accounting system
export type AccountType = 'asset' | 'liability' | 'equity' | 'income' | 'expense';

// Account classification (for grouping similar accounts)
export type AccountClassification = 
  // Asset classifications
  | 'current-asset'
  | 'fixed-asset'
  | 'non-current-asset'
  | 'other-asset'
  // Liability classifications  
  | 'current-liability'
  | 'long-term-liability'
  | 'other-liability'
  // Equity classifications
  | 'owner-equity'
  | 'retained-earnings'
  // Income classifications
  | 'operating-revenue'
  | 'non-operating-revenue'
  // Expense classifications
  | 'operating-expense'
  | 'non-operating-expense'
  | 'tax';

// Base account structure
export interface Account {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  classification: AccountClassification;
  description?: string;
  balance: number;
  isActive: boolean;
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Payload for creating a new account
export type CreateAccountPayload = Omit<Account, 'id' | 'balance' | 'createdAt' | 'updatedAt'> & {
  initialBalance?: number;
};

// Payload for updating an existing account
export type UpdateAccountPayload = Partial<Omit<Account, 'id' | 'createdAt' | 'updatedAt'>>;

// Map of account types to their classifications
export const accountClassifications: Record<AccountType, AccountClassification[]> = {
  asset: ['current-asset', 'fixed-asset', 'non-current-asset', 'other-asset'],
  liability: ['current-liability', 'long-term-liability', 'other-liability'],
  equity: ['owner-equity', 'retained-earnings'],
  income: ['operating-revenue', 'non-operating-revenue'],
  expense: ['operating-expense', 'non-operating-expense', 'tax'],
};

// Human-readable labels for account types
export const accountTypeLabels: Record<AccountType, string> = {
  asset: 'Asset',
  liability: 'Liability',
  equity: 'Equity',
  income: 'Income',
  expense: 'Expense',
};

// Human-readable labels for account classifications
export const accountClassificationLabels: Record<AccountClassification, string> = {
  'current-asset': 'Current Asset',
  'fixed-asset': 'Fixed Asset',
  'non-current-asset': 'Non-Current Asset',
  'other-asset': 'Other Asset',
  'current-liability': 'Current Liability',
  'long-term-liability': 'Long-Term Liability',
  'other-liability': 'Other Liability',
  'owner-equity': 'Owner Equity',
  'retained-earnings': 'Retained Earnings',
  'operating-revenue': 'Operating Revenue',
  'non-operating-revenue': 'Non-Operating Revenue',
  'operating-expense': 'Operating Expense',
  'non-operating-expense': 'Non-Operating Expense',
  'tax': 'Tax',
};

// Default accounts by type and classification
export const defaultAccounts: Partial<Account>[] = [
  // Assets
  { name: 'Cash', code: '1001', type: 'asset', classification: 'current-asset', description: 'Cash on hand' },
  { name: 'Bank Account', code: '1002', type: 'asset', classification: 'current-asset', description: 'Primary bank account' },
  { name: 'Accounts Receivable', code: '1200', type: 'asset', classification: 'current-asset', description: 'Money owed by customers' },
  { name: 'Inventory', code: '1300', type: 'asset', classification: 'current-asset', description: 'Goods for sale' },
  { name: 'Office Equipment', code: '1500', type: 'asset', classification: 'fixed-asset', description: 'Computers, furniture, etc.' },
  { name: 'Vehicles', code: '1600', type: 'asset', classification: 'fixed-asset', description: 'Company vehicles' },
  
  // Liabilities
  { name: 'Accounts Payable', code: '2001', type: 'liability', classification: 'current-liability', description: 'Money owed to suppliers' },
  { name: 'Credit Card', code: '2002', type: 'liability', classification: 'current-liability', description: 'Company credit card' },
  { name: 'GST Payable', code: '2100', type: 'liability', classification: 'current-liability', description: 'GST/Tax collected to be paid' },
  { name: 'Bank Loan', code: '2500', type: 'liability', classification: 'long-term-liability', description: 'Long-term bank loan' },
  
  // Equity
  { name: 'Owner\'s Capital', code: '3001', type: 'equity', classification: 'owner-equity', description: 'Owner\'s investment' },
  { name: 'Retained Earnings', code: '3900', type: 'equity', classification: 'retained-earnings', description: 'Accumulated earnings' },
  
  // Income
  { name: 'Sales Revenue', code: '4001', type: 'income', classification: 'operating-revenue', description: 'Revenue from sales' },
  { name: 'Service Revenue', code: '4002', type: 'income', classification: 'operating-revenue', description: 'Revenue from services' },
  { name: 'Interest Income', code: '4900', type: 'income', classification: 'non-operating-revenue', description: 'Income from interest' },
  
  // Expenses
  { name: 'Rent Expense', code: '5001', type: 'expense', classification: 'operating-expense', description: 'Office rent' },
  { name: 'Salaries Expense', code: '5002', type: 'expense', classification: 'operating-expense', description: 'Employee salaries' },
  { name: 'Utilities Expense', code: '5003', type: 'expense', classification: 'operating-expense', description: 'Electricity, water, etc.' },
  { name: 'Office Supplies', code: '5100', type: 'expense', classification: 'operating-expense', description: 'Stationery and supplies' },
  { name: 'Bank Charges', code: '5900', type: 'expense', classification: 'non-operating-expense', description: 'Bank fees' },
  { name: 'Income Tax Expense', code: '5950', type: 'expense', classification: 'tax', description: 'Corporate income tax' },
];
