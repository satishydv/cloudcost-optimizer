
import { CloudCost, DailyTotal, Alert } from '../types';

const SERVICES = ['EC2', 'S3', 'RDS', 'Lambda', 'CloudFront', 'DynamoDB'] as const;

export const generateMockCosts = (days: number = 90): CloudCost[] => {
  const costs: CloudCost[] = [];
  const now = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    SERVICES.forEach((service) => {
      // Base cost with some randomness
      let base = 50;
      if (service === 'EC2') base = 250;
      if (service === 'RDS') base = 150;
      if (service === 'S3') base = 80;

      // Add a spike logic for specific dates to simulate anomalies
      const isAnomalyDay = i === 1 || i === 15 || i === 45;
      const multiplier = isAnomalyDay && service === 'EC2' ? 3.5 : (0.8 + Math.random() * 0.4);
      
      costs.push({
        id: `${dateStr}-${service}`,
        date: dateStr,
        service,
        cost: base * multiplier,
      });
    });
  }

  return costs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const calculateDailyTotals = (costs: CloudCost[]): DailyTotal[] => {
  const grouped = costs.reduce((acc, curr) => {
    if (!acc[curr.date]) {
      acc[curr.date] = { date: curr.date, totalCost: 0, services: {} };
    }
    acc[curr.date].totalCost += curr.cost;
    acc[curr.date].services[curr.service] = (acc[curr.date].services[curr.service] || 0) + curr.cost;
    return acc;
  }, {} as Record<string, DailyTotal>);

  return Object.values(grouped).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const detectAnomalies = (dailyTotals: DailyTotal[]): Alert[] => {
  const alerts: Alert[] = [];
  const THRESHOLD = 1.25; // 25%
  const MIN_COST = 500;

  for (let i = 7; i < dailyTotals.length; i++) {
    const today = dailyTotals[i];
    const prev7Days = dailyTotals.slice(i - 7, i);
    const avg7Day = prev7Days.reduce((sum, d) => sum + d.totalCost, 0) / 7;

    if (today.totalCost > (avg7Day * THRESHOLD) && today.totalCost > MIN_COST) {
      // Find the specific service that contributed most to the spike
      const sortedServices = Object.entries(today.services).sort((a, b) => b[1] - a[1]);
      const topService = sortedServices[0][0];

      alerts.push({
        id: `alert-${today.date}`,
        date: today.date,
        service: topService,
        reason: `Spending spike: $${today.totalCost.toFixed(2)} is ${( (today.totalCost / avg7Day - 1) * 100 ).toFixed(1)}% above 7-day average.`,
        severity: today.totalCost > 1000 ? 'high' : 'medium',
        status: 'active',
      });
    }
  }

  return alerts.reverse(); // Newest first
};
