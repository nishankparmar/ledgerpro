
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Receipt, CreditCard, BarChart3, DollarSign, Users } from "lucide-react";

interface NavigationCard {
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
}

const NavigationCards = () => {
  const navigate = useNavigate();
  
  // Navigation cards data
  const navigationCards: NavigationCard[] = [
    { title: "General Ledger", description: "View and manage your complete general ledger", icon: FileText, link: "/ledger" },
    { title: "Transactions", description: "Record and manage financial transactions", icon: Receipt, link: "/transactions" },
    { title: "Accounts", description: "Manage your chart of accounts", icon: CreditCard, link: "/accounts" },
    { title: "Reports", description: "Generate financial reports and statements", icon: BarChart3, link: "/reports" },
    { title: "Tax Management", description: "Track and manage tax obligations", icon: DollarSign, link: "/taxes" },
    { title: "User Access", description: "Manage user roles and permissions", icon: Users, link: "/users" },
    { title: "My Profile", description: "View and edit your personal information", icon: Users, link: "/profile" },
  ];

  return (
    <>
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
    </>
  );
};

export default NavigationCards;
