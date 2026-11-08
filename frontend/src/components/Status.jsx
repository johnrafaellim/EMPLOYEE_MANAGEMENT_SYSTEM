import { statusStyles as s } from "../assets/dummyStyles.jsx";

const Status = ({ s: status }) => {
  return <span className={s.getStatusClass(status)}>{status}</span>;
};

export default Status;
