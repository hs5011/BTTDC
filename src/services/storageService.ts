import { Project, DashboardStats, Issue } from '../types';

const PROJECTS_KEY = 'bt_projects';
const ISSUES_KEY = 'bt_issues';

const initialProjects: Project[] = [
  {
    id: 1,
    code: "DA-001",
    name: "Dự án Mở rộng đường Nguyễn Huệ",
    investor_id: 1,
    investor_name: "Ban Quản lý Dự án Đầu tư Xây dựng A",
    is_priority: 1,
    legal_status: "Đã duyệt phương án BTHTTĐC",
    total_investment: 500000000000,
    total_compensation_capital: 200000000000,
    start_date: "2025-01-01",
    end_date: "2027-12-31",
    handover_deadline: "2026-12-31",
    locations: "Phường Bến Nghé, Phường Đa Kao"
  },
  {
    id: 2,
    code: "DA-002",
    name: "Dự án Xây dựng Cầu Thủ Thiêm 4",
    investor_id: 2,
    investor_name: "Ban Quản lý Dự án Đầu tư Xây dựng B",
    is_priority: 1,
    legal_status: "Đã duyệt dự án đầu tư",
    total_investment: 1200000000000,
    total_compensation_capital: 450000000000,
    start_date: "2025-06-01",
    end_date: "2028-06-30",
    handover_deadline: "2027-06-30",
    locations: "Phường Tân Định"
  },
  {
    id: 3,
    code: "DA-003",
    name: "Dự án Công viên Cây xanh Khu vực 3",
    investor_id: 3,
    investor_name: "Sở Giao thông Vận tải",
    is_priority: 0,
    legal_status: "Có chủ trương đầu tư",
    total_investment: 150000000000,
    total_compensation_capital: 80000000000,
    start_date: "2026-01-01",
    end_date: "2026-12-31",
    handover_deadline: "2026-09-15",
    locations: "Phường Phạm Ngũ Lão"
  },
  {
    id: 4,
    code: "DA-004",
    name: "Dự án Nâng cấp hệ thống thoát nước Quận 1",
    investor_id: 1,
    investor_name: "Ban Quản lý Dự án Đầu tư Xây dựng A",
    is_priority: 1,
    legal_status: "Đã duyệt dự án đầu tư",
    total_investment: 800000000000,
    total_compensation_capital: 350000000000,
    start_date: "2025-03-01",
    end_date: "2027-03-01",
    handover_deadline: "2026-11-20",
    locations: "Phường Bến Nghé"
  },
  {
    id: 5,
    code: "DA-005",
    name: "Dự án Chỉnh trang đô thị rạch Xuyên Tâm",
    investor_id: 4,
    investor_name: "Sở Xây dựng",
    is_priority: 0,
    legal_status: "Có chủ trương đầu tư",
    total_investment: 1500000000000,
    total_compensation_capital: 420000000000,
    start_date: "2025-01-01",
    end_date: "2029-12-31",
    handover_deadline: "2028-12-31",
    locations: "Phường Đa Kao"
  }
];

const initialIssues: Issue[] = [
  {
    id: 1,
    project_id: 1,
    project_name: "Dự án Mở rộng đường Nguyễn Huệ",
    type: 'Pháp lý',
    description: 'Vướng mắc về nguồn gốc đất tại hộ ông A',
    severity: 'High',
    assigned_unit: 'Phòng TN&MT',
    deadline: '2026-04-15',
    status: 'Processing',
    result: '',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    project_id: 2,
    project_name: "Dự án Xây dựng Cầu Thủ Thiêm 4",
    type: 'Giá đất',
    description: 'Người dân chưa đồng ý với đơn giá bồi thường',
    severity: 'High',
    assigned_unit: 'Ban Bồi thường',
    deadline: '2026-05-20',
    status: 'Pending',
    result: '',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    project_id: 3,
    project_name: "Dự án Công viên Cây xanh Khu vực 3",
    type: 'Tái định cư',
    description: 'Thiếu quỹ nhà tái định cư tại chỗ',
    severity: 'Medium',
    assigned_unit: 'UBND Quận',
    deadline: '2026-06-10',
    status: 'Processing',
    result: '',
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    project_id: 4,
    project_name: "Dự án Nâng cấp hệ thống thoát nước Quận 1",
    type: 'Phối hợp',
    description: 'Chậm trễ trong việc di dời hạ tầng kỹ thuật',
    severity: 'Medium',
    assigned_unit: 'Điện lực',
    deadline: '2026-04-30',
    status: 'Pending',
    result: '',
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    project_id: 5,
    project_name: "Dự án Chỉnh trang đô thị rạch Xuyên Tâm",
    type: 'Pháp lý',
    description: 'Tranh chấp ranh giới đất giữa các hộ dân',
    severity: 'Low',
    assigned_unit: 'Phường Bến Nghé',
    deadline: '2026-05-05',
    status: 'Processing',
    result: '',
    created_at: new Date().toISOString()
  }
];

export const storageService = {
  init: () => {
    if (!localStorage.getItem(PROJECTS_KEY)) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(initialProjects));
    }
    if (!localStorage.getItem(ISSUES_KEY)) {
      localStorage.setItem(ISSUES_KEY, JSON.stringify(initialIssues));
    }
  },

  getProjects: (): Project[] => {
    const data = localStorage.getItem(PROJECTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  getProjectById: (id: number): Project | undefined => {
    const projects = storageService.getProjects();
    return projects.find(p => p.id === id);
  },

  getIssues: (): Issue[] => {
    const data = localStorage.getItem(ISSUES_KEY);
    return data ? JSON.parse(data) : [];
  },

  getDashboardStats: (): DashboardStats => {
    const projects = storageService.getProjects();
    const issues = storageService.getIssues();
    
    const priorityProjects = projects.filter(p => p.is_priority === 1).length;
    const activeIssues = issues.filter(i => i.status !== 'Resolved').length;
    
    const totalCapitalPlan = projects.reduce((acc, p) => acc + (p.total_investment * 0.2), 0);
    const totalCapitalActual = projects.reduce((acc, p) => acc + (p.total_investment * 0.05), 0);
    
    const compensationCapital = projects.reduce((acc, p) => acc + p.total_compensation_capital, 0);
    const compensationDisbursement = projects.reduce((acc, p) => acc + (p.total_compensation_capital * 0.3), 0);

    const today = new Date().toISOString().split('T')[0];
    const delayedProjects = projects.filter(p => p.handover_deadline < today).length;

    return {
      totalProjects: projects.length,
      priorityProjects,
      totalCapitalPlan,
      totalCapitalActual,
      totalLandArea: 10000,
      totalLandRecovered: 4500,
      activeIssues,
      overallDisbursementRate: (totalCapitalActual / totalCapitalPlan) * 100,
      compensationCapital,
      compensationDisbursement,
      delayedProjects,
      // New mock stats
      notApprovedProjects: 2,
      appraisingDossiers: 5,
      completedDirectives: 12,
      pendingDirectives: 8,
      totalAffectedHouseholds: 450,
      inventoriedHouseholds: 380,
      confirmedLandOriginHouseholds: 320,
      resettlementHouseholds: 45,
      draftPlanHouseholds: 280,
      totalPayableHouseholds: 250,
      paidHouseholds: 180,
      handedOverHouseholds: 120
    };
  },

  getWardData: () => {
    return [
      { name: 'Phường Bến Nghé', affected: 120, inventoried: 110, confirmed: 100, draft: 90, paid: 80, handedOver: 70, budget: 50000000000, disbursed: 40000000000 },
      { name: 'Phường Đa Kao', affected: 150, inventoried: 130, confirmed: 110, draft: 100, paid: 60, handedOver: 30, budget: 80000000000, disbursed: 30000000000 },
      { name: 'Phường Tân Định', affected: 80, inventoried: 75, confirmed: 60, draft: 50, paid: 30, handedOver: 15, budget: 30000000000, disbursed: 10000000000 },
      { name: 'Phường Phạm Ngũ Lão', affected: 100, inventoried: 65, confirmed: 50, draft: 40, paid: 10, handedOver: 5, budget: 40000000000, disbursed: 5000000000 },
    ];
  }
};
