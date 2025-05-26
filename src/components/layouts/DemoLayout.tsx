
import React from "react";
import { Outlet } from "react-router-dom";
import DemoSidebar from "@/components/navigation/DemoSidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DemoLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <DemoSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center px-6 border-b bg-background">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">NIST Framework Profile Explorer</h2>
            <span className="text-sm text-orange-600 font-medium">Demo Mode</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-primary hover:bg-primary/90"
            >
              Get Full Access
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DemoLayout;
