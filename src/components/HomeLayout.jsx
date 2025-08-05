// components/HomeLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import Sidebar from './Sidebar';

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
      <Navbar toggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
      <main style={{ minHeight: '80vh' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default HomeLayout;
