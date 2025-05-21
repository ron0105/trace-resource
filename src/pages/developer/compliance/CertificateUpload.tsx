
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, File, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CertificateUpload = () => {
  const { projectId } = useParams();

  // Mock uploaded certificates
  const certificates = [
    { id: 1, name: "Waste Disposal Certificate", date: "2025-03-15", verified: true },
    { id: 2, name: "C&D Waste Processing Receipt", date: "2025-03-28", verified: false },
  ];

  return (
    <MainLayout pageTitle="Certificate Upload">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Certificate Upload</h1>
            <p className="text-muted-foreground">Project ID: {projectId}</p>
          </div>
          <Button>View All Certificates</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Compliance Certificates</CardTitle>
            <CardDescription>
              Upload certificates from waste processing facilities and recyclers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <p className="mb-2 font-medium">Drag and drop your certificate here</p>
              <p className="text-sm text-muted-foreground mb-4">Or click to browse from your device</p>
              <div className="max-w-xs mx-auto">
                <Label htmlFor="certificateFile" className="sr-only">Choose file</Label>
                <Input id="certificateFile" type="file" className="cursor-pointer" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="certType">Certificate Type</Label>
              <Input id="certType" placeholder="e.g. Waste Disposal Certificate" />
            </div>
            
            <Button className="w-full">Upload Certificate</Button>
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Uploaded Certificates</h3>
              <div className="space-y-3">
                {certificates.map(cert => (
                  <div key={cert.id} className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <File className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">Uploaded on {cert.date}</p>
                      </div>
                    </div>
                    {cert.verified && (
                      <div className="flex items-center gap-1 text-green-500">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Verified</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50">
            <p className="text-xs text-muted-foreground">
              All certificates are verified digitally through our compliance system.
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CertificateUpload;
