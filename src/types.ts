export interface Project {
  id: number;
  code: string;
  name: string;
  investor_id: number;
  investor_name: string;
  is_priority: number;
  legal_status: string;
  total_investment: number;
  total_compensation_capital: number;
  start_date: string;
  end_date: string;
  handover_deadline: string;
  locations?: string;
}

export interface DashboardStats {
  totalProjects: number;
  priorityProjects: number;
  totalCapitalPlan: number;
  totalCapitalActual: number;
  totalLandArea: number;
  totalLandRecovered: number;
  activeIssues: number;
  overallDisbursementRate: number;
  compensationCapital: number;
  compensationDisbursement: number;
  delayedProjects: number;
  // New stats for reports
  notApprovedProjects: number;
  appraisingDossiers: number;
  completedDirectives: number;
  pendingDirectives: number;
  totalAffectedHouseholds: number;
  inventoriedHouseholds: number;
  confirmedLandOriginHouseholds: number;
  resettlementHouseholds: number;
  draftPlanHouseholds: number;
  totalPayableHouseholds: number;
  paidHouseholds: number;
  handedOverHouseholds: number;
}

export interface ProgressStep {
  id: number;
  project_id: number;
  step_name: string;
  actual_value: number;
  plan_value: number;
  start_date: string;
  end_date: string;
}

export interface Issue {
  id: number;
  project_id: number;
  project_name?: string;
  type: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  assigned_unit: string;
  deadline: string;
  status: 'Pending' | 'Processing' | 'Resolved';
  result: string;
  created_at: string;
}
