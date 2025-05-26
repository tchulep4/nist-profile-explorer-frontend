
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

const DemoHeader = () => {
  return (
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
  );
};

export default DemoHeader;
