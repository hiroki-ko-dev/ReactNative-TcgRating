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
  const offset = -9 * 60;
  const localOffset = date.getTimezoneOffset() * 60000;
  const utc = date.getTime() + localOffset;
  return new Date(utc + (3600000 * offset));
}