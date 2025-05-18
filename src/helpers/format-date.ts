export const formatDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getUTCMonth()).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
