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

// This one is a copy/paste from stackoverflow 🤫
export function toHHMMSS(secs) {
  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map(v => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
}

//!\ The input array must already be sorted by getComparator() for this function to work
// There are only two hard things in Computer Science: cache invalidation and --> naming things.
export function groupSortedArrayIntoArraysBy(
  sortedArr,
  getComparator = v => v
) {
  let value = null;
  return sortedArr.reduce((acc, curr) => {
    const currValue = getComparator(curr);
    if (currValue !== value) {
      acc.push([]);
    }
    value = currValue;
    acc[acc.length - 1].push(curr);
    return acc;
  }, []);
}
