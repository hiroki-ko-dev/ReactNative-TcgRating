export const getDateFormat = (dt: string) => {
  var date: Date = new Date(dt);
  var y = date.getFullYear();
  var M = ("00" + (date.getMonth() + 1)).slice(-2);
  var d = ("00" + date.getDate()).slice(-2);
  var H = ("00" + date.getHours()).slice(-2);
  var m = ("00" + date.getMinutes()).slice(-2);
  var result = y + "/" + M + "/" + d + ' ' + H + ':' + m;
  return result;
}

export const utcConvertToJST = (date: Date) => {
  const offset = 9 * 60; // JST is UTC+9 hours
  const utc = date.getTime();
  const convertedDate = new Date(utc + (3600000 * offset));
  return convertedDate;
}