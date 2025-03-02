
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { formatRupees } from "@/utils/currency";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: string;
  category: string;
}

const RecentTransactions = () => {
  // Mock data for recent transactions
  const recentTransactions: Transaction[] = [
    { id: "T1001", date: "2023-06-18", description: "Office Supplies", amount: formatRupees(-23456), category: "Expense" },
    { id: "T1002", date: "2023-06-17", description: "Client Payment - ABC Corp", amount: formatRupees(150000), category: "Income" },
    { id: "T1003", date: "2023-06-15", description: "Monthly Rent", amount: formatRupees(-200000), category: "Expense" },
    { id: "T1004", date: "2023-06-14", description: "Consulting Services", amount: formatRupees(325000), category: "Income" },
  ];

  return (
    <Card className="lg:col-span-2 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activities</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          View All <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b text-sm">
                <th className="pb-2 font-medium text-muted-foreground">ID</th>
                <th className="pb-2 font-medium text-muted-foreground">Date</th>
                <th className="pb-2 font-medium text-muted-foreground">Description</th>
                <th className="pb-2 font-medium text-muted-foreground text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b last:border-0">
                  <td className="py-3 text-sm">{transaction.id}</td>
                  <td className="py-3 text-sm">{transaction.date}</td>
                  <td className="py-3 text-sm">{transaction.description}</td>
                  <td className={`py-3 text-sm text-right font-mono ${!transaction.amount.includes('-') ? 'text-green-600' : 'text-red-500'}`}>
                    {transaction.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
