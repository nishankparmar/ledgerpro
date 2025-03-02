
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CashFlowChart = () => {
  return (
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
  );
};

export default CashFlowChart;
