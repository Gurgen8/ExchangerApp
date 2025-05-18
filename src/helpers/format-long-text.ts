export const formatLongText = (text: string, rowLength: number) => {
  if (text?.length > rowLength) {
    return text.substring(0, rowLength) + '...';
  } else {
    return text;
  }
};
