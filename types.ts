
export interface CloudCost {
  id: string;
  date: string;
  service: 'EC2' | 'S3' | 'RDS' | 'Lambda' | 'CloudFront' | 'DynamoDB';
  cost: number;
}

export interface DailyTotal {
  date: string;
  totalCost: number;
  services: Record<string, number>;
}

export interface Alert {
  id: string;
  date: string;
  service: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'resolved';
}

export interface KpiData {
  todaySpend: number;
  monthSpend: number;
  highestCostService: string;
  costChangePercent: number;
}
