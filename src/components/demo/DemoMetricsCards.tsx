
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoMaturitySummary } from "@/data/demoData";
import { TrendingUp, Shield, AlertTriangle } from "lucide-react";

const DemoMetricsCards = () => {
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

  return (
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
  );
};

export default DemoMetricsCards;
