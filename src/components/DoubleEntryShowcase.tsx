
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const DoubleEntryShowcase = () => {
  const [activeTab, setActiveTab] = useState('sales');

  const tabs = [
    { id: 'sales', label: 'Sales Recording' },
    { id: 'purchases', label: 'Purchase Processing' },
    { id: 'payroll', label: 'Payroll Management' },
    { id: 'compliance', label: 'Statutory Compliance' }
  ];

  const showcaseData = {
    sales: {
      title: "Double-Entry Sales Recording",
      description: "When a sale is recorded, LedgER Pro automatically creates balanced journal entries with proper debits and credits.",
      steps: [
        { name: "Create Invoice", description: "Generate a professional sales invoice for your customer" },
        { name: "Automatic Entries", description: "System debits Accounts Receivable and credits Sales and Tax accounts" },
        { name: "GST Calculation", description: "Automatic GST calculation and allocation to appropriate tax accounts" },
        { name: "Financial Impact", description: "Immediate update to P&L, balance sheet and tax reports" }
      ],
      entries: [
        { account: "Accounts Receivable", debit: "₹11,800", credit: "" },
        { account: "Sales Revenue", debit: "", credit: "₹10,000" },
        { account: "IGST Payable", debit: "", credit: "₹1,800" }
      ]
    },
    purchases: {
      title: "Double-Entry Purchase Processing",
      description: "Upload purchase invoices as PDFs and let LedgER Pro handle the accounting entries automatically.",
      steps: [
        { name: "Upload PDF Invoice", description: "Simply upload vendor invoices in PDF format" },
        { name: "Data Extraction", description: "System extracts vendor, amount, tax and other key information" },
        { name: "TDS Calculation", description: "Automatic TDS calculation for applicable purchases" },
        { name: "Entry Generation", description: "System creates balanced entries with proper expense classification" }
      ],
      entries: [
        { account: "Office Supplies Expense", debit: "₹5,000", credit: "" },
        { account: "Input CGST", debit: "₹450", credit: "" },
        { account: "Input SGST", debit: "₹450", credit: "" },
        { account: "TDS Payable", debit: "", credit: "₹500" },
        { account: "Accounts Payable", debit: "", credit: "₹5,400" }
      ]
    },
    payroll: {
      title: "Double-Entry Payroll Management",
      description: "LedgER Pro handles complex payroll accounting with automatic entries for PF, ESIC and other deductions.",
      steps: [
        { name: "Process Payroll", description: "Calculate employee salaries, benefits and deductions" },
        { name: "PF & ESIC Calculation", description: "Automatic calculation of PF and ESIC for both employee and employer" },
        { name: "Tax Withholding", description: "Proper handling of TDS and professional tax deductions" },
        { name: "Payment Processing", description: "Generate payment instructions for employees and statutory authorities" }
      ],
      entries: [
        { account: "Salary Expense", debit: "₹50,000", credit: "" },
        { account: "Employer PF Contribution", debit: "₹4,500", credit: "" },
        { account: "Employer ESIC Contribution", debit: "₹1,625", credit: "" },
        { account: "Employee PF Payable", debit: "", credit: "₹4,500" },
        { account: "Employee ESIC Payable", debit: "", credit: "₹750" },
        { account: "TDS Payable", debit: "", credit: "₹5,000" },
        { account: "Salary Payable", debit: "", credit: "₹45,875" }
      ]
    },
    compliance: {
      title: "Statutory Compliance Management",
      description: "Stay compliant with automatic calculations and reports for GST, TDS, PF, and ESIC requirements.",
      steps: [
        { name: "Automatic Calculations", description: "System calculates all statutory dues as transactions are recorded" },
        { name: "Compliance Reports", description: "Generate GST, TDS, PF and ESIC reports with a single click" },
        { name: "Return Preparation", description: "Prepare return filings with pre-filled data from your transactions" },
        { name: "Payment Management", description: "Track due dates and manage payments to regulatory authorities" }
      ],
      entries: [
        { account: "CGST Payable", debit: "₹45,000", credit: "" },
        { account: "SGST Payable", debit: "₹45,000", credit: "" },
        { account: "IGST Payable", debit: "₹10,000", credit: "" },
        { account: "Bank Account", debit: "", credit: "₹100,000" }
      ]
    }
  };

  const currentShowcase = showcaseData[activeTab as keyof typeof showcaseData];

  return (
    <section className="py-20 bg-ledger-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-ledger-700 tracking-wide uppercase">Core Functionality</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Double-Entry System for Perfect Accuracy
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Experience the reliability and precision of our double-entry bookkeeping system, ensuring your financial records are always balanced.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-10">
          <div className="flex overflow-x-auto hide-scrollbar space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={cn(
                  "py-4 px-1 font-medium text-sm border-b-2 whitespace-nowrap transition-colors",
                  activeTab === tab.id 
                    ? "border-ledger-700 text-ledger-700" 
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Column: Description and Steps */}
          <div className="mb-10 lg:mb-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentShowcase.title}</h3>
            <p className="text-lg text-gray-600 mb-8">{currentShowcase.description}</p>
            
            <div className="space-y-6">
              {currentShowcase.steps.map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-ledger-100 text-ledger-700 font-medium">
                      {index + 1}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{step.name}</h4>
                    <p className="mt-1 text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Journal Entry Visualization */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="bg-ledger-700 text-white px-6 py-4">
              <h4 className="font-medium">Journal Entry Example</h4>
            </div>
            <div className="p-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 font-medium text-gray-500">Account</th>
                    <th className="pb-3 font-medium text-gray-500 text-right">Debit</th>
                    <th className="pb-3 font-medium text-gray-500 text-right">Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {currentShowcase.entries.map((entry, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 text-gray-900">{entry.account}</td>
                      <td className="py-3 text-gray-900 text-right font-medium text-emerald-600">{entry.debit}</td>
                      <td className="py-3 text-gray-900 text-right font-medium text-blue-600">{entry.credit}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td className="py-3 font-medium">Total</td>
                    <td className="py-3 font-medium text-right text-emerald-700">
                      ₹{currentShowcase.entries.reduce((sum, entry) => sum + (entry.debit ? parseInt(entry.debit.replace(/[^\d]/g, '')) : 0), 0).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 font-medium text-right text-blue-700">
                      ₹{currentShowcase.entries.reduce((sum, entry) => sum + (entry.credit ? parseInt(entry.credit.replace(/[^\d]/g, '')) : 0), 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-gray-500">Double-entry ensures that Debits = Credits</span>
                <a href="#" className="text-ledger-700 hover:text-ledger-800 font-medium flex items-center">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoubleEntryShowcase;
