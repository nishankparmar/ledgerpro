
import { 
  DollarSign, 
  ShoppingBag, 
  BarChart, 
  Users, 
  FileText, 
  Receipt, 
  Upload, 
  ShieldCheck 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Double-Entry Sales Records",
      description: "Automatically create balanced journal entries for every sale, with proper debit and credit entries across accounts.",
      icon: <DollarSign className="h-6 w-6" />
    },
    {
      title: "Purchase Management",
      description: "Record purchases with automatic tax calculations, manage vendor credits, and upload purchase invoices via PDF.",
      icon: <ShoppingBag className="h-6 w-6" />
    },
    {
      title: "Inventory Control",
      description: "Track stock levels, values, and movements with real-time visibility into your inventory across locations.",
      icon: <BarChart className="h-6 w-6" />
    },
    {
      title: "Comprehensive Payroll",
      description: "Calculate salaries, taxes, deductions, and contributions for PF and ESIC with automatic journal entries.",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Statutory Compliance",
      description: "Built-in GST, TDS, PF and ESIC compliance with automated calculations and filing preparation.",
      icon: <ShieldCheck className="h-6 w-6" />
    },
    {
      title: "Financial Reporting",
      description: "Generate balance sheets, profit & loss statements, cash flow reports and more with a single click.",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Invoice Management",
      description: "Create, send, and track professional invoices with automatic account updates when paid.",
      icon: <Receipt className="h-6 w-6" />
    },
    {
      title: "PDF Upload Processing",
      description: "Upload purchase invoices as PDFs and automatically extract and record transaction details.",
      icon: <Upload className="h-6 w-6" />
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-ledger-700 tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Everything you need for complete financial control
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our comprehensive double-entry accounting system ensures accuracy, compliance, and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card group hover:translate-y-[-8px]"
            >
              <div className="feature-icon-container">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-ledger-700 transition-colors">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
