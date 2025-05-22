
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { exportOptions } from "@/types/export-import";
import { exportToCSV, generateTemplate } from "@/utils/export-utils";
import { ExportOptionCard } from "@/components/export/ExportOptionCard";

const Export = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (id: string) => {
    setSelectedOptions(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const handleExport = () => {
    exportToCSV(selectedOptions);
  };

  const handleGenerateTemplate = (id: string) => {
    generateTemplate(id);
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
              <ExportOptionCard
                key={option.id}
                option={option}
                isSelected={selectedOptions.includes(option.id)}
                onToggle={toggleOption}
                onGenerateTemplate={handleGenerateTemplate}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleExport}
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
