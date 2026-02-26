import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  FileText,
  DollarSign,
  Users,
  ChevronRight,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn, formatCurrency, formatPercent, formatArea } from '../lib/utils';
import { storageService } from '../services/storageService';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      const data = storageService.getProjectById(parseInt(id));
      // Mocking related data for detail view
      if (data) {
        setProject({
          ...data,
          capital: { annual_plan: 100000000000, annual_disbursement: 45000000000 },
          land: { total_area: 5000, recovered_area: 2500 },
          steps: [
            { id: 1, step_name: "Thông báo thu hồi đất", actual_value: 100 },
            { id: 2, step_name: "Kiểm đếm", actual_value: 85 },
            { id: 3, step_name: "Xác nhận pháp lý", actual_value: 60 },
            { id: 4, step_name: "Lập phương án", actual_value: 20 },
          ],
          households: [{ total_households: 120, handed_over_households: 40 }],
          issues: storageService.getIssues().filter(i => i.project_id === parseInt(id))
        });
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-full">Đang tải chi tiết dự án...</div>;
  if (!project) return <div className="text-center py-20">Không tìm thấy dự án</div>;

  const tabs = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'progress', label: 'Tiến độ pháp lý' },
    { id: 'capital', label: 'Vốn & Giải ngân' },
    { id: 'households', label: 'Hộ dân & TĐC' },
    { id: 'issues', label: 'Vướng mắc' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/projects')}
          className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{project.name}</h1>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">{project.code}</span>
          </div>
          <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <Building2 size={14} /> {project.investor_name}
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} /> {project.locations?.map((l: any) => l.name).join(', ') || 'Chưa xác định'}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-200/50 p-1 rounded-xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
              activeTab === tab.id 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Giải ngân năm</p>
                  <h4 className="text-xl font-bold text-slate-900">
                    {formatPercent((project.capital?.annual_disbursement / project.capital?.annual_plan) * 100 || 0)}
                  </h4>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full" 
                      style={{ width: `${(project.capital?.annual_disbursement / project.capital?.annual_plan) * 100 || 0}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Diện tích thu hồi</p>
                  <h4 className="text-xl font-bold text-slate-900">
                    {formatPercent((project.land?.recovered_area / project.land?.total_area) * 100 || 0)}
                  </h4>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full" 
                      style={{ width: `${(project.land?.recovered_area / project.land?.total_area) * 100 || 0}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Bàn giao mặt bằng</p>
                  <h4 className="text-xl font-bold text-slate-900">
                    {formatPercent((project.households?.reduce((acc: any, h: any) => acc + h.handed_over_households, 0) / project.households?.reduce((acc: any, h: any) => acc + h.total_households, 0)) * 100 || 0)}
                  </h4>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full" 
                      style={{ width: `${(project.households?.reduce((acc: any, h: any) => acc + h.handed_over_households, 0) / project.households?.reduce((acc: any, h: any) => acc + h.total_households, 0)) * 100 || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Clock size={18} className="text-blue-600" />
                  Tiến độ các bước thực hiện
                </h3>
                <div className="space-y-6">
                  {project.steps?.map((step: any, idx: number) => (
                    <div key={step.id} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700">{step.step_name}</span>
                        <span className="text-xs font-bold text-slate-900">{step.actual_value}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            step.actual_value >= 100 ? "bg-emerald-500" : "bg-blue-600"
                          )}
                          style={{ width: `${step.actual_value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'issues' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Danh sách vướng mắc</h3>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold">
                  <Plus size={14} /> Thêm vướng mắc
                </button>
              </div>
              {project.issues?.length > 0 ? (
                project.issues.map((issue: any) => (
                  <div key={issue.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                          issue.severity === 'High' ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                        )}>
                          {issue.severity}
                        </span>
                        <span className="text-xs font-bold text-slate-500">{issue.type}</span>
                      </div>
                      <span className="text-xs text-slate-400">Hạn: {issue.deadline}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-900 mt-2">{issue.description}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Users size={14} /> Đơn vị: {issue.assigned_unit}
                      </div>
                      <span className="text-xs font-bold text-blue-600">{issue.status}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-300 text-slate-400">
                  Chưa có vướng mắc nào được ghi nhận
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Thông tin pháp lý</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Trạng thái hiện tại</p>
                <p className="text-sm font-semibold text-blue-600 mt-1">{project.legal_status}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Tổng mức đầu tư</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">{formatCurrency(project.total_investment)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Vốn BTHTTĐC</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">{formatCurrency(project.total_compensation_capital)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Hạn bàn giao</p>
                <p className="text-sm font-semibold text-red-600 mt-1 flex items-center gap-1">
                  <Calendar size={14} /> {project.handover_deadline}
                </p>
              </div>
            </div>
            <button className="w-full mt-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all">
              Cập nhật thông tin
            </button>
          </div>

          <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-600/20">
            <h3 className="font-bold mb-2">Hành động nhanh</h3>
            <p className="text-xs text-blue-100 mb-4">Xuất báo cáo hoặc gửi thông báo cho các đơn vị liên quan.</p>
            <div className="space-y-2">
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all">
                <FileText size={16} /> Xuất báo cáo Mẫu 1
              </button>
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all">
                <AlertTriangle size={16} /> Gửi cảnh báo chậm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
