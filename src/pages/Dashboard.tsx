import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Users, 
  Map, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Search,
  Filter,
  ArrowUpRight,
  Building2,
  FileText,
  LayoutDashboard
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
import { cn, formatCurrency, formatPercent, formatArea } from '../lib/utils';

// Stat Card Component for Row 1
const StatCard = ({ title, items, icon: Icon, color, progress }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
    <div className="flex items-center justify-between mb-4">
      <div className={cn("p-2 rounded-lg", color)}>
        <Icon size={20} />
      </div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</span>
    </div>
    <div className="space-y-3 flex-1">
      {items.map((item: any, idx: number) => (
        <div key={idx} className="flex justify-between items-end">
          <span className="text-xs text-slate-500">{item.label}</span>
          <span className={cn("font-bold text-slate-900", item.isHighlight ? "text-lg" : "text-sm")}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
    {progress !== undefined && (
      <div className="mt-4 pt-4 border-t border-slate-50">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Tỷ lệ hoàn thành</span>
          <span className="text-xs font-bold text-blue-600">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-blue-600 h-full transition-all duration-1000" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    )}
  </div>
);

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  // Mock Data for Progress Table
  const progressSteps = [
    { name: 'Thông báo thu hồi đất', cases: 1250, total: 1250, rate: 100 },
    { name: 'Kiểm đếm, thu thập hồ sơ pháp lý', cases: 1245, total: 1250, rate: 99.6 },
    { name: 'Xác nhận hồ sơ pháp lý, nguồn gốc đất', cases: 1180, total: 1220, rate: 96.7 },
    { name: 'Lập dự thảo phương án bồi thường, hỗ trợ, tái định cư', cases: 1050, total: 1180, rate: 89.0 },
    { name: 'Niêm yết, công khai dự thảo phương án', cases: 980, total: 1150, rate: 85.2 },
    { name: 'Ban hành quyết định phê duyệt phương án bồi thường', cases: 850, total: 1100, rate: 77.3 },
    { name: 'Công khai phương án', cases: 845, total: 1080, rate: 78.2 },
    { name: 'Chi trả', cases: 720, total: 1050, rate: 68.6 },
    { name: 'Bàn giao mặt bằng', cases: 680, total: 1020, rate: 66.7 },
    { name: 'Số trường hợp đã bố trí tái định cư', cases: 320, total: 450, rate: 71.1 },
  ];

  // Mock Data for Project Chart
  const projectChartData = [
    { name: 'Dự án A', progress: 85, status: 'good' },
    { name: 'Dự án B', progress: 45, status: 'medium' },
    { name: 'Dự án C', progress: 20, status: 'slow' },
    { name: 'Dự án D', progress: 92, status: 'good' },
    { name: 'Dự án E', progress: 60, status: 'medium' },
    { name: 'Dự án F', progress: 15, status: 'slow' },
  ];

  // Mock Data for Issues
  const issues = [
    { id: 1, project: '', content: 'Vướng mắc đơn giá đất bồi thường', unit: 'Sở Tài nguyên & Môi trường', status: 'Đang xử lý', date: '01/03/2026', color: 'text-amber-600 bg-amber-50' },
    { id: 2, project: '', content: 'Chưa phê duyệt khu tái định cư', unit: 'UBND Thành phố', status: 'Chưa xử lý', date: '28/02/2026', color: 'text-red-600 bg-red-50' },
    { id: 3, project: '', content: 'Tranh chấp quyền sử dụng đất', unit: 'UBND Quận/Huyện', status: 'Đang xử lý', date: '02/03/2026', color: 'text-amber-600 bg-amber-50' },
    { id: 4, project: '', content: 'Hoàn tất chi trả bồi thường', unit: 'Ban QLDA', status: 'Đã giải quyết', date: '25/02/2026', color: 'text-emerald-600 bg-emerald-50' },
  ];

  if (loading) return <div className="flex items-center justify-center h-full">Đang tải dữ liệu Dashboard...</div>;

  return (
    <div className="space-y-8 pb-12">
      {/* VÙNG 1: THÔNG TIN TỔNG QUAN DỰ ÁN */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <LayoutDashboard size={20} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Dự án thành phần 2: Bồi thường, hỗ trợ, tái định cư trên địa bàn huyện Bình Chánh</h1>
            </div>
            <p className="text-slate-500 text-sm">Xã Tân Nhựt, xã Bình Chánh và phường Bình Đông</p>
          </div>
        </div>
      </div>

      {/* VÙNG 2: KHU VỰC THỐNG KÊ - HÀNG 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Tài chính dự án"
          icon={DollarSign}
          color="bg-blue-50 text-blue-600"
          progress={65.2}
          items={[
            { label: 'TMĐT', value: '15.230 tỷ' },
            { label: 'Vốn giao 2026', value: '4.855 tỷ' },
            { label: 'Đã giải ngân', value: '3.165 tỷ', isHighlight: true },
          ]}
        />
        <StatCard 
          title="Trường hợp ảnh hưởng"
          icon={Users}
          color="bg-amber-50 text-amber-600"
          progress={54.4}
          items={[
            { label: 'Tổng số trường hợp', value: '1.250' },
            { label: 'Đã thu hồi đất', value: '680', isHighlight: true },
          ]}
        />
        <StatCard 
          title="Tái định cư"
          icon={Building2}
          color="bg-indigo-50 text-indigo-600"
          progress={25.6}
          items={[
            { label: 'Cần bố trí TĐC', value: '1.250' },
            { label: 'Đã bố trí', value: '320', isHighlight: true },
          ]}
        />
        <StatCard 
          title="Diện tích thu hồi"
          icon={Map}
          color="bg-emerald-50 text-emerald-600"
          progress={54.4}
          items={[
            { label: 'Tổng diện tích', value: '450,5 ha' },
            { label: 'Đã thu hồi', value: '245,2 ha', isHighlight: true },
          ]}
        />
      </div>

      {/* VÙNG 2: KHU VỰC THỐNG KÊ - HÀNG 2 */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Khối 1: Bảng tiến độ thực hiện BTGPMB */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Clock size={18} className="text-blue-600" />
                TIẾN ĐỘ THỰC HIỆN BTGPMB
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Cập nhật: 05/03/2026</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-100 bg-slate-50/50">
                    <th className="px-6 py-4">Nội dung công việc</th>
                    <th className="px-6 py-4 text-center">Số trường hợp</th>
                    <th className="px-6 py-4 text-center">Tỷ lệ (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {progressSteps.map((step, idx) => {
                    const isMax = step.cases === Math.max(...progressSteps.map(s => s.cases));
                    return (
                      <tr key={idx} className={cn("hover:bg-slate-50 transition-colors", isMax && "bg-blue-50/30")}>
                        <td className="px-6 py-3 font-medium text-slate-700">{step.name}</td>
                        <td className="px-6 py-3 text-center font-bold text-slate-900">
                          {step.cases.toLocaleString('vi-VN')}/{step.total.toLocaleString('vi-VN')}
                        </td>
                        <td className="px-6 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden hidden sm:block">
                              <div 
                                className="bg-blue-500 h-full" 
                                style={{ width: `${step.rate}%` }}
                              ></div>
                            </div>
                            <span className="font-bold text-blue-600 min-w-[40px]">{step.rate}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Khối 2: Danh sách khó khăn vướng mắc (VÙNG 3) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle size={18} className="text-red-600" />
                KHÓ KHĂN VƯỚNG MẮC
              </h3>
              <button className="text-blue-600 text-xs font-bold hover:underline">XEM TẤT CẢ</button>
            </div>
            <div className="divide-y divide-slate-100">
              {issues.map((issue) => (
                <div key={issue.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-blue-600 uppercase">{issue.project}</span>
                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", issue.color)}>
                      {issue.status}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 mb-1 line-clamp-2">{issue.content}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium mt-auto">
                    <span className="flex items-center gap-1">
                      <Building2 size={10} /> {issue.unit}
                    </span>
                    <span>{issue.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Khối 3: Sơ đồ Gantt trực quan */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp size={18} className="text-blue-600" />
                SƠ ĐỒ TIẾN ĐỘ CHI TIẾT (GANTT CHART)
              </h3>
              <p className="text-xs text-slate-500 mt-1">Biểu đồ tiến độ thực hiện theo từng giai đoạn công việc</p>
            </div>
            <div className="flex items-center gap-3">
              <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                <option>Dự án Đường Vành đai 3 - TP.HCM</option>
                <option>Dự án A</option>
                <option>Dự án B</option>
              </select>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase">
                <Clock size={14} /> Năm 2026
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              {/* Header Months */}
              <div className="grid grid-cols-[250px_repeat(12,1fr)] border-b border-slate-100 pb-4 mb-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Công việc</div>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="text-center text-xs font-bold text-slate-600">Tháng {i + 1}</div>
                ))}
              </div>

              {/* Gantt Rows */}
              <div className="space-y-1">
                {[
                  { name: 'Thông báo thu hồi đất', start: 1, duration: 2 },
                  { name: 'Kiểm đếm', start: 2, duration: 2 },
                  { name: 'Xác minh nguồn gốc đất', start: 3, duration: 2 },
                  { name: 'Lập dự thảo PA bồi thường', start: 4, duration: 2 },
                  { name: 'Niêm yết dự thảo PA bồi thường', start: 5, duration: 2 },
                  { name: 'Ban hành QĐ phê duyệt PA', start: 6, duration: 1 },
                  { name: 'Công khai PA', start: 6, duration: 2 },
                  { name: 'Nhận tiền', start: 7, duration: 2 },
                  { name: 'Bàn giao mặt bằng', start: 8, duration: 1 },
                ].map((task, idx) => (
                  <div key={idx} className="grid grid-cols-[250px_repeat(12,1fr)] items-center group hover:bg-slate-50/50 rounded-lg transition-colors py-3">
                    <div className="text-xs font-medium text-slate-700 pr-4">{task.name}</div>
                    <div className="col-span-12 grid grid-cols-12 h-6 relative">
                      {/* Grid Lines */}
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="border-l border-slate-100 h-full first:border-l-0"></div>
                      ))}
                      
                      {/* Task Bar */}
                      <div 
                        className="absolute h-full bg-slate-900 rounded-sm shadow-sm transition-all duration-500 group-hover:scale-y-110 group-hover:bg-blue-600"
                        style={{ 
                          left: `${((task.start - 1) / 12) * 100}%`, 
                          width: `${(task.duration / 12) * 100}%` 
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[8px] text-white font-bold uppercase">Tháng {task.start} - {task.start + task.duration - 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-2 bg-slate-900 rounded-full"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tiến độ kế hoạch</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Đang thực hiện</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium italic">* Di chuột vào thanh tiến độ để xem chi tiết thời gian</p>
          </div>
        </div>
      </div>
    </div>
  );
}
