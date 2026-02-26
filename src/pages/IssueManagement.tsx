import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  User,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { Issue } from '../types';
import { cn } from '../lib/utils';
import { storageService } from '../services/storageService';

export default function IssueManagement() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const data = storageService.getIssues();
    setIssues(data);
    setLoading(false);
  }, []);

  const filteredIssues = issues.filter(i => filter === 'All' || i.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý vướng mắc</h1>
          <p className="text-slate-500 mt-1">Theo dõi và xử lý các khó khăn trong công tác BTHTTĐC</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
          <Plus size={18} />
          Báo cáo vướng mắc mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg">
              <AlertTriangle size={20} />
            </div>
            <h3 className="font-bold text-slate-900">Tổng vướng mắc</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{issues.length}</p>
          <p className="text-xs text-slate-500 mt-1">Trong đó 5 vụ việc tồn đọng {'>'} 30 ngày</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Clock size={20} />
            </div>
            <h3 className="font-bold text-slate-900">Đang xử lý</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{issues.filter(i => i.status === 'Processing').length}</p>
          <p className="text-xs text-slate-500 mt-1">Tỷ lệ xử lý đúng hạn: 85%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="font-bold text-slate-900">Đã giải quyết</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{issues.filter(i => i.status === 'Resolved').length}</p>
          <p className="text-xs text-slate-500 mt-1">Trung bình 12 ngày/vụ việc</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
            {['All', 'Pending', 'Processing', 'Resolved'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-bold transition-all",
                  filter === s ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {s === 'All' ? 'Tất cả' : s}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Tìm theo dự án..." 
              className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none w-full md:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Dự án & Nội dung</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Phân loại</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Mức độ</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Đơn vị xử lý</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Thời hạn</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-slate-400">Đang tải dữ liệu...</td></tr>
              ) : filteredIssues.map((issue, idx) => (
                <motion.tr 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: idx * 0.05 }}
                  key={issue.id} 
                  className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-blue-600 mb-1">{issue.project_name}</p>
                    <p className="text-sm font-medium text-slate-900 line-clamp-1">{issue.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600">{issue.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                      issue.severity === 'High' ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {issue.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <User size={14} className="text-slate-400" />
                      {issue.assigned_unit}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Calendar size={14} className="text-slate-400" />
                      {issue.deadline}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-xs font-bold",
                      issue.status === 'Resolved' ? "text-emerald-600" : 
                      issue.status === 'Processing' ? "text-blue-600" : "text-amber-600"
                    )}>
                      {issue.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
