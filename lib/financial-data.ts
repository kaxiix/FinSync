// Consistent financial data across the app
export const financialData = {
  // Monthly data for 2023
  monthlyData: [
    { name: "Jan", income: 4500, expenses: 3200, savings: 1300 },
    { name: "Feb", income: 4500, expenses: 3400, savings: 1100 },
    { name: "Mar", income: 4700, expenses: 3300, savings: 1400 },
    { name: "Apr", income: 4800, expenses: 3500, savings: 1300 },
    { name: "May", income: 5000, expenses: 3600, savings: 1400 },
    { name: "Jun", income: 5200, expenses: 3700, savings: 1500 },
    { name: "Jul", income: 5200, expenses: 3800, savings: 1400 },
    { name: "Aug", income: 5300, expenses: 3900, savings: 1400 },
    { name: "Sep", income: 5300, expenses: 3700, savings: 1600 },
    { name: "Oct", income: 5400, expenses: 3800, savings: 1600 },
    { name: "Nov", income: 5500, expenses: 4000, savings: 1500 },
    { name: "Dec", income: 5600, expenses: 4200, savings: 1400 },
  ],

  // Weekly data
  weeklyData: [
    { name: "Mon", income: 0, expenses: 120, savings: 0 },
    { name: "Tue", income: 0, expenses: 85, savings: 0 },
    { name: "Wed", income: 0, expenses: 140, savings: 0 },
    { name: "Thu", income: 0, expenses: 95, savings: 0 },
    { name: "Fri", income: 2500, expenses: 210, savings: 2290 },
    { name: "Sat", income: 0, expenses: 180, savings: 0 },
    { name: "Sun", income: 0, expenses: 75, savings: 0 },
  ],

  // Yearly data
  yearlyData: [
    { name: "2018", income: 48000, expenses: 36000, savings: 12000 },
    { name: "2019", income: 52000, expenses: 38000, savings: 14000 },
    { name: "2020", income: 50000, expenses: 37000, savings: 13000 },
    { name: "2021", income: 55000, expenses: 40000, savings: 15000 },
    { name: "2022", income: 58000, expenses: 42000, savings: 16000 },
    { name: "2023", income: 62000, expenses: 44000, savings: 18000 },
  ],

  // Spending categories
  categoryData: [
    { name: "Housing", value: 1500 },
    { name: "Food", value: 800 },
    { name: "Transport", value: 400 },
    { name: "Entertainment", value: 300 },
    { name: "Utilities", value: 350 },
    { name: "Other", value: 250 },
  ],

  // Recent transactions
  recentTransactions: [
    {
      id: "t1",
      description: "Grocery Shopping",
      amount: -120.5,
      date: "2023-12-01",
      category: "Food",
      merchant: "Whole Foods",
    },
    {
      id: "t2",
      description: "Monthly Rent",
      amount: -1500,
      date: "2023-12-01",
      category: "Housing",
      merchant: "Property Management",
    },
    {
      id: "t3",
      description: "Salary Deposit",
      amount: 5500,
      date: "2023-11-30",
      category: "Income",
      merchant: "Employer Inc.",
    },
    {
      id: "t4",
      description: "Electric Bill",
      amount: -85.2,
      date: "2023-11-28",
      category: "Utilities",
      merchant: "Power Company",
    },
    {
      id: "t5",
      description: "Streaming Service",
      amount: -14.99,
      date: "2023-11-27",
      category: "Entertainment",
      merchant: "Netflix",
    },
  ],

  // Savings goals
  savingsGoals: [
    {
      id: "g1",
      name: "Emergency Fund",
      target: 10000,
      current: 6500,
      deadline: "2024-06-30",
    },
    {
      id: "g2",
      name: "Vacation",
      target: 3000,
      current: 1200,
      deadline: "2024-07-15",
    },
    {
      id: "g3",
      name: "New Car",
      target: 25000,
      current: 5000,
      deadline: "2025-01-01",
    },
  ],

  // Streak data
  streakData: {
    currentStreak: 5,
    longestStreak: 12,
    totalCompletedDays: 23,
    streakGoal: 30,
    streakStartDate: "2023-11-01",
    activeStreakDays: [
      "2023-11-25",
      "2023-11-26",
      "2023-11-27",
      "2023-11-28",
      "2023-11-29",
      "2023-11-30",
      "2023-12-01",
      "2023-12-02",
      "2023-12-03",
      "2023-12-04",
      "2023-12-05",
      "2023-12-06",
      "2023-12-07",
      "2023-12-08",
      "2023-12-09",
      "2023-12-10",
      "2023-12-11",
      "2023-12-12",
      "2023-12-13",
      "2023-12-14",
      "2023-12-15",
      "2023-12-16",
      "2023-12-17",
    ],
    missedDays: ["2023-11-20", "2023-11-21", "2023-11-22", "2023-11-23", "2023-11-24"],
    achievements: [
      { id: 1, name: "First Week", description: "Complete a 7-day streak", achieved: true, date: "2023-11-07" },
      { id: 2, name: "Two Weeks Strong", description: "Complete a 14-day streak", achieved: true, date: "2023-11-14" },
      { id: 3, name: "Month Master", description: "Complete a 30-day streak", achieved: false },
    ],
  },
}
