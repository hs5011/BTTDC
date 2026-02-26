import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CheckCircle2, 
  MapPin, 
  DollarSign,
  ArrowRight,
  Filter
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
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { storageService } from '../services/storageService';
import { DashboardStats } from '../types';
import { cn, formatCurrency, formatPercent, formatTrillion } from '../lib/utils';

const StatCard = ({ title, value, subValue, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex items-center gap-4">
      <div className={cn("p-3 rounded-xl", color)}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        {subValue && <p className="text-xs text-slate-400 mt-1">{subValue}</p>}
      </div>
    </div>
  </div>
);

export default function PaymentReport() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [wardData, setWardData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStats(storageService.getDashboardStats());
    setWardData(storageService.getWardData());
    setLoading(false);
  }, []);

  const funnelData = [
    { name: 'Phê duyệt phương án', value: 100, count: 450 },
    { name: 'Công khai phương án', value: 85, count: 382 },
    { name: 'Chi trả', value: 60, count: 270 },
    { name: 'Bàn giao mặt bằng', value: 45, count: 202 },
  ];

  if (loading || !stats) return <div className="p-8">Đang tải...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">MẪU 3</h1>
          <p className="text-slate-500 mt-1">Theo dõi tiến độ dự án đã phê duyệt phương án bồi thường, hỗ trợ, tái định cư</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
          <Filter size={16} /> Lọc địa bàn
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tổng số hộ chi trả" value={stats.totalPayableHouseholds} icon={Users} color="bg-blue-50 text-blue-600" />
        <StatCard title="Số hộ đã nhận tiền" value={stats.paidHouseholds} icon={CheckCircle2} color="bg-emerald-50 text-emerald-600" />
        <StatCard title="Số hộ đã bàn giao" value={stats.handedOverHouseholds} icon={MapPin} color="bg-indigo-50 text-indigo-600" />
        <StatCard title="Tỷ lệ bàn giao" value={formatPercent((stats.handedOverHouseholds / stats.totalPayableHouseholds) * 100)} icon={CheckCircle2} color="bg-blue-50 text-blue-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="Kinh phí phê duyệt" value={formatTrillion(stats.compensationCapital)} icon={DollarSign} color="bg-orange-50 text-orange-600" />
        <StatCard title="Kinh phí đã giải ngân" value={formatTrillion(stats.compensationDisbursement)} subValue={`Đạt ${formatPercent((stats.compensationDisbursement / stats.compensationCapital) * 100)}`} icon={CheckCircle2} color="bg-emerald-50 text-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Phễu tiến độ (Funnel)</h3>
          <div className="space-y-4">
            {funnelData.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-600">{item.name}</span>
                  <span className="text-xs font-bold text-slate-900">{item.count} hộ ({item.value}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-8 rounded-lg overflow-hidden relative">
                  <div 
                    className="bg-blue-600 h-full transition-all duration-1000" 
                    style={{ width: `${item.value}%`, opacity: 1 - (idx * 0.15) }}
                  ></div>
                </div>
                {idx < funnelData.length - 1 && (
                  <div className="flex justify-center my-1">
                    <ArrowRight size={14} className="text-slate-300 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">So sánh tiến độ theo Xã/Phường</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wardData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                <Bar dataKey="paid" name="Số hộ đã nhận tiền" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="handedOver" name="Số hộ đã bàn giao" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
