// Check a part of an array and make sure every values are not undefined
export function partOfArrayNotUndefined(arr, start, end) {
  if (!arr.length) {
    return false;
  }
  for (let i = start; i < end; i++) {
    if (typeof arr[i] === "undefined") {
      return false;
    }
  }
  return true;
}

export var toHHMMSS = secs => {
  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map(v => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};
