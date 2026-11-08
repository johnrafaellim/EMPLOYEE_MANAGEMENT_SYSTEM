import { useOutletContext } from 'react-router-dom';
import { leavePageStyles as s } from '../assets/dummyStyles.jsx';
import { displayDate } from '../data/employeePanelData.js';
import Status from '../components/Status.jsx';

const Leave = () => {
  const { records } = useOutletContext();

  const rows = records.filter((record) => record.type === 'Leave');

  return (
    <div className={s.container}>
      <div className={s.innerWrapper}>
        <div className={s.header}>
          <span>Employee</span>
          <span>From</span>
          <span>To</span>
          <span>Reason</span>
          <span className={s.headerAction}>Action</span>
        </div>

        {rows.map((record, index) => (
          <div key={index} className={s.row}>
            <div className={s.employeeColumn}>
              <b className={s.employeeName}>{record.name}</b>
              <span className={s.employeeId}>{record.empId || '-'}</span>
            </div>

            <span>{displayDate(record.from)}</span>
            <span>{displayDate(record.to)}</span>
            <span className={s.reason}>{record.reason}</span>
            <Status s={record.status} />
          </div>
        ))}

        {!rows.length && (
          <div className={s.emptyState}>No leave data found</div>
        )}
      </div>
    </div>
  );
};

export default Leave;
