export const formatDateToString = (date) => {
  if (!date) return '';

  return new Date(date).toLocaleDateString().split('T')[0];
};
