
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ShoppingBag, BarChart, Check } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted/30">
      {/* Header/Hero Section */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 h-8 w-8 rounded-md"></div>
          <span className="font-semibold text-xl">Trace</span>
        </div>
        <Button onClick={() => navigate('/auth')}>Login</Button>
      </header>

      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Sustainability Compliance Platform
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Simplifying compliance management and sustainable material procurement for the construction industry
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth')}>
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Core Modules</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="bg-primary/10 p-2 rounded-md w-fit mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Compliance Engine</CardTitle>
                <CardDescription>Submit and track EPR and WMUP documents</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Automated document validation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Real-time approval tracking</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Regulatory report generation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-secondary/10 p-2 rounded-md w-fit mb-4">
                  <ShoppingBag className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Marketplace</CardTitle>
                <CardDescription>Source verified sustainable materials</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Certified sustainable products</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Transparent traceability scores</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Streamlined procurement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-accent/10 p-2 rounded-md w-fit mb-4">
                  <BarChart className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Reporting & Insights</CardTitle>
                <CardDescription>Track ESG metrics and generate reports</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Comprehensive analytics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Certification readiness tracking</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>SEBI BRSR report generation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* User Types */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Built For Your Role</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Developers</h3>
                <p className="text-muted-foreground mb-4">
                  Streamline compliance documentation and sourcing of sustainable materials for your projects.
                </p>
                <ul className="space-y-2">
                  <li className="text-sm">• Simple project management</li>
                  <li className="text-sm">• Automated compliance tracking</li>
                  <li className="text-sm">• Verified sustainable materials</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Recyclers & Vendors</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with developers and showcase your sustainable materials with certification.
                </p>
                <ul className="space-y-2">
                  <li className="text-sm">• Targeted customer access</li>
                  <li className="text-sm">• Streamlined order management</li>
                  <li className="text-sm">• Enhanced visibility for certified products</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Administrators</h3>
                <p className="text-muted-foreground mb-4">
                  Efficiently review compliance submissions and generate comprehensive reports.
                </p>
                <ul className="space-y-2">
                  <li className="text-sm">• Centralized document management</li>
                  <li className="text-sm">• Automated reviews and approvals</li>
                  <li className="text-sm">• ESG compliance monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Sustainability Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the Trace Platform and transform how you manage compliance and sustainable materials.
          </p>
          <Button size="lg" onClick={() => navigate('/auth')}>
            Create Your Account
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 h-8 w-8 rounded-md"></div>
              <span className="font-semibold text-xl">Trace</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Trace Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
