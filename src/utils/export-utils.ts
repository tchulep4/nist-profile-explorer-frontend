
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ExportOption, exportOptions } from "@/types/export-import";

// Convert data to CSV format
export const convertToCSV = (data: any[]) => {
  if (!data || data.length === 0) return '';
  
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
  
  return `${headers}\n${rows}`;
};

// Download CSV data
export const downloadCSV = (csv: string, filename: string) => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export data to CSV
export const exportToCSV = async (selectedOptions: string[]) => {
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
        const { data: rpcData, error: rpcError } = await supabase.rpc(option.rpc as any);
        
        if (rpcError) throw rpcError;
        data = rpcData;
      } else if (option.table) {
        const { data: tableData, error: tableError } = await supabase
          .from(option.table as any)
          .select('*');
        
        if (tableError) throw tableError;
        data = tableData;
      }

      if (data && data.length > 0) {
        const csv = convertToCSV(data);
        downloadCSV(csv, `${option.id}_export.csv`);
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

// Generate template for import
export const generateTemplate = (optionId: string) => {
  const option = exportOptions.find(opt => opt.id === optionId);
  if (!option) return;

  // Try to fetch template from public folder
  fetch(`/templates/${option.id}_template.csv`)
    .then(response => {
      if (!response.ok) throw new Error("Template not available");
      return response.blob();
    })
    .then(blob => {
      downloadCSV('', `${option.id}_template.csv`);
    })
    .catch(() => {
      // If template file doesn't exist, generate one based on table structure
      if (option.table) {
        supabase
          .from(option.table as any)
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
            downloadCSV(csv, `${option.id}_template.csv`);
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
