
import { supabase } from "@/integrations/supabase/client";
import { ImportOption } from "@/types/import";
import { toast } from "@/hooks/use-toast";

export const parseCSVFile = (file: File): Promise<Record<string, any>[]> => {
  return new Promise((resolve, reject) => {
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
        
        resolve(data);
      } catch (error) {
        reject(new Error("Failed to parse CSV file"));
      }
    };
    
    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsText(file);
  });
};

export const importDataToTable = async (
  option: ImportOption,
  importData: Record<string, any>[]
): Promise<void> => {
  if (!importData || importData.length === 0) {
    throw new Error("No data to import");
  }
  
  const { error } = await supabase
    .from(option.table)
    .insert(importData);
  
  if (error) {
    throw error;
  }
};

export const downloadTemplate = async (optionId: string): Promise<void> => {
  try {
    // First try to fetch a pre-made template
    const response = await fetch(`/templates/${optionId}_template.csv`);
    
    if (response.ok) {
      const blob = await response.blob();
      createDownloadLink(blob, `${optionId}_template.csv`);
      return;
    }
    
    // If template doesn't exist, generate one based on table structure
    const option = importOptions.find(opt => opt.id === optionId);
    if (!option) {
      throw new Error("Import option not found");
    }
    
    const { data } = await supabase
      .from(option.table)
      .select('*')
      .limit(1);
    
    if (!data || data.length === 0) {
      throw new Error("No data structure available");
    }
    
    const headers = Object.keys(data[0]).join(',');
    const csv = headers;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    createDownloadLink(blob, `${optionId}_template.csv`);
  } catch (error) {
    toast({
      title: "Could not generate template",
      description: "Template not available or could not be generated",
      variant: "destructive",
    });
  }
};

const createDownloadLink = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
