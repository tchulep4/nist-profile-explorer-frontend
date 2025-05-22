
import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Type definition for tables in Supabase
type TableName = "functions" | "categories" | "subcategories" | "assessments";

type ImportOption = {
  id: string;
  name: string;
  table: TableName;
  description: string;
};

const importOptions: ImportOption[] = [
  {
    id: "functions",
    name: "Functions",
    table: "functions",
    description: "Import functions data"
  },
  {
    id: "categories",
    name: "Categories",
    table: "categories",
    description: "Import categories data"
  },
  {
    id: "subcategories",
    name: "Subcategories",
    table: "subcategories",
    description: "Import subcategories data"
  },
  {
    id: "assessments",
    name: "Assessments",
    table: "assessments",
    description: "Import assessment data"
  },
];

const Import = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [importData, setImportData] = useState<any[] | null>(null);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setFile(null);
      setImportData(null);
      return;
    }
    
    setFile(selectedFile);
    
    // Parse CSV file
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const rows = text.split('\n');
        const headers = rows[0].split(',');
        
        const data = rows.slice(1).filter(row => row.trim()).map(row => {
          const values = row.split(',');
          const rowData: Record<string, any> = {};
          
          headers.forEach((header, index) => {
            let value = values[index] || '';
            
            // Handle quoted values
            if (value.startsWith('"') && value.endsWith('"')) {
              value = value.substring(1, value.length - 1).replace(/""/g, '"');
            }
            
            rowData[header.trim()] = value;
          });
          
          return rowData;
        });
        
        setImportData(data);
      } catch (error) {
        toast({
          title: "Failed to parse CSV",
          description: "The file format is incorrect or the file is corrupted",
          variant: "destructive",
        });
        setImportData(null);
      }
    };
    
    reader.readAsText(selectedFile);
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFile(null);
    setImportData(null);
  };

  const handleImport = async () => {
    if (!selectedOption || !importData || importData.length === 0) {
      toast({
        title: "Import failed",
        description: "Please select an import type and upload a valid file",
        variant: "destructive",
      });
      return;
    }
    
    const option = importOptions.find(opt => opt.id === selectedOption);
    if (!option) return;
    
    setImporting(true);
    try {
      // For each row in importData, insert into the selected table
      const { data, error } = await supabase
        .from(option.table)
        .insert(importData);
      
      if (error) throw error;
      
      toast({
        title: "Import successful",
        description: `${importData.length} records were imported successfully`,
      });
      
      resetFileInput();
    } catch (error: any) {
      toast({
        title: "Import failed",
        description: error.message || "An error occurred during import",
        variant: "destructive",
      });
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    if (!selectedOption) {
      toast({
        title: "No option selected",
        description: "Please select an import type first",
        variant: "destructive",
      });
      return;
    }
    
    const option = importOptions.find(opt => opt.id === selectedOption);
    if (!option) return;
    
    // Generate template CSV
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
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Import Data</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Import Data</CardTitle>
          <CardDescription>
            Upload CSV files to import data into the system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Import Type</Label>
            <Select value={selectedOption} onValueChange={setSelectedOption}>
              <SelectTrigger>
                <SelectValue placeholder="Select data type to import" />
              </SelectTrigger>
              <SelectContent>
                {importOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>CSV File</Label>
            <div className="flex items-center space-x-2">
              <Input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                onClick={downloadTemplate}
                disabled={!selectedOption}
              >
                Get Template
              </Button>
            </div>
          </div>
          
          {file && importData && (
            <Alert>
              <AlertDescription>
                {`${importData.length} records found in the file. Ready to import.`}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={resetFileInput}
            disabled={!file}
          >
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={!selectedOption || !file || importing}
          >
            {importing ? "Importing..." : "Import Data"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Helper Label component since we're not importing it directly
const Label = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`text-sm font-medium ${className || ""}`} {...props} />
);

export default Import;
