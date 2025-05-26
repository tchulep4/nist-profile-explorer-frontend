
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { demoMaturitySummary } from "@/data/demoData";

const DemoMaturityChart = () => {
  return (
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
  );
};

export default DemoMaturityChart;
