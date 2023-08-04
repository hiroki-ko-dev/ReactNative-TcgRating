export const getDateFormat = (dt) => {;
    var dt = new Date(dt);
    var y = dt.getFullYear();
    var M = ("00" + (dt.getMonth() + 1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    var H = ("00" + dt.getHours()).slice(-2);
    var m = ("00" + dt.getMinutes()).slice(-2);
    var result = y + "/" + M + "/" + d + ' ' + H + ':' + m;
    return result;
}