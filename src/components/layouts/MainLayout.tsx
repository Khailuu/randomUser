// import React from 'react'

import { Outlet } from "react-router-dom";
import Header from "../ui/Header";

const MainLayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

export default MainLayout;
