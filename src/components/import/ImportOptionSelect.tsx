
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImportOption } from "@/types/import";

interface ImportOptionSelectProps {
  options: ImportOption[];
  selectedOption: string;
  onOptionChange: (value: string) => void;
}

export const ImportOptionSelect = ({
  options,
  selectedOption,
  onOptionChange
}: ImportOptionSelectProps) => {
  return (
    <div className="space-y-2">
      <Label>Import Type</Label>
      <Select value={selectedOption} onValueChange={onOptionChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select data type to import" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// Helper Label component since we're not importing it directly
const Label = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`text-sm font-medium ${className || ""}`} {...props} />
);
