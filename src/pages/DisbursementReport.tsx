import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle,
  TrendingUp,
  Filter,
  ArrowUpRight,
  AlertCircle,
  Briefcase,
  MapPin,
  Search,
  MoreHorizontal
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion } from 'motion/react';
import { storageService } from '../services/storageService';
import { DashboardStats } from '../types';
import { cn, formatCurrency, formatPercent, formatTrillion } from '../lib/utils';

const StatCard = ({ title, value, subValue, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-start">
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">{title}</p>
      <h3 className="text-2xl font-black text-slate-900 leading-none">{value}</h3>
      {subValue && <p className="text-xs text-slate-500 mt-2">{subValue}</p>}
    </div>
    <div className={cn("p-2 rounded-lg", color)}>
      <Icon size={18} />
    </div>
  </div>
);

export default function DisbursementReport() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const regionData = [
    { name: 'TP.HCM', projects: 74, progress: 42.8, disbursed: 7710.62, total: 18005.55, color: '#3b82f6' },
    { name: 'Bình Dương', projects: 89, progress: 0.2, disbursed: 35.62, total: 15377.98, color: '#f59e0b' },
    { name: 'Vũng Tàu', projects: 27, progress: 25.4, disbursed: 148.25, total: 582.82, color: '#10b981' },
  ];

  const boardData = [
    { name: 'Ban BT GPMB A', value: 1200 },
    { name: 'Ban QLDA B', value: 13500 },
    { name: 'Ban QLDA C', value: 500 },
    { name: 'Ban QLDA D', value: 1200 },
    { name: 'Ban QLDA E', value: 1000 },
    { name: 'Trung tâm QL Hạ tầng KT', value: 600 },
    { name: 'Ban QLDA F', value: 1500 },
    { name: 'Ban QLDA H', value: 9500 },
  ];

  const projectTable = [
    { 
      id: 1, 
      name: 'BT, HT, TĐC phục vụ DA Cải tạo, nâng cấp QL22 ', 
      code: 'NSDP-PPP-CT',
      location: 'Xã A',
      tmdt: '6.227',
      capital: '6.200',
      disbursed: '0',
      rate: 0,
      status: '---'
    },
    { 
      id: 2, 
      name: 'BT, HT, TĐC- Nâng cấp QL1 (BOT)', 
      code: 'NSDP-PPP-CT',
      location: 'Xã B',
      tmdt: '8.542,99',
      capital: '3.500',
      disbursed: '3.500',
      rate: 97.93,
      status: 'Đang thẩm tra...'
    }
  ];

  if (loading) return <div className="p-8">Đang tải dữ liệu báo cáo...</div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Giải ngân & Cảnh báo</h1>
          <p className="text-slate-500 mt-1">Báo cáo tổng hợp số liệu giải ngân vốn BT GPMB năm 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            <Filter size={16} /> Lọc dữ liệu
          </button>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="TỔNG DỰ ÁN" 
          value="190" 
          subValue="Trên 03 khu vực" 
          icon={Briefcase} 
          color="bg-blue-50 text-blue-600" 
        />
        <StatCard 
          title="VỐN GIAO 2026" 
          value="48.55 ngìn tỷ" 
          subValue="TMĐT: 151.23 nghìn tỷ" 
          icon={DollarSign} 
          color="bg-amber-50 text-amber-600" 
        />
        <StatCard 
          title="TỶ LỆ GIẢI NGÂN" 
          value="23.2%" 
          subValue="7.894 ngìn tỷ" 
          icon={TrendingUp} 
          color="bg-red-50 text-red-600" 
        />
        <StatCard 
          title="DIỆN TÍCH BG MB" 
          value="1.090,96 ha" 
          subValue="/ 6.140,83 ha tổng" 
          icon={MapPin} 
          color="bg-emerald-50 text-emerald-600" 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Progress Bars Section */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Tổng hợp 03 khu vực</h3>
          <div className="space-y-8">
            {regionData.map((region) => (
              <div key={region.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-blue-500" />
                    <span className="text-sm font-bold text-slate-900">{region.name}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{region.projects} dự án</span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-black text-slate-900 leading-none">{region.progress}%</span>
                  <span className="text-[10px] text-slate-400 font-bold">{region.disbursed} / {region.total} tỷ</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-1000" 
                    style={{ width: `${region.progress}%`, backgroundColor: region.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-2">Giải ngân theo khu vực</h3>
          <p className="text-xs text-slate-400 mb-6">Vốn BT GPMB năm 2026 (tỷ đồng)</p>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="disbursed" name="Đã giải ngân" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Đã giải ngân</span>
            </div>
          </div>
        </div>

        {/* Horizontal Bar Chart Section */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-2">Vốn giao theo Ban quản lý</h3>
          <p className="text-xs text-slate-400 mb-6">Phân bổ vốn BT GPMB năm 2026 (tỷ đồng)</p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={boardData} layout="vertical" margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(val) => `${val/1000}k`} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} width={120} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" name="Vốn giao" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table Row */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900">Danh mục dự án trọng điểm</h3>
            <p className="text-xs text-slate-400 mt-1">Tình hình giải ngân vốn BT GPMB năm 2026</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Tìm dự án..." 
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full md:w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4">STT</th>
                <th className="px-6 py-4">TÊN DỰ ÁN</th>
                <th className="px-6 py-4">ĐỊA ĐIỂM</th>
                <th className="px-6 py-4 text-right">TMĐT (TỶ)</th>
                <th className="px-6 py-4 text-right">VỐN GIAO 2026</th>
                <th className="px-6 py-4 text-right">ĐÃ GIẢI NGÂN</th>
                <th className="px-6 py-4 text-center">TỶ LỆ GN</th>
                <th className="px-6 py-4">TÌNH TRẠNG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projectTable.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-500">{project.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900 leading-tight">{project.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-1">{project.code}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{project.location}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-700">{project.tmdt}</td>
                  <td className="px-6 py-4 text-right font-bold text-blue-600">{project.capital}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-700">{project.disbursed}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      "px-2 py-1 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 mx-auto w-fit",
                      project.rate >= 90 ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : 
                      project.rate > 0 ? "bg-blue-50 text-blue-600 border border-blue-100" :
                      "bg-red-50 text-red-600 border border-red-100"
                    )}>
                      {project.rate >= 90 ? <CheckCircle2 size={12} /> : project.rate === 0 ? <AlertTriangle size={12} /> : null}
                      {project.rate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400 italic">{project.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
