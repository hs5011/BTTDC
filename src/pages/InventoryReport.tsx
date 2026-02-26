import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CheckCircle2, 
  MapPin, 
  Home,
  FileText,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
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

export default function InventoryReport() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [wardData, setWardData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStats(storageService.getDashboardStats());
    setWardData(storageService.getWardData());
    setLoading(false);
  }, []);

  if (loading || !stats) return <div className="p-8">Đang tải...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">MẪU 2</h1>
        <p className="text-slate-500 mt-1">Đã phê duyệt dự án đầu tư, chưa phê duyệt phương án bồi thường, hỗ trợ, tái định cư</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Tổng số hộ ảnh hưởng" value={stats.totalAffectedHouseholds} icon={Users} color="bg-blue-50 text-blue-600" />
        <StatCard title="Số hộ đã kiểm đếm" value={stats.inventoriedHouseholds} icon={CheckCircle2} color="bg-emerald-50 text-emerald-600" />
        <StatCard title="Đã xác nhận nguồn gốc" value={stats.confirmedLandOriginHouseholds} icon={MapPin} color="bg-indigo-50 text-indigo-600" />
        <StatCard title="Dự kiến tái định cư" value={stats.resettlementHouseholds} icon={Home} color="bg-orange-50 text-orange-600" />
        <StatCard title="Đã lập dự thảo PA" value={stats.draftPlanHouseholds} icon={FileText} color="bg-amber-50 text-amber-600" />
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6">Tiến độ thực hiện theo Xã/Phường</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={wardData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
              <Bar dataKey="affected" name="Tổng số hộ" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              <Bar dataKey="inventoried" name="Đã kiểm đếm" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="draft" name="Lập dự thảo PA" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Heatmap địa bàn chậm tiến độ</h3>
          <div className="space-y-4">
            {wardData.map((ward, idx) => {
              const progress = (ward.inventoried / ward.affected) * 100;
              return (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      progress < 50 ? "bg-red-500" : progress < 80 ? "bg-amber-500" : "bg-emerald-500"
                    )}></div>
                    <span className="font-bold text-slate-900">{ward.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-500">{ward.inventoried}/{ward.affected} hộ</span>
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-bold",
                      progress < 50 ? "bg-red-100 text-red-700" : progress < 80 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                    )}>
                      {progress.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Cảnh báo rủi ro</h3>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-4">
              <AlertTriangle className="text-red-600 shrink-0" size={24} />
              <div>
                <p className="text-sm font-bold text-red-900">Chậm tiến độ kiểm đếm tại Phường Phạm Ngũ Lão</p>
                <p className="text-xs text-red-700 mt-1">Tỷ lệ đạt 65%, thấp hơn 15% so với kế hoạch đề ra.</p>
              </div>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-4">
              <TrendingUp className="text-emerald-600 shrink-0" size={24} />
              <div>
                <p className="text-sm font-bold text-emerald-900">Phường Bến Nghé đạt tiến độ xuất sắc</p>
                <p className="text-xs text-emerald-700 mt-1">Đã hoàn thành 100% công tác xác nhận nguồn gốc đất.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
