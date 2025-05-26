import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { demoMaturitySummary, demoAssessments, demoSubcategories } from "@/data/demoData";
import { Badge } from "@/components/ui/badge";
import { Lock, TrendingUp, Shield, AlertTriangle, Eye } from "lucide-react";

const DemoOverview = () => {
  const navigate = useNavigate();

  const calculateTotalMaturity = () => {
    const totalImplemented = demoMaturitySummary.reduce(
      (sum, item) => sum + item.implemented,
      0
    );
    const totalControls = demoMaturitySummary.reduce(
      (sum, item) => sum + item.total_controls,
      0
    );
    
    return totalControls ? Math.round((totalImplemented / totalControls) * 100) : 0;
  };

  const totalMaturityPercentage = calculateTotalMaturity();

  const recentGaps = demoAssessments
    .filter(assessment => assessment.status !== "Implemented")
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Demo Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Explore the NIST Framework Profile Explorer capabilities
          </p>
        </div>
        <Badge variant="outline" className="text-orange-600 border-orange-600">
          <Eye className="w-4 h-4 mr-1" />
          Demo Mode
        </Badge>
      </div>

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">
              🚀 Experience the Full NIST Framework Management
            </h3>
            <p className="text-blue-700 mt-1">
              This demo shows sample data. Sign up to manage your real cybersecurity framework implementation.
            </p>
          </div>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Start Free Trial
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Overall Maturity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {totalMaturityPercentage}%
            </div>
            <p className="text-xs text-muted-foreground">
              Implementation Score
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Total Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {demoMaturitySummary.reduce((sum, item) => sum + item.total_controls, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              NIST Framework Controls
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Implemented Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {demoMaturitySummary.reduce((sum, item) => sum + item.implemented, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Ready & Operational
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Pending Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {demoMaturitySummary.reduce((sum, item) => sum + item.not_implemented + item.partially_implemented, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Need Attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Maturity by Function</CardTitle>
            <CardDescription>
              NIST Framework implementation status by function
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demoMaturitySummary.map((item) => (
                <div key={item.function_code} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{item.function_code}</div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round((item.implemented / item.total_controls) * 100)}%
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${(item.implemented / item.total_controls) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Gaps</CardTitle>
            <CardDescription>
              Controls that need attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGaps.map((gap, index) => {
                const subcategory = demoSubcategories.find(sub => sub.id === gap.subcategoryId);
                return (
                  <div key={index} className="border-b pb-2 last:border-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{subcategory?.code}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {subcategory?.name}
                        </p>
                      </div>
                      <Badge 
                        variant={gap.status === "Not Implemented" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {gap.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Owner: {gap.owner}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  View all gaps & detailed reports
                </span>
              </div>
              <Button size="sm" variant="outline" onClick={() => navigate('/auth')}>
                Unlock
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DemoOverview;
