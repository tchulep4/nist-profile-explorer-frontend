
import { TableName } from "@/types/export-import";

export type ImportOption = {
  id: string;
  name: string;
  table: TableName;
  description: string;
};

export const importOptions: ImportOption[] = [
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
