export function getParam(nArr: number[], idx: number) {
  if (nArr.length === 0) {
    throw Error("Empty array invalid");
  }

  return nArr[idx] != null ? nArr[idx] : nArr[0];
}
