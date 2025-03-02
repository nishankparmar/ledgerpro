
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowRight, BarChart3, CreditCard, DollarSign, FileText, LogOut, PiggyBank, Receipt, Users } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

// Define Rupee formatting function
export const formatRupees = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate('/login');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "An error occurred while logging out",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-ledger-500 border-b-ledger-300 border-l-ledger-300 border-r-ledger-300 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-ledger-700 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Mock data for financial metrics - updated to use Rupees
  const keyMetrics = [
    { title: "Total Revenue", value: formatRupees(2432549), change: "+12.5%", icon: DollarSign, color: "text-green-500" },
    { title: "Total Expenses", value: formatRupees(1283500), change: "-2.3%", icon: CreditCard, color: "text-red-500" },
    { title: "Net Profit", value: formatRupees(1149049), change: "+18.7%", icon: PiggyBank, color: "text-blue-500" },
    { title: "Cash Flow", value: formatRupees(845020), change: "+6.1%", icon: BarChart3, color: "text-purple-500" },
  ];

  // Mock data for account balances - updated to use Rupees
  const accountBalances = [
    { name: "Primary Checking", type: "Asset", balance: formatRupees(1523456) },
    { name: "Business Savings", type: "Asset", balance: formatRupees(4267890) },
    { name: "Credit Card", type: "Liability", balance: formatRupees(-345678) },
    { name: "Equipment Loan", type: "Liability", balance: formatRupees(-1250000) },
  ];

  // Mock data for recent transactions - updated to use Rupees
  const recentTransactions = [
    { id: "T1001", date: "2023-06-18", description: "Office Supplies", amount: formatRupees(-23456), category: "Expense" },
    { id: "T1002", date: "2023-06-17", description: "Client Payment - ABC Corp", amount: formatRupees(150000), category: "Income" },
    { id: "T1003", date: "2023-06-15", description: "Monthly Rent", amount: formatRupees(-200000), category: "Expense" },
    { id: "T1004", date: "2023-06-14", description: "Consulting Services", amount: formatRupees(325000), category: "Income" },
  ];

  // Mock data for tax compliance
  const taxCompliance = [
    { type: "GST Filing", status: "Pending", dueDate: "2023-07-15", completed: false },
    { type: "TDS Return", status: "Completed", dueDate: "2023-06-30", completed: true },
    { type: "Annual Tax Filing", status: "Upcoming", dueDate: "2023-09-30", completed: false },
  ];

  // Quick action navigation cards
  const navigationCards = [
    { title: "General Ledger", description: "View and manage your complete general ledger", icon: FileText, link: "/ledger" },
    { title: "Transactions", description: "Record and manage financial transactions", icon: Receipt, link: "/transactions" },
    { title: "Accounts", description: "Manage your chart of accounts", icon: CreditCard, link: "/accounts" },
    { title: "Reports", description: "Generate financial reports and statements", icon: BarChart3, link: "/reports" },
    { title: "Tax Management", description: "Track and manage tax obligations", icon: DollarSign, link: "/taxes" },
    { title: "User Access", description: "Manage user roles and permissions", icon: Users, link: "/users" },
    { title: "My Profile", description: "View and edit your personal information", icon: Users, link: "/profile" },
  ];

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-ledger-800">Financial Dashboard</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-ledger-500 hidden sm:block">
            Last updated: {new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will be logged out of your account and redirected to the login page.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Key Metrics Section */}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Cash Flow Chart */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Cash Flow Overview</CardTitle>
            <CardDescription>Monthly income vs. expenses comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded bg-slate-50">
              <p className="text-muted-foreground">Cash flow chart visualization will appear here</p>
            </div>
          </CardContent>
        </Card>

        {/* Account Balances */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Account Balances</CardTitle>
            <CardDescription>Current balances of your accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accountBalances.map((account, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-muted-foreground">{account.type}</p>
                  </div>
                  <p className={`font-mono font-medium ${account.balance.includes('-') ? 'text-red-500' : 'text-green-600'}`}>
                    {account.balance}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Transactions */}
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

        {/* Tax Compliance */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Tax Compliance</CardTitle>
            <CardDescription>Upcoming and recent tax filings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {taxCompliance.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`mt-0.5 w-3 h-3 rounded-full ${
                    item.status === "Completed" ? "bg-green-500" : 
                    item.status === "Pending" ? "bg-amber-500" : "bg-blue-400"
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium">{item.type}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-muted-foreground">Due: {item.dueDate}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.status === "Completed" ? "bg-green-100 text-green-800" : 
                        item.status === "Pending" ? "bg-amber-100 text-amber-800" : 
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-bold mb-4 text-ledger-800">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {navigationCards.map((card, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-ledger-100 p-3 rounded-full">
                  <card.icon className="h-6 w-6 text-ledger-700" />
                </div>
                <div>
                  <CardTitle className="text-lg mb-1">{card.title}</CardTitle>
                  <CardDescription className="mb-4">{card.description}</CardDescription>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => navigate(card.link)}
                  >
                    Go to {card.title} <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
