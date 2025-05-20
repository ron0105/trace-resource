
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock report data
const carbonData = [
  { month: 'Jan', value: 24 },
  { month: 'Feb', value: 22 },
  { month: 'Mar', value: 21 },
  { month: 'Apr', value: 19 },
  { month: 'May', value: 18 },
  { month: 'Jun', value: 16 },
  { month: 'Jul', value: 15 },
  { month: 'Aug', value: 14 }
];

const waterData = [
  { month: 'Jan', value: 35 },
  { month: 'Feb', value: 32 },
  { month: 'Mar', value: 30 },
  { month: 'Apr', value: 28 },
  { month: 'May', value: 26 },
  { month: 'Jun', value: 25 },
  { month: 'Jul', value: 24 },
  { month: 'Aug', value: 22 }
];

const materialData = [
  { name: 'Recycled', value: 65 },
  { name: 'Sustainable', value: 20 },
  { name: 'Conventional', value: 15 }
];

const COLORS = ['#0E9F6E', '#3B82F6', '#F97316', '#EF4444'];

const certificationData = [
  { name: 'IGBC', score: 85, target: 90 },
  { name: 'GRIHA', score: 78, target: 85 },
  { name: 'LEED', score: 72, target: 80 },
  { name: 'EDGE', score: 80, target: 75 }
];

// Mock project list
const projects = [
  { id: 'PRJ001', name: 'Urban Heights Tower' },
  { id: 'PRJ002', name: 'Green Valley Residences' },
  { id: 'PRJ003', name: 'Eco Apartments Phase 2' }
];

const Reports = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [timeframe, setTimeframe] = useState('Monthly');
  const { toast } = useToast();
  
  const handleDownloadReport = (reportType: string) => {
    toast({
      title: "Report Downloaded",
      description: `${reportType} report has been downloaded.`,
    });
  };

  return (
    <MainLayout pageTitle="ESG Reports & Insights">
      {/* Report Settings */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <select
          value={selectedProject.id}
          onChange={(e) => {
            const project = projects.find(p => p.id === e.target.value);
            if (project) setSelectedProject(project);
          }}
          className="h-10 rounded-md border border-input bg-background px-3 py-2"
        >
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
        
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 py-2"
        >
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Yearly</option>
        </select>
      </div>

      {/* ESG Dashboard */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">ESG Dashboard</TabsTrigger>
          <TabsTrigger value="certifications">Certification Readiness</TabsTrigger>
          <TabsTrigger value="reports">Export Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Carbon Footprint</CardTitle>
                <CardDescription>
                  Monthly carbon emissions (tons CO₂e)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={carbonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#0E9F6E" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Water Usage</CardTitle>
                <CardDescription>
                  Monthly water consumption (kiloliters)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={waterData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#3B82F6" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Material Composition</CardTitle>
                <CardDescription>
                  Breakdown of materials by sustainability category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={materialData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {materialData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Energy Efficiency</CardTitle>
                <CardDescription>
                  Energy consumption trends (kWh/sq.m)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[300px]">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-primary mb-4">
                      <div>
                        <div className="text-4xl font-bold">24%</div>
                        <div className="text-sm text-muted-foreground">Below Baseline</div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                      Your project is 24% more energy efficient than the industry baseline.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="certifications">
          <Card>
            <CardHeader>
              <CardTitle>Certification Readiness</CardTitle>
              <CardDescription>
                Track your progress towards sustainability certifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={certificationData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" name="Current Score" fill="#0E9F6E" />
                    <Bar dataKey="target" name="Target" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {certificationData.map((cert) => (
                    <Card key={cert.name} className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{cert.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Score: {cert.score}/100
                            </p>
                          </div>
                          <div className={`text-sm font-medium ${cert.score >= cert.target ? 'text-green-600' : 'text-amber-600'}`}>
                            {cert.score >= cert.target ? 'Ready' : 'In Progress'}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Certification Gaps</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span>Increase recycled materials by 8% to meet GRIHA requirements</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span>Improve indoor air quality monitoring for LEED certification</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Export Reports</CardTitle>
              <CardDescription>
                Download detailed sustainability and compliance reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">ESG Performance Report</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Comprehensive analysis of Environmental, Social, and Governance metrics
                    </p>
                  </CardContent>
                  <div className="flex justify-between p-4 bg-muted/30 text-sm mt-2">
                    <div>Last generated: 15 days ago</div>
                    <div>PDF, Excel</div>
                  </div>
                  <div className="p-4">
                    <Button 
                      onClick={() => handleDownloadReport('ESG Performance')}
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  </div>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Carbon Footprint Report</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Detailed breakdown of carbon emissions by source and reduction opportunities
                    </p>
                  </CardContent>
                  <div className="flex justify-between p-4 bg-muted/30 text-sm mt-2">
                    <div>Last generated: 8 days ago</div>
                    <div>PDF, Excel</div>
                  </div>
                  <div className="p-4">
                    <Button 
                      onClick={() => handleDownloadReport('Carbon Footprint')}
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  </div>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">SEBI BRSR Report</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Business Responsibility and Sustainability Report as per SEBI guidelines
                    </p>
                  </CardContent>
                  <div className="flex justify-between p-4 bg-muted/30 text-sm mt-2">
                    <div>Last generated: 30 days ago</div>
                    <div>PDF</div>
                  </div>
                  <div className="p-4">
                    <Button 
                      onClick={() => handleDownloadReport('SEBI BRSR')}
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  </div>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Custom Report</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Generate a custom report with your selected metrics and timeframes
                    </p>
                  </CardContent>
                  <div className="p-4">
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      Create Custom Report
                    </Button>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Reports;
