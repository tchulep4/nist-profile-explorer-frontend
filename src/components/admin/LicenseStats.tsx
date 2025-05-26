
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Key, Clock } from "lucide-react";

const LicenseStats = () => {
  const stats = [
    {
      title: "Total Licenses",
      value: "2,847",
      icon: <Key className="w-5 h-5" />,
      trend: "+12%",
      color: "text-blue-600"
    },
    {
      title: "Active Users",
      value: "1,329",
      icon: <Users className="w-5 h-5" />,
      trend: "+8%",
      color: "text-green-600"
    },
    {
      title: "Expiring Soon",
      value: "47",
      icon: <Clock className="w-5 h-5" />,
      trend: "-3%",
      color: "text-orange-600"
    },
    {
      title: "Revenue",
      value: "$45,231",
      icon: <BarChart3 className="w-5 h-5" />,
      trend: "+23%",
      color: "text-purple-600"
    }
  ];

  const licenseBreakdown = [
    { type: "Demo", count: 1247, percentage: 44 },
    { type: "Semestral", count: 892, percentage: 31 },
    { type: "Annual", count: 563, percentage: 20 },
    { type: "Perpetual", count: 145, percentage: 5 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {stat.trend}
                  </Badge>
                </div>
                <div className={`${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>License Type Distribution</CardTitle>
          <CardDescription>
            Breakdown of active licenses by type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {licenseBreakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{item.type}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.count} licenses ({item.percentage}%)
                  </div>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest license activations and renewals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: "License Activated", key: "LIC-ABC123XYZ", user: "john@example.com", time: "2 minutes ago" },
              { action: "License Renewed", key: "LIC-DEF456UVW", user: "sarah@company.com", time: "15 minutes ago" },
              { action: "License Generated", key: "LIC-GHI789RST", user: "Admin", time: "1 hour ago" },
              { action: "License Expired", key: "LIC-JKL012MNO", user: "mike@startup.io", time: "3 hours ago" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.key} • {activity.user}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LicenseStats;
