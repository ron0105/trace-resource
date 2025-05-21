
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, File, FileText, Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DownloadCenter = () => {
  // Mock documents
  const documents = [
    { 
      id: 1, 
      name: "WMUP Compliance Report - Greenfield Residences", 
      type: "compliance", 
      date: "2025-04-15",
      size: "2.4 MB",
      format: "PDF"
    },
    { 
      id: 2, 
      name: "Q1 2025 Quarterly Returns - All Projects", 
      type: "returns", 
      date: "2025-04-12",
      size: "3.8 MB",
      format: "PDF"
    },
    { 
      id: 3, 
      name: "ESG Impact Report - Urban Heights", 
      type: "esg", 
      date: "2025-03-28",
      size: "5.1 MB",
      format: "PDF"
    },
    { 
      id: 4, 
      name: "Waste Utilization Certificates - Metro Park", 
      type: "certificates", 
      date: "2025-03-22",
      size: "1.7 MB",
      format: "ZIP"
    },
    { 
      id: 5, 
      name: "EPR Submission Records - All Projects", 
      type: "compliance", 
      date: "2025-03-15",
      size: "4.2 MB",
      format: "PDF"
    }
  ];

  // Get badge for document type
  const getDocumentBadge = (type) => {
    switch(type) {
      case "compliance":
        return <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-600">Compliance</Badge>;
      case "returns":
        return <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-600">Returns</Badge>;
      case "esg":
        return <Badge variant="outline" className="bg-green-50 border-green-200 text-green-600">ESG</Badge>;
      case "certificates":
        return <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-600">Certificates</Badge>;
      default:
        return <Badge variant="outline">Other</Badge>;
    }
  };

  return (
    <MainLayout pageTitle="Download Center">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Download Center</h1>
            <p className="text-muted-foreground">Access and download all your reports and documents</p>
          </div>
          <Button className="gap-2">
            <ChevronDown className="h-4 w-4" />
            Sort by Date
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for reports, certificates, or documents..." 
            className="pl-10 h-10"
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="esg">ESG Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Documents</CardTitle>
                <CardDescription>
                  Browse all your compliance documents and reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between border rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        {doc.format === "PDF" ? (
                          <FileText className="h-8 w-8 text-primary/70" />
                        ) : (
                          <File className="h-8 w-8 text-primary/70" />
                        )}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{doc.name}</h3>
                            {getDocumentBadge(doc.type)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {doc.date} • {doc.size} • {doc.format}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compliance">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Documents</CardTitle>
                <CardDescription>
                  Compliance-related reports and documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.filter(d => d.type === "compliance").map(doc => (
                    <div key={doc.id} className="flex items-center justify-between border rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        {doc.format === "PDF" ? (
                          <FileText className="h-8 w-8 text-primary/70" />
                        ) : (
                          <File className="h-8 w-8 text-primary/70" />
                        )}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{doc.name}</h3>
                            {getDocumentBadge(doc.type)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {doc.date} • {doc.size} • {doc.format}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Similar content structure for other tabs */}
          <TabsContent value="returns">
            <Card>
              <CardHeader>
                <CardTitle>Returns Documents</CardTitle>
                <CardDescription>
                  Quarterly returns and submission documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.filter(d => d.type === "returns").map(doc => (
                    <div key={doc.id} className="flex items-center justify-between border rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        {doc.format === "PDF" ? (
                          <FileText className="h-8 w-8 text-primary/70" />
                        ) : (
                          <File className="h-8 w-8 text-primary/70" />
                        )}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{doc.name}</h3>
                            {getDocumentBadge(doc.type)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {doc.date} • {doc.size} • {doc.format}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default DownloadCenter;
