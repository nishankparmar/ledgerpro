
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TaxComplianceItem {
  type: string;
  status: string;
  dueDate: string;
  completed: boolean;
}

const TaxCompliance = () => {
  // Mock data for tax compliance
  const taxCompliance: TaxComplianceItem[] = [
    { type: "GST Filing", status: "Pending", dueDate: "2023-07-15", completed: false },
    { type: "TDS Return", status: "Completed", dueDate: "2023-06-30", completed: true },
    { type: "Annual Tax Filing", status: "Upcoming", dueDate: "2023-09-30", completed: false },
  ];

  return (
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
  );
};

export default TaxCompliance;
