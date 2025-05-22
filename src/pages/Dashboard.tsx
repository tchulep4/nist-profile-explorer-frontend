
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface MaturitySummary {
  function_code: string;
  total_controls: number;
  implemented: number;
  not_implemented: number;
  partially_implemented: number;
}

const Dashboard = () => {
  const { user } = useAuth();

  const { data: maturitySummary, isLoading } = useQuery({
    queryKey: ["maturitySummary"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("report_maturity_summary");
      
      if (error) throw error;
      return data as MaturitySummary[];
    },
  });

  const { data: gapsByOwner } = useQuery({
    queryKey: ["gapsByOwner", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("report_gaps_by_owner", {
        owner_filter: user?.id
      });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const calculateTotalMaturity = () => {
    if (!maturitySummary || maturitySummary.length === 0) return 0;
    
    const totalImplemented = maturitySummary.reduce(
      (sum, item) => sum + item.implemented,
      0
    );
    const totalControls = maturitySummary.reduce(
      (sum, item) => sum + item.total_controls,
      0
    );
    
    return totalControls ? Math.round((totalImplemented / totalControls) * 100) : 0;
  };

  const totalMaturityPercentage = calculateTotalMaturity();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overall Maturity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {isLoading ? "Loading..." : `${totalMaturityPercentage}%`}
            </div>
            <p className="text-xs text-muted-foreground">
              Implementation Score
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {isLoading ? "Loading..." : maturitySummary?.reduce(
                (sum, item) => sum + item.total_controls,
                0
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Implemented Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {isLoading ? "Loading..." : maturitySummary?.reduce(
                (sum, item) => sum + item.implemented,
                0
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {isLoading ? "Loading..." : maturitySummary?.reduce(
                (sum, item) => sum + item.not_implemented + item.partially_implemented,
                0
              )}
            </div>
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
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-4">
                {maturitySummary?.map((item) => (
                  <div key={item.function_code} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{item.function_code}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.total_controls > 0
                          ? `${Math.round((item.implemented / item.total_controls) * 100)}%`
                          : "N/A"}
                      </div>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: item.total_controls > 0
                            ? `${(item.implemented / item.total_controls) * 100}%`
                            : "0%"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
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
            {!gapsByOwner || gapsByOwner.length === 0 ? (
              <p className="text-muted-foreground">No gaps found</p>
            ) : (
              <div className="space-y-4">
                {gapsByOwner.slice(0, 5).map((gap: any, index: number) => (
                  <div key={index} className="border-b pb-2 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{gap.control_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {gap.function_code} &gt; {gap.category_code} &gt; {gap.subcategory_code}
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        Status: {gap.status}
                      </div>
                    </div>
                    {gap.due_date && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Due: {new Date(gap.due_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
