
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, CreditCard, PiggyBank, BarChart3 } from "lucide-react";
import { formatRupees } from "@/utils/currency";

interface KeyMetric {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}

// Component for the key metrics section
const KeyMetrics = () => {
  // Mock data for financial metrics
  const keyMetrics: KeyMetric[] = [
    { title: "Total Revenue", value: formatRupees(2432549), change: "+12.5%", icon: DollarSign, color: "text-green-500" },
    { title: "Total Expenses", value: formatRupees(1283500), change: "-2.3%", icon: CreditCard, color: "text-red-500" },
    { title: "Net Profit", value: formatRupees(1149049), change: "+18.7%", icon: PiggyBank, color: "text-blue-500" },
    { title: "Cash Flow", value: formatRupees(845020), change: "+6.1%", icon: BarChart3, color: "text-purple-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {keyMetrics.map((metric, index) => (
        <Card key={index} className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                <h3 className="text-2xl font-bold">{metric.value}</h3>
                <p className={`text-sm mt-1 ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change} from last month
                </p>
              </div>
              <div className={`p-2 rounded-full bg-opacity-10 ${metric.color === 'text-green-500' ? 'bg-green-100' : 
                             metric.color === 'text-red-500' ? 'bg-red-100' : 
                             metric.color === 'text-blue-500' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KeyMetrics;
