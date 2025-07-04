// src/components/Layout.jsx
import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BellOutlined,
  UserOutlined,
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Modal, Button } from "antd";

const { confirm } = Modal;

const navItems = [
  { to: "clinic-dashboard", label: "Clinic" }, 
  
  {to: "/clinic-dashboard/appointment-booked", label: "Appointment"}
];


export default function ClinicLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);

  // MOCK user data (replace with real auth logic later)
  const user = {
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
  };

    const buildLink = (to) => (to.startsWith("/") ? to : `/${to}`);

  // MOCK logout function (replace with real logout)
  const logout = () => {
    confirm({
      title: "Are you sure you want to logout?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        // Put your logout logic here
        console.log("User logged out");
        // e.g. navigate to login page
        navigate("/login");
      },
    });
  };

  const showProfile = () => setProfileModalVisible(true);
  const closeProfile = () => setProfileModalVisible(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isSidebarOpen ? (
            <CloseOutlined className="text-lg" />
          ) : (
            <MenuOutlined className="text-lg" />
          )}
        </button>
        <Link to="/" className="text-xl font-bold text-indigo-600">
           Clinic
        </Link>
        <div className="flex items-center space-x-2">
          {user?.role === "admin" && (
            <Button
              onClick={() => navigate("/")}
              type="default"
              className="text-gray-700"
            >
              User View
            </Button>
          )}
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={showProfile}
          >
            <UserOutlined />
          </button>
          <button
            title="Logout"
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={logout}
          >
            <LogoutOutlined className="text-lg text-gray-600" />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 bg-[#00406C] shadow-lg flex flex-col fixed md:static inset-y-0 z-50 transition-transform duration-200 ease-in-out`}
      >
        <div className="px-6 py-4 border-b">
          <Link to="/" className="text-2xl font-bold  text-white">
            FlyDental
          </Link>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label }) => {
            const linkPath = buildLink(to);
            const isActive = pathname === linkPath;
            return (
              <Link
                key={to}
                to={linkPath}
                className={`block px-4 py-2 rounded ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t text-sm text-white mt-auto">
          &copy; {new Date().getFullYear()}FlyDental
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-6 py-3 bg-white border-b">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
          </div>
          <div className="flex items-center space-x-4">
            {user?.role === "admin" && (
              <Button
                onClick={() => navigate("/")}
                type="default"
                className="text-gray-700"
              >
                Switch to User View
              </Button>
            )}
            <button
              title="User Profile"
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={showProfile}
            >
              <UserOutlined className="text-lg text-gray-600" />
            </button>
            <button
              title="Logout"
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={logout}
            >
              <LogoutOutlined className="text-lg text-gray-600" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>

      <Modal
        title="User Details"
        open={isProfileModalVisible}
        onCancel={closeProfile}
        footer={null}
      >
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </Modal>

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
