
import React from "react";
import { NavLink } from "react-router-dom";
import {
  ChartBar,
  FileUp,
  FileDown,
  Settings,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Sidebar = () => {
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
          <h1 className="font-semibold truncate">NIST Profile</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-2 space-y-1">
          <NavItem
            to="/dashboard"
            icon={<ChartBar />}
            label="Dashboard"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/export"
            icon={<FileDown />}
            label="Export Data"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/import"
            icon={<FileUp />}
            label="Import Data"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/settings"
            icon={<Settings />}
            label="Settings"
            isCollapsed={isCollapsed}
          />
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

const NavItem = ({ to, icon, label, isCollapsed }: NavItemProps) => {
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

export default Sidebar;
