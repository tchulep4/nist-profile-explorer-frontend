
import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { ImportOptionSelect } from "./ImportOptionSelect";
import { FileUpload } from "./FileUpload";
import { importOptions } from "@/types/import";
import { downloadTemplate, parseCSVFile, importDataToTable } from "@/utils/import-utils";

export const ImportForm = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [importData, setImportData] = useState<Record<string, any>[] | null>(null);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setFile(null);
      setImportData(null);
      return;
    }
    
    setFile(selectedFile);
    
    try {
      const parsedData = await parseCSVFile(selectedFile);
      setImportData(parsedData);
    } catch (error) {
      toast({
        title: "Failed to parse CSV",
        description: "The file format is incorrect or the file is corrupted",
        variant: "destructive",
      });
      setImportData(null);
    }
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
      await importDataToTable(option, importData);
      
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

  const handleDownloadTemplate = () => {
    if (!selectedOption) {
      toast({
        title: "No option selected",
        description: "Please select an import type first",
        variant: "destructive",
      });
      return;
    }
    
    downloadTemplate(selectedOption);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Data</CardTitle>
        <CardDescription>
          Upload CSV files to import data into the system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ImportOptionSelect 
          options={importOptions}
          selectedOption={selectedOption}
          onOptionChange={setSelectedOption}
        />
        
        <FileUpload
          onFileChange={handleFileChange}
          onDownloadTemplate={handleDownloadTemplate}
          fileInputRef={fileInputRef}
          isTemplateDisabled={!selectedOption}
        />
        
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
  );
};
