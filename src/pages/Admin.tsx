
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Shield, Key, Users, BarChart3 } from "lucide-react";
import LicenseGenerator from "@/components/admin/LicenseGenerator";
import LicenseStats from "@/components/admin/LicenseStats";
import UserManagement from "@/components/admin/UserManagement";

const Admin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">
            Manage licenses, users, and system settings
          </p>
        </div>
        <Badge variant="secondary" className="text-blue-600 border-blue-600">
          <Shield className="w-4 h-4 mr-1" />
          Administrator
        </Badge>
      </div>

      <Tabs defaultValue="licenses" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-fit">
          <TabsTrigger value="licenses" className="flex items-center space-x-2">
            <Key className="w-4 h-4" />
            <span>License Management</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Statistics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="licenses" className="space-y-6">
          <LicenseGenerator />
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <UserManagement />
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <LicenseStats />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
