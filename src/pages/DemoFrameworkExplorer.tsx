
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { demoFunctions, demoCategories, demoSubcategories } from "@/data/demoData";
import { useState } from "react";
import { ChevronRight, ChevronDown, Lock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const DemoFrameworkExplorer = () => {
  const navigate = useNavigate();
  const [expandedFunctions, setExpandedFunctions] = useState<number[]>([1]);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([1]);

  const toggleFunction = (functionId: number) => {
    setExpandedFunctions(prev => 
      prev.includes(functionId) 
        ? prev.filter(id => id !== functionId)
        : [...prev, functionId]
    );
  };

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getCategoriesForFunction = (functionId: number) => {
    return demoCategories.filter(cat => cat.functionId === functionId);
  };

  const getSubcategoriesForCategory = (categoryId: number) => {
    return demoSubcategories.filter(sub => sub.categoryId === categoryId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">NIST Framework Explorer</h1>
          <p className="text-muted-foreground mt-1">
            Explore the NIST Cybersecurity Framework structure and controls
          </p>
        </div>
        <Badge variant="outline" className="text-orange-600 border-orange-600">
          <Eye className="w-4 h-4 mr-1" />
          Demo Mode
        </Badge>
      </div>

      {/* Demo Info Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="bg-amber-100 rounded-full p-2">
            <Eye className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-amber-900">Demo Framework View</h3>
            <p className="text-amber-700 text-sm mt-1">
              This shows a sample of the complete NIST Cybersecurity Framework. The full version includes all 108 controls across 23 categories.
            </p>
          </div>
          <Button 
            size="sm" 
            onClick={() => navigate('/auth')}
            className="bg-amber-600 hover:bg-amber-700"
          >
            See Full Framework
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {demoFunctions.map((func) => {
          const isExpanded = expandedFunctions.includes(func.id);
          const categories = getCategoriesForFunction(func.id);
          
          return (
            <Card key={func.id} className="overflow-hidden">
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleFunction(func.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div>
                      <CardTitle className="flex items-center space-x-3">
                        <Badge variant="secondary" className="font-mono">
                          {func.code}
                        </Badge>
                        <span>{func.name}</span>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {func.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {categories.length} categories
                  </Badge>
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="space-y-3 ml-8">
                    {categories.map((category) => {
                      const isCategoryExpanded = expandedCategories.includes(category.id);
                      const subcategories = getSubcategoriesForCategory(category.id);
                      
                      return (
                        <div key={category.id} className="border rounded-lg overflow-hidden">
                          <div 
                            className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                            onClick={() => toggleCategory(category.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {isCategoryExpanded ? (
                                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                )}
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <Badge variant="outline" className="font-mono text-xs">
                                      {category.code}
                                    </Badge>
                                    <span className="font-medium">{category.name}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {category.description}
                                  </p>
                                </div>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {subcategories.length} controls
                              </Badge>
                            </div>
                          </div>
                          
                          {isCategoryExpanded && (
                            <div className="px-4 pb-4">
                              <div className="ml-7 space-y-2">
                                {subcategories.map((subcategory) => (
                                  <div 
                                    key={subcategory.id} 
                                    className="p-3 bg-muted/30 rounded border-l-4 border-l-primary/30"
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                          <Badge variant="secondary" className="font-mono text-xs">
                                            {subcategory.code}
                                          </Badge>
                                        </div>
                                        <p className="text-sm font-medium">{subcategory.name}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                          {subcategory.description}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                
                                {/* Show limited content notice */}
                                <div className="p-3 bg-muted rounded border border-dashed border-muted-foreground/30">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <Lock className="w-4 h-4 text-muted-foreground" />
                                      <span className="text-sm text-muted-foreground">
                                        {func.id === 1 ? "18 more controls" : "Additional controls"} available in full version
                                      </span>
                                    </div>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => navigate('/auth')}
                                    >
                                      View All
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Call to action */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-blue-900">
              Ready to manage your complete NIST implementation?
            </h3>
            <p className="text-blue-700">
              Get access to all 108 controls, assessment tracking, gap analysis, and reporting tools.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DemoFrameworkExplorer;
