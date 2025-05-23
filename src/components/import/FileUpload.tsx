
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDownloadTemplate: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isTemplateDisabled: boolean;
}

export const FileUpload = ({
  onFileChange,
  onDownloadTemplate,
  fileInputRef,
  isTemplateDisabled
}: FileUploadProps) => {
  return (
    <div className="space-y-2">
      <Label>CSV File</Label>
      <div className="flex items-center space-x-2">
        <Input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={onFileChange}
        />
        <Button
          variant="outline"
          onClick={onDownloadTemplate}
          disabled={isTemplateDisabled}
        >
          Get Template
        </Button>
      </div>
    </div>
  );
};

// Helper Label component since we're not importing it directly
const Label = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`text-sm font-medium ${className || ""}`} {...props} />
);
