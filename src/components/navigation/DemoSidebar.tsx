
import React from "react";
import { NavLink } from "react-router-dom";
import {
  ChartBar,
  Search,
  Eye,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const DemoSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border h-screen transition-all duration-300 ease-in-out flex flex-col overflow-hidden",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!isCollapsed && (
          <div>
            <h1 className="font-semibold truncate">NIST Profile</h1>
            <span className="text-xs text-orange-600">Demo</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          <Eye className="h-5 w-5" />
        </Button>
      </div>
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-2 space-y-1">
          <DemoNavItem
            to="/demo"
            icon={<ChartBar />}
            label="Demo Overview"
            isCollapsed={isCollapsed}
          />
          <DemoNavItem
            to="/demo/explorer"
            icon={<Search />}
            label="Framework Explorer"
            isCollapsed={isCollapsed}
          />
          <div className="mt-4 px-3">
            <div className={cn("border-t border-sidebar-border pt-4", isCollapsed && "px-1")}>
              {!isCollapsed && (
                <p className="text-xs text-muted-foreground mb-2">
                  Full Features
                </p>
              )}
              <DisabledNavItem
                icon={<Lock />}
                label="Export Data"
                isCollapsed={isCollapsed}
              />
              <DisabledNavItem
                icon={<Lock />}
                label="Import Data"
                isCollapsed={isCollapsed}
              />
              <DisabledNavItem
                icon={<Lock />}
                label="Settings"
                isCollapsed={isCollapsed}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

const DemoNavItem = ({ to, icon, label, isCollapsed }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-3 py-2 rounded-md transition-colors",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
          isCollapsed ? "justify-center" : "justify-start"
        )
      }
    >
      {icon}
      {!isCollapsed && <span className="ml-3">{label}</span>}
    </NavLink>
  );
};

interface DisabledNavItemProps {
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

const DisabledNavItem = ({ icon, label, isCollapsed }: DisabledNavItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center px-3 py-2 rounded-md transition-colors opacity-50 cursor-not-allowed",
        "text-muted-foreground",
        isCollapsed ? "justify-center" : "justify-start"
      )}
    >
      {icon}
      {!isCollapsed && <span className="ml-3">{label}</span>}
    </div>
  );
};

export default DemoSidebar;
