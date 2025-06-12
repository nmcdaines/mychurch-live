import React from "react";

import SettingsNavigation from "../../components/SettingsNavigation";

import { Routes, Route, useMatch, useLocation, Navigate, Outlet } from "react-router-dom";

function Settings() {
  const match = useMatch("/settings/*");
  const location = useLocation();
  const basePath = match ? match.pathnameBase : "/settings";

  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-4">
          <SettingsNavigation />
        </div>
        <div className="col-span-8">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Settings;
