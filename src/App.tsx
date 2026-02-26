import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  MapPin, 
  AlertCircle, 
  FileText, 
  Settings, 
  ChevronRight,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Menu,
  X,
  Bell,
  Search,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Routes, 
  Route, 
  Link, 
  useLocation,
  useNavigate
} from 'react-router-dom';
import { cn } from './lib/utils';

// Pages
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import IssueManagement from './pages/IssueManagement';
import LegalReport from './pages/LegalReport';
import InventoryReport from './pages/InventoryReport';
import PaymentReport from './pages/PaymentReport';
import DisbursementReport from './pages/DisbursementReport';
import CityDashboard from './pages/CityDashboard';

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  to, 
  active, 
  collapsed 
}: any) => (
  <Link 
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
      active 
        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    )}
  >
    <Icon size={20} className={cn(active ? "text-white" : "group-hover:text-white")} />
    {!collapsed && <span className="font-medium">{label}</span>}
    {!collapsed && active && <ChevronRight size={16} className="ml-auto" />}
  </Link>
);

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <nav className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 hover:bg-slate-100 rounded-lg lg:hidden">
          <Menu size={20} />
        </button>
        <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <Search size={16} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm dự án, hồ sơ..." 
            className="bg-transparent border-none outline-none text-sm w-64"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 rounded-full relative">
          <Bell size={20} className="text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-none">Lãnh đạo UBND</p>
            <p className="text-xs text-slate-500 mt-1">Quản trị viên</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20">
            <User size={20} />
          </div>
        </div>
      </div>
    </nav>
  );
};

import { storageService } from './services/storageService';

// Initialize storage
storageService.init();

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard toàn thành phố', to: '/' },
    { icon: FileText, label: 'Mẫu 1', to: '/reports/legal' },
    { icon: MapPin, label: 'Mẫu 2', to: '/reports/inventory' },
    { icon: DollarSign, label: 'Mẫu 3', to: '/reports/payment' },
    { icon: TrendingUp, label: 'Giải ngân & Cảnh báo', to: '/reports/disbursement' },
    { icon: Briefcase, label: 'Danh mục dự án', to: '/projects' },
    { icon: AlertCircle, label: 'Vướng mắc', to: '/issues' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden lg:flex flex-col bg-slate-900 text-white transition-all duration-300 sticky top-0 h-screen",
          sidebarCollapsed ? "w-20" : "w-72"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30">
            <TrendingUp size={24} />
          </div>
          {!sidebarCollapsed && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="font-bold text-lg leading-tight">BTHTTĐC 2026</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Hệ thống điều hành</p>
            </div>
          )}
        </div>

        <div className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              active={location.pathname === item.to}
              collapsed={sidebarCollapsed}
            />
          ))}
        </div>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <span className="text-xs font-medium">THU GỌN MENU</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.aside 
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="fixed inset-y-0 left-0 w-72 bg-slate-900 text-white z-50 p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
                <h1 className="font-bold text-lg">BTHTTĐC 2026</h1>
              </div>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-2 hover:bg-slate-800 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 space-y-2">
              {menuItems.map((item) => (
                <SidebarItem 
                  key={item.to}
                  icon={item.icon}
                  label={item.label}
                  to={item.to}
                  active={location.pathname === item.to}
                  collapsed={false}
                />
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col min-w-0">
        <Navbar toggleSidebar={() => setMobileSidebarOpen(true)} />
        <div className="p-6 lg:p-8 flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<CityDashboard />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/issues" element={<IssueManagement />} />
            <Route path="/reports/legal" element={<LegalReport />} />
            <Route path="/reports/inventory" element={<InventoryReport />} />
            <Route path="/reports/payment" element={<PaymentReport />} />
            <Route path="/reports/disbursement" element={<DisbursementReport />} />
            <Route path="*" element={<div className="flex items-center justify-center h-full text-slate-400">Tính năng đang phát triển</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
