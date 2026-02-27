import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  AlertCircle, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  Building2,
  MapPin,
  FileText,
  ArrowUpRight,
  ShieldAlert,
  Calendar
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { motion } from 'motion/react';
import { storageService } from '../services/storageService';
import { cn, formatCurrency, formatPercent, formatTrillion } from '../lib/utils';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

const StatCard = ({ title, value, subValue, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        {subValue && <p className="text-xs text-slate-400 mt-1">{subValue}</p>}
        {trend && (
          <div className={cn(
            "flex items-center gap-1 mt-3 text-xs font-semibold px-2 py-1 rounded-full w-fit",
            trend.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          )}>
            {trend.value}
          </div>
        )}
      </div>
      <div className={cn("p-3 rounded-xl", color)}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

export default function CityDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      const projects = storageService.getProjects();
      const issues = storageService.getIssues();
      
      // I. KHỐI 1
      const statusCounts = {
        'Chủ trương đầu tư': 45,
        'Trình duyệt dự án': 65,
        'Quyết định đầu tư': 45,
        'Phê duyệt phương án': 35,
      };

      // II. KHỐI 2
      const investorData = [
        { name: 'Ban QLDA A', total: 45, delayed: 12, progress: 45 },
        { name: 'Ban QLDA B', total: 38, delayed: 8, progress: 52 },
        { name: 'Ban QLDA C', total: 22, delayed: 4, progress: 68 },
        { name: 'Ban BT GPMB A', total: 18, delayed: 5, progress: 42 },
        { name: 'Ban BT GPMB B', total: 15, delayed: 3, progress: 75 },
      ];

      // IV. KHỐI 4
      const wardData = [
        { name: 'TP.HCM', projects: 64, progress: 42.8, value: 7710.62 },
        { name: 'Bình Dương', projects: 84, progress: 0.2, value: 35.62 },
        { name: 'Vũng Tàu', projects: 17, progress: 25.4, value: 148.25 },
      ];

      // VI. KHỐI 6
      const issueTypes = [
        { name: 'Pháp lý', value: issues.filter(i => i.type === 'Pháp lý').length },
        { name: 'Giá đất', value: issues.filter(i => i.type === 'Giá đất').length },
        { name: 'Người dân', value: issues.filter(i => i.type === 'Người dân').length || 2 },
        { name: 'Tái định cư', value: issues.filter(i => i.type === 'Tái định cư').length },
        { name: 'Phối hợp', value: issues.filter(i => i.type === 'Phối hợp').length },
      ];

      setStats({
        totalProjects: 190,
        statusCounts,
        investorData,
        wardData,
        issueTypes,
        priorityProjects: 15,
        delayedPriority: 2,
        priorityProgress: 68,
        totalCapital: 48553200000000,
        gpmbCapital: 33966350000000,
        disbursedCapital: 7894490000000,
        notDisbursedCount: 4,
        delayedCount: 5,
        delayRanges: [
          { name: '< 30 ngày', value: 3 },
          { name: '30-90 ngày', value: 1 },
          { name: '> 90 ngày', value: 1 },
        ],
        monthlyPlan: {
          policy: { plan: 8, actual: 5 },
          submission: { plan: 5, actual: 3 },
          decision: { plan: 4, actual: 2 },
          approval: { plan: 6, actual: 4 },
        }
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div className="flex items-center justify-center h-full">Đang tải dữ liệu toàn thành phố...</div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Dashboard Điều hành Toàn thành phố</h1>
          <p className="text-slate-500 mt-1">Dữ liệu tổng hợp thời gian thực từ tất cả các đơn vị</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 shadow-sm">
            Tháng 02/2026
          </div>
        </div>
      </div>

      {/* THỐNG KÊ TỔNG QUAN TOÀN THÀNH PHỐ - DẠNG Ô (CARDS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ô 1: Tổng quan chung */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Briefcase size={18} className="text-blue-600" />
            TỔNG QUAN
          </h3>
          <div className="grid grid-cols-1 gap-6 h-[calc(100%-48px)]">
            <div className="p-6 bg-[#F8FAFC] border border-slate-200 rounded-[24px] flex flex-col justify-center">
              <p className="text-xs font-bold text-slate-500 uppercase mb-2">Tổng dự án</p>
              <p className="text-4xl font-black text-[#111827]">{stats.totalProjects}</p>
            </div>
            <div className="p-6 bg-[#EEF2FF] border border-indigo-100 rounded-[24px] flex flex-col justify-center">
              <p className="text-xs font-bold text-indigo-500 uppercase mb-2">Tổng mức ĐT</p>
              <p className="text-4xl font-black text-[#4F46E5]">151.23 nghìn tỷ</p>
            </div>
          </div>
        </div>

        {/* V. KHỐI 5 – TỔNG VỐN NĂM HIỆN HÀNH (Moved up) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <DollarSign size={18} className="text-blue-600" />
            TỔNG VỐN & GIẢI NGÂN NĂM 2026
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100%-48px)]">
            <div className="p-6 bg-[#111827] text-white rounded-[24px] flex flex-col justify-center">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Tổng vốn giao năm</p>
              <p className="text-4xl font-black leading-tight">
                48.55<br />
                <span className="text-2xl">nghìn tỷ</span>
              </p>
            </div>
            <div className="p-6 bg-[#1e293b] text-white rounded-[24px] flex flex-col justify-center">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Vốn GPMB</p>
              <p className="text-4xl font-black leading-tight">
                33.97<br />
                <span className="text-2xl">nghìn tỷ</span>
              </p>
            </div>
            <div className="p-6 bg-[#2E945B] text-white rounded-[24px] flex flex-col justify-center">
              <p className="text-xs font-bold text-emerald-200 uppercase mb-2">Đã giải ngân</p>
              <p className="text-4xl font-black leading-tight mb-2">
                7.89<br />
                <span className="text-2xl">nghìn tỷ</span>
              </p>
              <p className="text-sm font-bold">Đạt {formatPercent((stats.disbursedCapital / stats.gpmbCapital) * 100)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* IX. HỆ THỐNG CẢNH BÁO TỔNG HỢP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FFF5F5] border border-red-100 p-6 rounded-[24px] flex items-center gap-4">
          <AlertTriangle className="text-red-600" size={24} />
          <div>
            <p className="text-xs font-bold text-[#7F1D1D] uppercase mb-1">Dự án trễ {'>'} 30 ngày</p>
            <p className="text-2xl font-black text-[#7F1D1D]">{stats.delayedCount} dự án</p>
          </div>
        </div>
        <div className="bg-[#FFFBEB] border border-amber-100 p-6 rounded-[24px] flex items-center gap-4">
          <ShieldAlert className="text-amber-600" size={24} />
          <div>
            <p className="text-xs font-bold text-[#92400E] uppercase mb-1">Dự án trọng tâm trễ</p>
            <p className="text-2xl font-black text-[#92400E]">{stats.delayedPriority} dự án</p>
          </div>
        </div>
        <div className="bg-[#FEFCE8] border border-yellow-100 p-6 rounded-[24px] flex items-center gap-4">
          <DollarSign className="text-yellow-600" size={24} />
          <div>
            <p className="text-xs font-bold text-[#854D0E] uppercase mb-1">Dự án chưa giải ngân</p>
            <p className="text-2xl font-black text-[#854D0E]">{stats.notDisbursedCount} dự án</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* I. KHỐI 1 – TỔNG SỐ DỰ ÁN */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Briefcase size={18} className="text-blue-600" />
            TỔNG SỐ DỰ ÁN BTHTTĐC
          </h3>
          <div className="flex flex-col items-center">
            <div className="h-[220px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={Object.entries(stats.statusCounts).map(([name, value]) => ({ name, value }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {Object.entries(stats.statusCounts).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-slate-900">{stats.totalProjects}</span>
                <span className="text-xs text-slate-500 uppercase font-bold">Dự án</span>
              </div>
            </div>
            <div className="w-full mt-4 space-y-3">
              {Object.entries(stats.statusCounts).map(([name, value], idx) => (
                <div key={name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                    <span className="text-slate-600 truncate max-w-[180px]">{name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* VIII. KHỐI 8 – KẾ HOẠCH TRONG THÁNG HIỆN HÀNH (Moved up) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Calendar size={18} className="text-blue-600" />
            KẾ HOẠCH HOÀN THÀNH TRONG THÁNG 02/2026
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: 'Chủ trương đầu tư', data: stats.monthlyPlan.policy },
              { label: 'Trình duyệt dự án đầu tư', data: stats.monthlyPlan.submission },
              { label: 'Quyết định đầu tư', data: stats.monthlyPlan.decision },
              { label: 'Phê duyệt phương án', data: stats.monthlyPlan.approval },
            ].map((item, idx) => {
              const progress = (item.data.actual / item.data.plan) * 100;
              return (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-700 max-w-[150px]">{item.label}</span>
                    <span className="text-xl font-bold text-blue-600">{progress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full" style={{ width: `${progress}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400 uppercase">Kế hoạch: {item.data.plan}</span>
                    <span className="text-emerald-600 uppercase">Đã đạt: {item.data.actual}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* III. KHỐI 3 – DỰ ÁN TRỌNG TÂM */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-blue-600" />
            DỰ ÁN TRỌNG TÂM & HOÀN THÀNH TRONG NĂM
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-blue-600 uppercase">Tổng dự án trọng tâm</p>
              <p className="text-2xl font-bold text-blue-900">{stats.priorityProjects}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-red-600 uppercase">Trọng tâm đang chậm</p>
              <p className="text-2xl font-bold text-red-900">{stats.delayedPriority}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold text-slate-700">Tỷ lệ hoàn thành nhóm trọng tâm</span>
                <span className="text-sm font-bold text-blue-600">{stats.priorityProgress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: `${stats.priorityProgress}%` }}></div>
              </div>
            </div>
            <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50">
              <p className="text-xs text-slate-500 italic">Ghi chú: Có 15 dự án phải hoàn thành dứt điểm trong năm 2026 theo chỉ đạo của UBND Thành phố.</p>
            </div>
          </div>
        </div>

        {/* VI. KHỐI 6 – KHÓ KHĂN VƯỚNG MẮC (Moved up) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <AlertCircle size={18} className="text-blue-600" />
            KHÓ KHĂN VƯỚNG MẮC ĐANG XỬ LÝ
          </h3>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.issueTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.issueTypes.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-3">
              {stats.issueTypes.map((item: any, idx: number) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{item.value} vụ</span>
                </div>
              ))}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-red-600 font-bold">
                  <span>Tồn đọng </span>
                  <span>7 vụ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VII. KHỐI 7 – DỰ ÁN TRỄ THEO KẾ HOẠCH */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Clock size={18} className="text-red-600" />
            DỰ ÁN TRỄ THEO KẾ HOẠCH
          </h3>
          <div className="flex items-center gap-8 mb-8">
            <div className="bg-red-600 text-white p-6 rounded-2xl text-center min-w-[140px]">
              <p className="text-[10px] font-bold text-red-200 uppercase mb-1">Tổng dự án trễ</p>
              <p className="text-4xl font-bold">{stats.delayedCount}</p>
            </div>
            <div className="flex-1 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.delayRanges}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top dự án trễ nhiều nhất</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                <span className="text-sm font-bold text-slate-700">DA-001: Mở rộng đường Nguyễn Huệ</span>
                <span className="text-sm font-bold text-red-600">45 ngày</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                <span className="text-sm font-bold text-slate-700">DA-005: Rạch Xuyên Tâm</span>
                <span className="text-sm font-bold text-red-600">32 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* II. KHỐI 2 – TỔNG DỰ ÁN THEO CHỦ ĐẦU TƯ (Moved down) */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Building2 size={18} className="text-blue-600" />
          XẾP HẠNG THEO CHỦ ĐẦU TƯ
        </h3>
        <div className="h-[250px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.investorData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="total" name="Tổng dự án" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="delayed" name="Dự án chậm" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-100">
                <th className="pb-3">Chủ đầu tư</th>
                <th className="pb-3 text-center">Tổng DA</th>
                <th className="pb-3 text-center">Chậm</th>
                <th className="pb-3 text-right">Tỷ lệ hoàn thành</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {stats.investorData.map((item: any) => (
                <tr key={item.name} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 font-semibold text-slate-700">{item.name}</td>
                  <td className="py-3 text-center font-bold">{item.total}</td>
                  <td className="py-3 text-center font-bold text-red-600">{item.delayed}</td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full" style={{ width: `${item.progress}%` }}></div>
                      </div>
                      <span className="font-bold text-emerald-600 text-xs">{item.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
