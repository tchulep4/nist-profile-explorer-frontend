
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ExportOption } from "@/types/export-import";

interface ExportOptionCardProps {
  option: ExportOption;
  isSelected: boolean;
  onToggle: (id: string) => void;
  onGenerateTemplate: (id: string) => void;
}

export const ExportOptionCard = ({
  option,
  isSelected,
  onToggle,
  onGenerateTemplate
}: ExportOptionCardProps) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <div className="flex items-start space-x-2">
        <Checkbox
          id={option.id}
          checked={isSelected}
          onCheckedChange={() => onToggle(option.id)}
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
          onClick={() => onGenerateTemplate(option.id)}
        >
          Download Template
        </Button>
      </div>
    </div>
  );
};
