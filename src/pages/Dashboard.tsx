
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Import dashboard components
import KeyMetrics from '@/components/dashboard/KeyMetrics';
import CashFlowChart from '@/components/dashboard/CashFlowChart';
import AccountBalances from '@/components/dashboard/AccountBalances';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import TaxCompliance from '@/components/dashboard/TaxCompliance';
import NavigationCards from '@/components/dashboard/NavigationCards';
import LogoutDialog from '@/components/dashboard/LogoutDialog';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

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
          <LogoutDialog />
        </div>
      </div>

      {/* Key Metrics Section */}
      <KeyMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Cash Flow Chart */}
        <CashFlowChart />
        {/* Account Balances */}
        <AccountBalances />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Transactions */}
        <RecentTransactions />
        {/* Tax Compliance */}
        <TaxCompliance />
      </div>

      {/* Quick Actions */}
      <NavigationCards />
    </div>
  );
};

export default Dashboard;
