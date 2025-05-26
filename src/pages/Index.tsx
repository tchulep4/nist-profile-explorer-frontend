import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, FileText, Users, Eye, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Complete NIST Framework",
      description: "Access all 108 controls across 5 functions and 23 categories"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: "Maturity Tracking",
      description: "Track implementation progress and identify gaps"
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-600" />,
      title: "Assessment Management",
      description: "Manage assessments, due dates, and evidence collection"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Team Collaboration",
      description: "Assign owners and track team progress"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-4xl text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              NIST Cybersecurity Framework Management
            </Badge>
            <h1 className="text-4xl font-bold md:text-6xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              NIST Framework Profile Explorer
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage and track your cybersecurity framework implementation with ease. 
              Streamline assessments, track maturity, and ensure compliance.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate(user ? '/dashboard' : '/auth')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              {user ? 'Go to Dashboard' : 'Get Started Free'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/demo')}
              className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50 px-8"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Demo
            </Button>
            
            {!user && (
              <Button 
                variant="ghost" 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Demo Preview Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            See It In Action
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our interactive demo to understand how the platform works
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Interactive Demo</h3>
              <p className="text-gray-600">Experience the full platform with sample data</p>
            </div>
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              No signup required
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">What you'll see:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Dashboard with maturity metrics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Framework structure explorer</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Sample assessment data</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Gap analysis views</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Demo limitations:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                  <span>Sample data only</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                  <span>Limited control set</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                  <span>No data persistence</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                  <span>Export/import disabled</span>
                </li>
              </ul>
            </div>
          </div>
          
          <Button 
            onClick={() => navigate('/demo')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Eye className="w-4 h-4 mr-2" />
            Start Interactive Demo
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Everything You Need for NIST Compliance
          </h2>
          <p className="text-gray-600 text-lg">
            Comprehensive tools to manage your cybersecurity framework implementation
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-gray-50 rounded-full w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              Ready to streamline your NIST implementation?
            </h2>
            <p className="text-xl text-blue-100">
              Join organizations already using our platform to manage their cybersecurity frameworks
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8"
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => navigate('/demo')}
              className="border-2 border-blue-200 text-white hover:bg-blue-700 px-8"
            >
              <Eye className="w-4 h-4 mr-2" />
              Try Demo First
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
