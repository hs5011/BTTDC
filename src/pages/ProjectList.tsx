import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  ChevronRight, 
  Star,
  MapPin,
  Building2,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { cn, formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';
import { storageService } from '../services/storageService';

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const data = storageService.getProjects();
    setProjects(data);
    setLoading(false);
  }, []);

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    if (status.includes('Đã duyệt phương án')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (status.includes('Đã duyệt dự án')) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-amber-100 text-amber-700 border-amber-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Danh mục dự án</h1>
          <p className="text-slate-500 mt-1">Quản lý toàn bộ danh sách dự án BTHTTĐC năm 2026</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
          <Plus size={18} />
          Thêm dự án mới
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm theo tên hoặc mã dự án..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
            <Filter size={16} />
            Bộ lọc
          </button>
          <select className="flex-1 md:flex-none px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium outline-none">
            <option>Tất cả trạng thái</option>
            <option>Đã duyệt phương án</option>
            <option>Đã duyệt dự án</option>
            <option>Có chủ trương</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-20 text-slate-400">Đang tải danh sách...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-slate-400">Không tìm thấy dự án nào</div>
        ) : (
          filteredProjects.map((project, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              key={project.id}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all group relative overflow-hidden"
            >
              {project.is_priority === 1 && (
                <div className="absolute top-0 right-0">
                  <div className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> TRỌNG TÂM
                  </div>
                </div>
              )}
              
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">{project.code}</span>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase", getStatusColor(project.legal_status))}>
                      {project.legal_status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{project.name}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-y-2 gap-x-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Building2 size={16} className="text-slate-400" />
                      <span className="font-medium">Chủ đầu tư:</span>
                      <span className="text-slate-700">{project.investor_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={16} className="text-slate-400" />
                      <span className="font-medium">Địa bàn:</span>
                      <span className="text-slate-700">{project.locations || 'Chưa xác định'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar size={16} className="text-slate-400" />
                      <span className="font-medium">Hạn bàn giao:</span>
                      <span className="text-slate-700">{project.handover_deadline}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 min-w-[200px]">
                  <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Tổng vốn BT</p>
                    <p className="text-lg font-bold text-slate-900">{formatCurrency(project.total_compensation_capital)}</p>
                  </div>
                  <Link 
                    to={`/projects/${project.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg text-sm font-bold transition-all"
                  >
                    Chi tiết <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
