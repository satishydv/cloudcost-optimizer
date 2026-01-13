
import { DailyTotal } from '../types';

export const calculateForecast = (dailyData: DailyTotal[]) => {
    if (dailyData.length === 0) return { mtd: 0, forecast: 0, avgDaily: 0 };

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Get days in current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const dayOfMonth = now.getDate();

    // Filter data for the current month
    const currentMonthPrefix = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
    const mtdData = dailyData.filter(d => d.date.startsWith(currentMonthPrefix));

    const mtdSpend = mtdData.reduce((sum, d) => sum + d.totalCost, 0);

    // Use last 7 days or MTD for average, whichever is more representative
    // For this MVP, we'll use the last 7 days of data for velocity
    const historicalData = dailyData.slice(-7);
    const avgDaily = historicalData.reduce((sum, d) => sum + d.totalCost, 0) / historicalData.length;

    const remainingDays = daysInMonth - dayOfMonth;
    const projectSpend = mtdSpend + (avgDaily * remainingDays);

    return {
        mtd: mtdSpend,
        forecast: projectSpend,
        avgDaily: avgDaily,
        daysRemaining: remainingDays
    };
};
