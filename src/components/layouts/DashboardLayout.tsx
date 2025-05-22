
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "@/components/navigation/Sidebar";
import { UserNav } from "@/components/navigation/UserNav";

const DashboardLayout = () => {
  const { user, loading } = useAuth();

  // If authentication is still loading, show a loading spinner
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center px-6 border-b bg-background">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">NIST Framework Profile Explorer</h2>
          </div>
          <div className="flex items-center space-x-4">
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
