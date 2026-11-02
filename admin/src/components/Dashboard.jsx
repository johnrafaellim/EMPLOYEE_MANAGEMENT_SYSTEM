import React from 'react';
import { dashboardPageStyles as s } from '../assets/dummyStyles.jsx';
import { dashboardStats, getDashboardValues } from '../data/dashboardData.js';
import { UsersRound, Banknote, BellRing } from 'lucide-react';

const statsIcons = {
  employees: UsersRound,
  salary: Banknote,
  announcements: BellRing,
};

const formatStatValue = (id, value) => {
  if (id === 'salary') {
    return `$ ${Math.round(value)}`;
  }

  return Math.round(value).toLocaleString('en-US');
};

const Dashboard = ({
  employees = [],
  announcements = [],
  payrolls = [],
  loading = false,
}) => {
  return (
    <main className={s.main}>
      <section className={s.section}>
        <div className={s.header}>
          <div>
            <div className={s.headerLabel}>Admin Dashboard</div>
            <h1 className={s.headerTitle}>Employee Management Overview</h1>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Dashboard;
