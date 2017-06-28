export function dateToString(date, format = 'yyyy-mm-dd') {

  // var today = new Date();
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  let today = dd + '/' + mm + '/' + yyyy;
  switch (format) {
    case 'yyyy-mm-dd':
      today = `${yyyy}-${mm}-${dd}`;
      break;
    case 'yyyy-MM-dd':
      today = `${yyyy}-${mm}-${dd}`;
      break;
    default:

  }
  return today;
}
