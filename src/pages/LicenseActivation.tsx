
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Key, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LicenseActivation = () => {
  const [licenseKey, setLicenseKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activatedLicense, setActivatedLicense] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleActivation = async () => {
    if (!licenseKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a license key",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate license validation
    setTimeout(() => {
      const mockLicense = {
        key: licenseKey,
        type: "semestral",
        expiresAt: "2024-12-31",
        features: ["Full NIST Framework", "Export/Import", "Team Collaboration"]
      };
      
      setActivatedLicense(mockLicense);
      setIsLoading(false);
      
      toast({
        title: "License Activated",
        description: "Your license has been successfully activated!",
      });
    }, 1500);
  };

  if (activatedLicense) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">License Activated!</CardTitle>
            <CardDescription>
              Your license has been successfully activated
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">License Type</Label>
              <Badge variant="secondary" className="capitalize">
                {activatedLicense.type}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Expires</Label>
              <p className="text-sm text-muted-foreground">{activatedLicense.expiresAt}</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Features Included</Label>
              <ul className="text-sm text-muted-foreground space-y-1">
                {activatedLicense.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button 
              onClick={() => navigate('/dashboard')} 
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="absolute top-4 left-4"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
            <Key className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Activate License</CardTitle>
          <CardDescription>
            Enter your license key to unlock full features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="licenseKey">License Key</Label>
            <Input
              id="licenseKey"
              type="text"
              placeholder="Enter your license key"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              className="font-mono"
            />
          </div>
          
          <Button 
            onClick={handleActivation} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Activating..." : "Activate License"}
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Need a license key? Contact your administrator.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LicenseActivation;
