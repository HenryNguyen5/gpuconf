export function getParam(nArr: number[], idx: number) {
  if (nArr.length === 0) {
    return undefined;
  }

  return nArr[idx] != null ? nArr[idx] : nArr[0];
}
