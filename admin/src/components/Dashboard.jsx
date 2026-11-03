import React, { useMemo } from 'react';
import {
  dashboardPageStyles,
  dashboardPageStyles as s,
} from '../assets/dummyStyles.jsx';
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
  const values = useMemo(() => {
    let salaryTotal = payrolls.reduce(
      (sum, record) => sum + record.netSalary || 0,
      0
    );

    if (!payrolls || payrolls.length === 0) {
      salaryTotal = 0;
    }

    return getDashboardValues({
      employeeCount: employees.length,
      salaryTotal,
      announcementCount: announcements.length,
      filter: 'monthly',
    });
  }, [employees, announcements, payrolls]);
  return (
    <main className={s.main}>
      <section className={s.section}>
        <div className={s.header}>
          <div>
            <div className={s.headerLabel}>Admin Dashboard</div>
            <h1 className={s.headerTitle}>Employee Management Overview</h1>
          </div>
        </div>

        {loading ? (
          <div className={s.skeletonGrid}>
            {Array.from({ length: 4 }).map((_, i) => (
              <article key={i} className={s.skeletonCard}>
                <div className={s.skeletonTop}>
                  <div className={s.skeletonIcon}></div>
                  <div className={s.skeletonBadge}></div>
                </div>
                <div className={s.skeletonLine}></div>
                <div className={s.skeletonValue}></div>
                <div className={s.skeletonHelper}></div>
              </article>
            ))}
          </div>
        ) : (
          <div className={s.statsGrid}>
            {dashboardStats.map(({ id, label, helper, icon }, index) => {
              const Icon = statsIcons[icon];

              return (
                <article
                  key={id}
                  className={s.statCard}
                  style={s.getAnimationDelay(index)}
                >
                  <div className={s.statCardTop}>
                    <span className={s.statIcon}>
                      <Icon className={s.statIconSvg} />
                    </span>
                    <span className={s.statBadge}>Total</span>
                  </div>

                  <p className={s.statLabel}>{label}</p>
                  <p className={s.statValue}>
                    {formatStatValue(id, values[id])}
                  </p>
                  <p className={s.statHelper}>{helper}</p>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};
export default Dashboard;
