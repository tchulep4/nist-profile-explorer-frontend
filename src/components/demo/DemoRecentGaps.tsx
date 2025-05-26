
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { demoAssessments, demoSubcategories } from "@/data/demoData";
import { Lock } from "lucide-react";

const DemoRecentGaps = () => {
  const navigate = useNavigate();

  const recentGaps = demoAssessments
    .filter(assessment => assessment.status !== "Implemented")
    .slice(0, 5);

  return (
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
  );
};

export default DemoRecentGaps;
