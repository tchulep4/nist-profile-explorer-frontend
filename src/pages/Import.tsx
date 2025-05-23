
import React from "react";
import { ImportForm } from "@/components/import/ImportForm";

const Import = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Import Data</h1>
      </div>
      
      <ImportForm />
    </div>
  );
};

export default Import;
