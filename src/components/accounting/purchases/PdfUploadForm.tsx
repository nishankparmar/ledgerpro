
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, CheckCircle, AlertCircle, ArrowRight, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface PdfUploadFormProps {
  onProcessComplete?: (data: any) => void;
}

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

const PdfUploadForm: React.FC<PdfUploadFormProps> = ({ onProcessComplete }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  // Mock data for extraction preview
  const extractedData = {
    supplier: 'Office Supplies Co.',
    invoiceNumber: 'INV-12345',
    date: '2023-05-15',
    items: [
      { description: 'Premium Paper (500 sheets)', quantity: 5, unitPrice: 12.99, total: 64.95 },
      { description: 'Black Ink Cartridge', quantity: 2, unitPrice: 24.50, total: 49.00 },
      { description: 'Stapler', quantity: 1, unitPrice: 8.75, total: 8.75 },
    ],
    subtotal: 122.70,
    tax: 12.27,
    total: 134.97
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        toast({
          title: 'Invalid file type',
          description: 'Please select a PDF file',
          variant: 'destructive'
        });
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        toast({
          title: 'Invalid file type',
          description: 'Please select a PDF file',
          variant: 'destructive'
        });
      }
    }
  };

  const simulateUploadAndProcess = () => {
    if (!selectedFile) return;
    
    setUploadStatus('uploading');
    setProgress(0);
    
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    
    // Simulate upload completion
    setTimeout(() => {
      clearInterval(uploadInterval);
      setProgress(100);
      setUploadStatus('processing');
      
      // Simulate OCR processing
      setTimeout(() => {
        setUploadStatus('complete');
        toast({
          title: 'PDF processed successfully',
          description: 'Data has been extracted from the invoice',
        });
      }, 2000);
    }, 2000);
  };

  const handleProcess = () => {
    simulateUploadAndProcess();
  };

  const handleViewResults = () => {
    setShowPreview(true);
    if (onProcessComplete) {
      onProcessComplete(extractedData);
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Upload Purchase Invoice</CardTitle>
          <CardDescription>
            Upload a PDF invoice to automatically extract information using OCR technology
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              uploadStatus === 'idle' ? 'border-gray-200 hover:border-ledger-500 transition-colors' : 'border-gray-200'
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {uploadStatus === 'idle' && (
              <>
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-ledger-100 text-ledger-700 mb-4">
                  <Upload className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-medium text-gray-900">Upload Purchase Invoice PDF</h4>
                <p className="mt-2 text-gray-500">Drag and drop PDF file here, or click to browse</p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="pdf-upload"
                />
                <Button className="mt-4 bg-ledger-700 hover:bg-ledger-800" onClick={() => document.getElementById('pdf-upload')?.click()}>
                  Select File
                </Button>
                {selectedFile && (
                  <div className="mt-4 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-ledger-700 mr-2" />
                    <span className="text-sm">{selectedFile.name}</span>
                  </div>
                )}
              </>
            )}

            {uploadStatus === 'uploading' && (
              <div className="py-8">
                <div className="flex justify-center mb-4">
                  <FileText className="h-12 w-12 text-ledger-700" />
                </div>
                <h4 className="text-lg font-medium mb-2">Uploading file...</h4>
                <Progress value={progress} className="w-full max-w-md mx-auto" />
                <p className="text-sm text-muted-foreground mt-2">{progress}% complete</p>
              </div>
            )}

            {uploadStatus === 'processing' && (
              <div className="py-8">
                <div className="flex justify-center mb-4">
                  <Search className="h-12 w-12 text-ledger-700 animate-pulse" />
                </div>
                <h4 className="text-lg font-medium mb-2">Processing invoice...</h4>
                <p className="text-sm text-muted-foreground">
                  Extracting data from your invoice using OCR technology
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="h-8 w-8 border-2 border-ledger-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            )}

            {uploadStatus === 'complete' && (
              <div className="py-8">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h4 className="text-lg font-medium mb-2">Processing complete!</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  We've successfully extracted information from your invoice
                </p>
                <Button onClick={handleViewResults} className="bg-ledger-700 hover:bg-ledger-800">
                  View Results <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {uploadStatus === 'error' && (
              <div className="py-8">
                <div className="flex justify-center mb-4">
                  <AlertCircle className="h-12 w-12 text-red-500" />
                </div>
                <h4 className="text-lg font-medium mb-2">Processing failed</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  We couldn't process your invoice. Please try again or use manual entry.
                </p>
                <Button onClick={() => setUploadStatus('idle')} variant="outline">
                  Try Again
                </Button>
              </div>
            )}
          </div>
          
          {uploadStatus === 'idle' && selectedFile && (
            <div className="mt-4 flex justify-end">
              <Button onClick={handleProcess}>
                Process Invoice
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Extracted Invoice Data</DialogTitle>
            <DialogDescription>
              Review the data extracted from your invoice. You can edit any field if needed.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 my-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Supplier</h3>
              <p className="text-sm border p-2 rounded bg-muted">{extractedData.supplier}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">Invoice Number</h3>
              <p className="text-sm border p-2 rounded bg-muted">{extractedData.invoiceNumber}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">Date</h3>
              <p className="text-sm border p-2 rounded bg-muted">{extractedData.date}</p>
            </div>
          </div>
          
          <div className="my-4">
            <h3 className="text-sm font-medium mb-2">Items</h3>
            <div className="border rounded overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">Description</th>
                    <th className="px-3 py-2 text-right font-medium">Qty</th>
                    <th className="px-3 py-2 text-right font-medium">Unit Price</th>
                    <th className="px-3 py-2 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {extractedData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2">{item.description}</td>
                      <td className="px-3 py-2 text-right">{item.quantity}</td>
                      <td className="px-3 py-2 text-right">${item.unitPrice.toFixed(2)}</td>
                      <td className="px-3 py-2 text-right">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-muted/50">
                    <td colSpan={3} className="px-3 py-2 text-right font-medium">Subtotal:</td>
                    <td className="px-3 py-2 text-right">${extractedData.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td colSpan={3} className="px-3 py-2 text-right font-medium">Tax:</td>
                    <td className="px-3 py-2 text-right">${extractedData.tax.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td colSpan={3} className="px-3 py-2 text-right font-medium">Total:</td>
                    <td className="px-3 py-2 text-right font-medium">${extractedData.total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Cancel
            </Button>
            <Button>
              Create Purchase Entry
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PdfUploadForm;
