import React, { useState, useEffect } from 'react';
import { formatCurrency, formatPercent, formatArea, formatTrillion, cn } from '../lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  Briefcase, 
  AlertCircle, 
  DollarSign, 
  Map, 
  ArrowUpRight,
  Calendar,
  Filter,
  Clock,
  Star,
  CheckCircle,
  Shield,
  MapPin
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
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';
import { DashboardStats } from '../types';
import { storageService } from '../services/storageService';

const StatCard = ({ 
  title, 
  value, 
  subValue, 
  icon: Icon, 
  color, 
  trend 
}: { 
  title: string, 
  value: string | number, 
  subValue?: string, 
  icon: any, 
  color: string,
  trend?: { value: string, positive: boolean }
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
  >
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
            {trend.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.value}
          </div>
        )}
      </div>
      <div className={cn("p-3 rounded-xl", color)}>
        <Icon size={24} />
      </div>
    </div>
  </motion.div>
);

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const [projectStatusData, setProjectStatusData] = useState<any[]>([]);
  const [locationData, setLocationData] = useState<any[]>([]);

  useEffect(() => {
    const data = storageService.getDashboardStats();
    setStats(data);
    
    // Calculate location data
    const projects = storageService.getProjects();
    const locCounts: Record<string, number> = {};
    projects.forEach(p => {
      if (p.locations) {
        p.locations.split(',').forEach(loc => {
          const trimmed = loc.trim();
          if (trimmed) {
            locCounts[trimmed] = (locCounts[trimmed] || 0) + 1;
          }
        });
      }
    });
    
    const sortedLocs = Object.entries(locCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 7);
    
    setLocationData(sortedLocs);
    
    setProjectStatusData([
      { name: 'Đúng tiến độ', value: 65 },
      { name: 'Chậm tiến độ', value: 15 },
      { name: 'Nguy cơ', value: 20 },
    ]);
    
    setLoading(false);
  }, []);

  const disbursementData = [
    { name: 'Tháng 1', value: 4000 },
    { name: 'Tháng 2', value: 3000 },
    { name: 'Tháng 3', value: 2000 },
    { name: 'Tháng 4', value: 2780 },
    { name: 'Tháng 5', value: 1890 },
    { name: 'Tháng 6', value: 2390 },
  ];

  if (loading || !stats) return <div className="flex items-center justify-center h-full">Đang tải dữ liệu...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tổng quan Thành phố</h1>
          <p className="text-slate-500 mt-1">Dữ liệu cập nhật đến ngày 26/02/2026</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            <Calendar size={16} />
            Năm 2026
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
            <Filter size={16} />
            Lọc báo cáo
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Tổng số dự án" 
          value={stats.totalProjects} 
          icon={Briefcase} 
          color="bg-blue-50 text-blue-600"
        />
        <StatCard 
          title="Dự án trọng tâm" 
          value={stats.priorityProjects} 
          icon={Star} 
          color="bg-orange-50 text-orange-500"
        />
        <StatCard 
          title="Kế hoạch vốn 2026" 
          value={formatTrillion(stats.totalCapitalPlan)} 
          icon={TrendingUp} 
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard 
          title="Tỷ lệ giải ngân chung" 
          value={formatPercent(stats.overallDisbursementRate)} 
          icon={CheckCircle} 
          color="bg-blue-50 text-blue-600"
        />
        <StatCard 
          title="Vốn DA Bồi thường" 
          value={formatTrillion(stats.compensationCapital)} 
          icon={MapPin} 
          color="bg-indigo-50 text-indigo-600"
        />
        <StatCard 
          title="Giải ngân Bồi thường" 
          value={formatTrillion(stats.compensationDisbursement)} 
          icon={CheckCircle} 
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard 
          title="Khó khăn vướng mắc" 
          value={stats.activeIssues} 
          icon={Shield} 
          color="bg-red-50 text-red-600"
        />
        <StatCard 
          title="Dự án chậm tiến độ" 
          value={stats.delayedProjects} 
          icon={AlertCircle} 
          color="bg-red-50 text-red-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Tiến độ giải ngân theo tháng</h3>
            <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
              Xem chi tiết <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={disbursementData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Trạng thái dự án</h3>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-900">{stats.totalProjects}</span>
              <span className="text-xs text-slate-500">Dự án</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {projectStatusData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* New Location Chart Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-900">Dự án theo Địa bàn (P/X/ĐK)</h3>
          <span className="text-xs text-slate-500">Top 7 địa bàn có nhiều dự án nhất</span>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={locationData} layout="vertical" margin={{ left: 40, right: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                width={150}
                tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }} 
              />
              <Tooltip 
                cursor={{fill: 'transparent'}} 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
              />
              <Bar dataKey="count" name="Số lượng dự án" radius={[0, 4, 4, 0]} barSize={25}>
                {locationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Cảnh báo hệ thống</h3>
          <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-bold rounded">4 CẢNH BÁO MỚI</span>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0">
              <Clock size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Dự án DA-001 chậm bàn giao mặt bằng</p>
              <p className="text-xs text-slate-500 mt-1">Đã quá hạn 15 ngày so với kế hoạch chỉ đạo.</p>
            </div>
            <button className="text-xs font-medium text-blue-600 hover:underline">Xử lý ngay</button>
          </div>
          <div className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg shrink-0">
              <DollarSign size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Tỷ lệ giải ngân thấp tại DA-003</p>
              <p className="text-xs text-slate-500 mt-1">Giải ngân đạt 12% kế hoạch năm (Dưới mức 40% cảnh báo).</p>
            </div>
            <button className="text-xs font-medium text-blue-600 hover:underline">Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  );
}
