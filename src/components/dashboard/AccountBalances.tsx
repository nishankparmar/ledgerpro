
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRupees } from "@/utils/currency";

interface AccountBalance {
  name: string;
  type: string;
  balance: string;
}

const AccountBalances = () => {
  // Mock data for account balances
  const accountBalances: AccountBalance[] = [
    { name: "Primary Checking", type: "Asset", balance: formatRupees(1523456) },
    { name: "Business Savings", type: "Asset", balance: formatRupees(4267890) },
    { name: "Credit Card", type: "Liability", balance: formatRupees(-345678) },
    { name: "Equipment Loan", type: "Liability", balance: formatRupees(-1250000) },
  ];

  return (
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
  );
};

export default AccountBalances;
