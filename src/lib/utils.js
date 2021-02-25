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
