
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, Plus, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LicenseGenerator = () => {
  const [licenseType, setLicenseType] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [generatedKeys, setGeneratedKeys] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateKey = () => {
    return 'LIC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleGenerate = () => {
    if (!licenseType) {
      toast({
        title: "Error",
        description: "Please select a license type",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const newKeys = Array.from({ length: parseInt(quantity) }, () => ({
        key: generateKey(),
        type: licenseType,
        createdAt: new Date().toISOString(),
        status: 'unused'
      }));
      
      setGeneratedKeys([...newKeys, ...generatedKeys]);
      setIsGenerating(false);
      
      toast({
        title: "Keys Generated",
        description: `Generated ${quantity} ${licenseType} license key(s)`,
      });
    }, 1000);
  };

  const copyToClipboard = (key) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "Copied",
      description: "License key copied to clipboard",
    });
  };

  const getLicenseTypeColor = (type) => {
    switch (type) {
      case 'demo': return 'bg-gray-100 text-gray-800';
      case 'semestral': return 'bg-blue-100 text-blue-800';
      case 'anual': return 'bg-green-100 text-green-800';
      case 'perpetua': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Generate License Keys</span>
          </CardTitle>
          <CardDescription>
            Create new license keys for different subscription types
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>License Type</Label>
              <Select value={licenseType} onValueChange={setLicenseType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="demo">Demo (30 days)</SelectItem>
                  <SelectItem value="semestral">Semestral (6 months)</SelectItem>
                  <SelectItem value="anual">Annual (12 months)</SelectItem>
                  <SelectItem value="perpetua">Perpetual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? "Generating..." : "Generate Keys"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {generatedKeys.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated License Keys</CardTitle>
            <CardDescription>
              Click on any key to copy it to clipboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generatedKeys.map((license, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => copyToClipboard(license.key)}
                >
                  <div className="flex items-center space-x-3">
                    <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      {license.key}
                    </code>
                    <Badge className={getLicenseTypeColor(license.type)}>
                      {license.type}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(license.createdAt).toLocaleDateString()}
                    </span>
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LicenseGenerator;
