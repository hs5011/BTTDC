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
        'Chủ trương đầu tư': 10,
        'Trình duyệt dự án': 40,
        'Quyết định đầu tư': 27,
        'Phê duyệt phương án': 25,
      };

      // II. KHỐI 2
      const investorData = [
        { name: 'Ban QLDA CT Giao thông', total: 45, delayed: 12, progress: 45 },
        { name: 'Các BQL quận/huyện', total: 38, delayed: 8, progress: 52 },
        { name: 'Ban QLDA Nông nghiệp', total: 22, delayed: 4, progress: 68 },
        { name: 'Ban BT GPMB Thủ Đức', total: 18, delayed: 5, progress: 42 },
        { name: 'Ban QLDA Dân dụng', total: 15, delayed: 3, progress: 75 },
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
        totalProjects: 165,
        statusCounts,
        investorData,
        wardData,
        issueTypes,
        priorityProjects: 15,
        delayedPriority: 2,
        priorityProgress: 68,
        totalCapital: 48553200000000,
        disbursedCapital: 7894490000000,
        notDisbursedCount: 4,
        delayedCount: 5,
        delayRanges: [
          { name: '< 30 ngày', value: 3 },
          { name: '30-90 ngày', value: 1 },
          { name: '> 90 ngày', value: 1 },
        ],
        monthlyPlan: {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Ô 1: Tổng quan chung */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Briefcase size={18} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng quan</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-slate-600">Tổng dự án</span>
              <span className="text-2xl font-black text-slate-900 leading-none">{stats.totalProjects}</span>
            </div>
            <div className="flex justify-between items-end pt-2 border-t border-slate-50">
              <span className="text-sm font-bold text-slate-600">Tổng mức ĐT</span>
              <span className="text-lg font-black text-blue-600 leading-none">451.239 tỷ</span>
            </div>
          </div>
        </div>

        {/* Ô 2: Kế hoạch & Giải ngân */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <DollarSign size={18} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tài chính</p>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-slate-500 mb-1">Kế hoạch vốn</p>
              <p className="text-xl font-black text-slate-900">{formatTrillion(stats.totalCapital)}</p>
            </div>
            <div className="pt-2 border-t border-slate-50">
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-bold text-slate-500">Giải ngân</p>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {formatPercent((stats.disbursedCapital / stats.totalCapital) * 100)}
                </span>
              </div>
              <p className="text-xl font-black text-emerald-600">{formatTrillion(stats.disbursedCapital)}</p>
            </div>
          </div>
        </div>

        {/* Ô 3: Chưa thi công */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <FileText size={18} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chưa thi công</p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-2xl font-black text-slate-900">
              {stats.statusCounts['Chủ trương đầu tư'] + stats.statusCounts['Trình duyệt dự án'] + stats.statusCounts['Quyết định đầu tư']}
            </span>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Pháp lý</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-medium text-slate-500">
              <span>Chủ trương ĐT</span>
              <span className="font-bold text-slate-700">{stats.statusCounts['Chủ trương đầu tư']}</span>
            </div>
            <div className="flex justify-between text-[10px] font-medium text-slate-500">
              <span>Duyệt dự án</span>
              <span className="font-bold text-slate-700">{stats.statusCounts['Trình duyệt dự án']}</span>
            </div>
            <div className="flex justify-between text-[10px] font-medium text-slate-500">
              <span>Duyệt TKKT</span>
              <span className="font-bold text-slate-700">{stats.statusCounts['Quyết định đầu tư']}</span>
            </div>
          </div>
        </div>

        {/* Ô 4: Đang thi công */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <TrendingUp size={18} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Đang thi công</p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-2xl font-black text-slate-900">63</span>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Thực địa</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-medium text-slate-500">
              <span>Có vướng mắc</span>
              <span className="font-bold text-red-600">45</span>
            </div>
            <div className="flex justify-between text-[10px] font-medium text-slate-500">
              <span>Chưa giải pháp</span>
              <span className="font-bold text-red-600">43</span>
            </div>
          </div>
        </div>

        {/* Ô 5: Đã hoàn thành */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <CheckCircle2 size={18} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hoàn thành</p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-2xl font-black text-slate-900">{stats.statusCounts['Phê duyệt phương án']}</span>
            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Kết thúc</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-medium text-slate-500">
              <span>Trình duyệt QT</span>
              <span className="font-bold text-slate-700">14</span>
            </div>
            <div className="flex justify-between text-[10px] font-medium text-slate-500">
              <span>Đã quyết toán</span>
              <span className="font-bold text-slate-700">3</span>
            </div>
          </div>
        </div>
      </div>

      {/* IX. HỆ THỐNG CẢNH BÁO TỔNG HỢP */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3">
          <AlertTriangle className="text-red-600" size={20} />
          <div>
            <p className="text-xs font-bold text-red-800 uppercase">Dự án trễ {'>'} 30 ngày</p>
            <p className="text-lg font-bold text-red-600">{stats.delayedCount} dự án</p>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center gap-3">
          <ShieldAlert className="text-orange-600" size={20} />
          <div>
            <p className="text-xs font-bold text-orange-800 uppercase">Dự án trọng tâm trễ</p>
            <p className="text-lg font-bold text-orange-600">{stats.delayedPriority} dự án</p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-3">
          <DollarSign className="text-amber-600" size={20} />
          <div>
            <p className="text-xs font-bold text-amber-800 uppercase">Dự án chưa giải ngân</p>
            <p className="text-lg font-bold text-amber-600">{stats.notDisbursedCount} dự án</p>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center gap-3">
          <Clock className="text-blue-600" size={20} />
          <div>
            <p className="text-xs font-bold text-blue-800 uppercase">Vướng mắc tồn đọng lâu</p>
            <p className="text-lg font-bold text-blue-600">3 vụ việc</p>
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

        {/* II. KHỐI 2 – TỔNG DỰ ÁN THEO CHỦ ĐẦU TƯ */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

        {/* IV. KHỐI 4 – TỔNG DỰ ÁN THEO ĐỊA BÀN */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <MapPin size={18} className="text-blue-600" />
            TIẾN ĐỘ THEO ĐỊA BÀN (P/X/ĐK)
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.wardData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={120} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="progress" name="Tỷ lệ hoàn thành" radius={[0, 4, 4, 0]} barSize={20}>
                  {stats.wardData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.progress > 80 ? '#10b981' : entry.progress > 60 ? '#3b82f6' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Địa bàn chậm nhất: P. Phạm Ngũ Lão</span>
            <span>Địa bàn nhanh nhất: P. Bến Nghé</span>
          </div>
        </div>
      </div>

      {/* V. KHỐI 5 – TỔNG VỐN NĂM HIỆN HÀNH */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
          <DollarSign size={18} className="text-blue-600" />
          TỔNG VỐN & GIẢI NGÂN NĂM 2026
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="p-4 bg-slate-900 text-white rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tổng vốn giao năm</p>
              <p className="text-2xl font-bold">{formatTrillion(stats.totalCapital)}</p>
            </div>
            <div className="p-4 bg-emerald-600 text-white rounded-2xl">
              <p className="text-[10px] font-bold text-emerald-200 uppercase mb-1">Đã giải ngân</p>
              <p className="text-2xl font-bold">{formatTrillion(stats.disbursedCapital)}</p>
              <p className="text-xs font-bold mt-1">Đạt {formatPercent((stats.disbursedCapital / stats.totalCapital) * 100)}</p>
            </div>
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
              <p className="text-[10px] font-bold text-red-600 uppercase mb-1">Dự án chưa giải ngân</p>
              <p className="text-2xl font-bold text-red-900">{stats.notDisbursedCount} dự án</p>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Kế hoạch', value: stats.totalCapital },
                  { name: 'Thực hiện', value: stats.disbursedCapital }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${(val / 1e12).toFixed(0)}T`} />
                  <Tooltip formatter={(val: any) => formatTrillion(val)} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={80}>
                    <Cell fill="#1e293b" />
                    <Cell fill="#10b981" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* VI. KHỐI 6 – KHÓ KHĂN VƯỚNG MẮC */}
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
                  <span>Tồn đọng {'>'} 30 ngày</span>
                  <span>3 vụ</span>
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

      {/* VIII. KHỐI 8 – KẾ HOẠCH TRONG THÁNG HIỆN HÀNH */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Calendar size={18} className="text-blue-600" />
          KẾ HOẠCH HOÀN THÀNH TRONG THÁNG 02/2026
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { label: 'Trình duyệt dự án đầu tư', data: stats.monthlyPlan.submission },
            { label: 'Quyết định đầu tư', data: stats.monthlyPlan.decision },
            { label: 'Phê duyệt phương án BT', data: stats.monthlyPlan.approval },
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
  );
}
