
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download, FileText, Upload } from 'lucide-react';
import PdfUploadForm from '@/components/accounting/purchases/PdfUploadForm';
import PdfUploadFeature from '@/components/PdfUploadFeature';

const Purchases: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('transactions');

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-ledger-800">Purchases</h1>
          <p className="text-ledger-500 mt-1">Manage supplier invoices and payments</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button 
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            <span>New Purchase</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="transactions" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="upload">Upload Invoice</TabsTrigger>
          <TabsTrigger value="demo">Demo Features</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Purchase Transactions</CardTitle>
              <CardDescription>View and manage your purchase invoices and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No purchase transactions yet</h3>
                  <p className="text-muted-foreground mb-4">Start by creating a new purchase or uploading an invoice</p>
                  <div className="flex justify-center gap-2">
                    <Button variant="outline" onClick={() => setActiveTab('upload')}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Invoice
                    </Button>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Purchase
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <PdfUploadForm />
          </div>
        </TabsContent>
        
        <TabsContent value="demo">
          <PdfUploadFeature />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Purchases;
