
import { generateMockCosts, calculateDailyTotals, detectAnomalies } from './mockData';
import { CloudCost, DailyTotal, Alert, KpiData } from '../types';

// In-memory data store for the mock "backend"
const ALL_COSTS = generateMockCosts(90);
const DAILY_TOTALS = calculateDailyTotals(ALL_COSTS);
const ALL_ALERTS = detectAnomalies(DAILY_TOTALS);

export const api = {
  getDailyCosts: async (): Promise<DailyTotal[]> => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 400));
    return DAILY_TOTALS;
  },

  getMonthlyCosts: async (): Promise<{ month: string, cost: number }[]> => {
    await new Promise(r => setTimeout(r, 400));
    const monthly = DAILY_TOTALS.reduce((acc, curr) => {
      const month = curr.date.substring(0, 7);
      acc[month] = (acc[month] || 0) + curr.totalCost;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(monthly).map(([month, cost]) => ({ month, cost }));
  },

  getCostsByService: async (): Promise<{ service: string, cost: number }[]> => {
    await new Promise(r => setTimeout(r, 400));
    const byService = ALL_COSTS.reduce((acc, curr) => {
      acc[curr.service] = (acc[curr.service] || 0) + curr.cost;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(byService).map(([service, cost]) => ({ service, cost }));
  },

  getAlerts: async (): Promise<Alert[]> => {
    await new Promise(r => setTimeout(r, 500));
    return ALL_ALERTS;
  },

  getKpis: async (): Promise<KpiData> => {
    await new Promise(r => setTimeout(r, 300));
    const today = DAILY_TOTALS[DAILY_TOTALS.length - 1];
    const currentMonthPrefix = today.date.substring(0, 7);
    
    const monthSpend = DAILY_TOTALS
      .filter(d => d.date.startsWith(currentMonthPrefix))
      .reduce((sum, d) => sum + d.totalCost, 0);

    const prev7Days = DAILY_TOTALS.slice(DAILY_TOTALS.length - 8, DAILY_TOTALS.length - 1);
    const avg7Day = prev7Days.reduce((sum, d) => sum + d.totalCost, 0) / 7;
    const costChangePercent = ((today.totalCost / avg7Day) - 1) * 100;

    const highestCostService = Object.entries(today.services)
      .sort((a, b) => b[1] - a[1])[0][0];

    return {
      todaySpend: today.totalCost,
      monthSpend,
      highestCostService,
      costChangePercent
    };
  }
};
