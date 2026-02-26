import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { storageService } from '../services/storageService';
import { DashboardStats } from '../types';
import { cn } from '../lib/utils';

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex items-center gap-4">
      <div className={cn("p-3 rounded-xl", color)}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
    </div>
  </div>
);

export default function LegalReport() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStats(storageService.getDashboardStats());
    setLoading(false);
  }, []);

  const directiveData = [
    { name: 'Dự án DA-001', progress: 85 },
    { name: 'Dự án DA-002', progress: 60 },
    { name: 'Dự án DA-003', progress: 40 },
    { name: 'Dự án DA-004', progress: 95 },
    { name: 'Dự án DA-005', progress: 20 },
  ];

  const timelineData = [
    { label: 'Chủ trương đầu tư', date: '15/01/2026', status: 'Completed' },
    { label: 'Hoàn thành hồ sơ', date: '10/02/2026', status: 'Completed' },
    { label: 'Trình duyệt', date: '20/02/2026', status: 'Processing' },
    { label: 'Dự kiến phê duyệt', date: '15/03/2026', status: 'Pending' },
  ];

  if (loading || !stats) return <div className="p-8">Đang tải...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">MẪU 1</h1>
        <p className="text-slate-500 mt-1">Theo dõi tiến độ dự án đã có chủ trương đầu tư, nhưng chưa duyệt dự án đầu tư</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Dự án chưa duyệt đầu tư" 
          value={stats.notApprovedProjects} 
          icon={FileText} 
          color="bg-orange-50 text-orange-600"
        />
        <StatCard 
          title="Hồ sơ đang thẩm định" 
          value={stats.appraisingDossiers} 
          icon={Clock} 
          color="bg-blue-50 text-blue-600"
        />
        <StatCard 
          title="Chỉ đạo đã hoàn thành" 
          value={stats.completedDirectives} 
          icon={CheckCircle2} 
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard 
          title="Chỉ đạo chưa hoàn thành" 
          value={stats.pendingDirectives} 
          icon={AlertCircle} 
          color="bg-red-50 text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Timeline các mốc quan trọng</h3>
          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {timelineData.map((item, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-[.is-active]:bg-blue-600 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  {item.status === 'Completed' ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900">{item.label}</div>
                    <time className="font-mono text-xs text-blue-600">{item.date}</time>
                  </div>
                  <div className="text-slate-500 text-xs">Trạng thái: {item.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Tiến độ thực hiện chỉ đạo UBND</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={directiveData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="progress" radius={[0, 4, 4, 0]} barSize={20}>
                  {directiveData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.progress > 80 ? '#10b981' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">Danh sách dự án quá hạn {'>'} 30 ngày</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { code: 'DA-001', name: 'Dự án Mở rộng đường Nguyễn Huệ', overdue: 45, unit: 'Phòng TN&MT' },
            { code: 'DA-005', name: 'Dự án Chỉnh trang đô thị rạch Xuyên Tâm', overdue: 32, unit: 'Sở Xây dựng' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between bg-red-50/30">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">Mã: {item.code} | Đơn vị: {item.unit}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-red-600">Quá hạn {item.overdue} ngày</p>
                <button className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1 ml-auto">
                  Chi tiết <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
