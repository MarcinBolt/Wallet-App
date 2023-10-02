const formatDate = date => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear() % 100;
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const formattedDate = formattedDate = (day < 10 ? '0' : '') + day + '.' + (month < 10 ? '0' : '') + month + '.' + (year < 10 ? '0' : '') + year;
  return formattedDate;
};

export default formatDate;
