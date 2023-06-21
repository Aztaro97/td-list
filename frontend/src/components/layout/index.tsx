import { useAppSelector } from "@/hook/toolkitHook";
import React from "react";
import { Outlet, redirect, useNavigate, Navigate } from "react-router-dom";

const Layout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <>
          <Navigate to="/login" replace />
          <Outlet />
        </>
      )}
    </>
  );
};

export default Layout;
