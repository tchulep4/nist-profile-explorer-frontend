
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Type definition for tables and functions in Supabase
type TableName = "functions" | "categories" | "subcategories" | "assessments" | "vw_gap_list";
type RpcFunctionName = "report_maturity_summary";

type ExportOption = {
  id: string;
  name: string;
  description: string;
  table?: TableName;
  rpc?: RpcFunctionName;
};

const exportOptions: ExportOption[] = [
  {
    id: "functions",
    name: "Functions",
    description: "Export all functions from the framework",
    table: "functions"
  },
  {
    id: "categories",
    name: "Categories",
    description: "Export all categories from the framework",
    table: "categories"
  },
  {
    id: "subcategories",
    name: "Subcategories",
    description: "Export all subcategories from the framework",
    table: "subcategories"
  },
  {
    id: "assessments",
    name: "Assessments",
    description: "Export all assessment data",
    table: "assessments"
  },
  {
    id: "gaps",
    name: "Gap Analysis",
    description: "Export gap analysis report",
    table: "vw_gap_list"
  },
  {
    id: "maturity",
    name: "Maturity Summary",
    description: "Export maturity summary by function",
    rpc: "report_maturity_summary"
  }
];

const Export = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (id: string) => {
    setSelectedOptions(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const exportToCSV = async () => {
    if (selectedOptions.length === 0) {
      toast({
        title: "No options selected",
        description: "Please select at least one option to export",
        variant: "destructive",
      });
      return;
    }

    try {
      for (const optionId of selectedOptions) {
        const option = exportOptions.find(opt => opt.id === optionId);
        if (!option) continue;

        let data;
        
        if (option.rpc) {
          const { data: rpcData, error: rpcError } = await supabase.rpc(option.rpc);
          
          if (rpcError) throw rpcError;
          data = rpcData;
        } else if (option.table) {
          const { data: tableData, error: tableError } = await supabase
            .from(option.table)
            .select('*');
          
          if (tableError) throw tableError;
          data = tableData;
        }

        if (data && data.length > 0) {
          // Convert data to CSV
          const headers = Object.keys(data[0]).join(',');
          const rows = data.map((row: any) => 
            Object.values(row)
              .map(value => {
                // Handle values that need escaping
                if (value === null || value === undefined) return '';
                if (typeof value === 'object') value = JSON.stringify(value);
                const strValue = String(value);
                
                // Escape commas, quotes, and wrap in quotes if needed
                if (strValue.includes(',') || strValue.includes('"') || strValue.includes('\n')) {
                  return `"${strValue.replace(/"/g, '""')}"`;
                }
                return strValue;
              })
              .join(',')
          ).join('\n');
          
          const csv = `${headers}\n${rows}`;
          
          // Create a download link
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${option.id}_export.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          toast({
            title: `No data for ${option.name}`,
            description: "There is no data to export for this option",
          });
        }
      }

      toast({
        title: "Export successful",
        description: "Your data has been exported successfully",
      });
    } catch (error: any) {
      toast({
        title: "Export failed",
        description: error.message || "An error occurred during export",
        variant: "destructive",
      });
    }
  };

  const generateTemplate = (optionId: string) => {
    const option = exportOptions.find(opt => opt.id === optionId);
    if (!option) return;

    // Generate empty CSV template based on table structure
    // For simplicity, we'll just create a template with column names
    fetch(`/templates/${option.id}_template.csv`)
      .then(response => {
        if (!response.ok) throw new Error("Template not available");
        return response.blob();
      })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${option.id}_template.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => {
        // If template file doesn't exist, generate one based on table structure
        if (option.table) {
          supabase
            .from(option.table)
            .select('*')
            .limit(1)
            .then(({ data }) => {
              if (!data || data.length === 0) {
                toast({
                  title: "Could not generate template",
                  description: "No data structure available",
                  variant: "destructive",
                });
                return;
              }
              
              const headers = Object.keys(data[0]).join(',');
              const csv = headers;
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', `${option.id}_template.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            });
        } else {
          toast({
            title: "Could not generate template",
            description: "Template generation not supported for this option",
            variant: "destructive",
          });
        }
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Export Data</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
          <CardDescription>
            Select the data you want to export
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {exportOptions.map((option) => (
              <div
                key={option.id}
                className="border rounded-lg p-4 flex flex-col"
              >
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={selectedOptions.includes(option.id)}
                    onCheckedChange={() => toggleOption(option.id)}
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor={option.id}
                      className="font-medium cursor-pointer"
                    >
                      {option.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
                <div className="mt-auto pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => generateTemplate(option.id)}
                  >
                    Download Template
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={exportToCSV}
            disabled={selectedOptions.length === 0}
          >
            Export Selected Data
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Export;
