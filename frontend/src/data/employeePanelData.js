export const employee = 'John Doe';

export const today = () => new Date().toLocaleDateString('en-PH');

export const displayDate = (value) => {
  if (!value) return '';
  const [year, month, day] = value.split('-');
  if (year && month && day) return `${day}-${month}-${year}`;
  return value;
};

export const dates = (from, to) => {
  const allDates = [];
  const date = new Date(from);

  while (date < new Date(to)) {
    allDates.push(date.toLocaleDateString('en-PH'));
    date.setDate(date.getDate() + 1);
  }

  return allDates;
};

export const money = (value) => `PHP ${value.toLocaleString('en-PH')}`;
