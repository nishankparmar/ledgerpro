
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  FileText, 
  DollarSign, 
  CreditCard, 
  BarChart4, 
  FileDigit
} from "lucide-react";

const NavigationCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="w-12 h-12 rounded-lg bg-ledger-100 flex items-center justify-center mb-2">
            <BookOpen className="h-6 w-6 text-ledger-700" />
          </div>
          <CardTitle>Chart of Accounts</CardTitle>
          <CardDescription>Manage your financial accounts structure</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Create, edit and organize your accounts to track assets, liabilities, equity, income, and expenses.
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full bg-ledger-700 hover:bg-ledger-800">
            <Link to="/accounts">View Accounts</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="w-12 h-12 rounded-lg bg-ledger-100 flex items-center justify-center mb-2">
            <FileDigit className="h-6 w-6 text-ledger-700" />
          </div>
          <CardTitle>General Ledger</CardTitle>
          <CardDescription>View all financial transactions</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Record and manage all financial transactions with proper double-entry accounting.
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full bg-ledger-700 hover:bg-ledger-800">
            <Link to="/ledger">View Ledger</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="w-12 h-12 rounded-lg bg-ledger-100 flex items-center justify-center mb-2">
            <FileText className="h-6 w-6 text-ledger-700" />
          </div>
          <CardTitle>Purchases</CardTitle>
          <CardDescription>Manage supplier invoices & payments</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Record expenses, upload invoice PDFs with OCR extraction, and track payments to suppliers.
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full bg-ledger-700 hover:bg-ledger-800">
            <Link to="/purchases">Manage Purchases</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="w-12 h-12 rounded-lg bg-ledger-100 flex items-center justify-center mb-2">
            <DollarSign className="h-6 w-6 text-ledger-700" />
          </div>
          <CardTitle>Sales & Invoicing</CardTitle>
          <CardDescription>Create and manage customer invoices</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Generate professional invoices, track payments, and manage customer accounts.
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" disabled>
            Coming Soon
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="w-12 h-12 rounded-lg bg-ledger-100 flex items-center justify-center mb-2">
            <CreditCard className="h-6 w-6 text-ledger-700" />
          </div>
          <CardTitle>Banking</CardTitle>
          <CardDescription>Connect and reconcile bank accounts</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Link bank accounts, import transactions, and reconcile statements with your records.
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" disabled>
            Coming Soon
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="w-12 h-12 rounded-lg bg-ledger-100 flex items-center justify-center mb-2">
            <BarChart4 className="h-6 w-6 text-ledger-700" />
          </div>
          <CardTitle>Financial Reports</CardTitle>
          <CardDescription>Generate detailed financial statements</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Create and download reports including trial balance, profit & loss, and balance sheets.
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" disabled>
            Coming Soon
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NavigationCards;
