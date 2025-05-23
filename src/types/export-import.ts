
import { Database } from "@/integrations/supabase/types";

// Type definitions for tables and functions in Supabase
export type TableName = 
  | "functions" 
  | "categories" 
  | "subcategories"
  | "assessments"
  | "crossreferences"
  | "implementationexamples" 
  | "maturitylevels"
  | "profiles"
  | "maturity_overall"
  | "vw_gap_list" 
  | "vw_maturity_by_function";

export type RpcFunctionName = keyof Database["public"]["Functions"];

export type ExportOption = {
  id: string;
  name: string;
  description: string;
  table?: TableName;
  rpc?: RpcFunctionName;
};

export const exportOptions: ExportOption[] = [
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
