export function max(arr, cb) {
  let max = cb(arr[0] || 0);
  arr.forEach(item => {
    const local = cb(item);
    if (max < local) {
      max = local;
    }
  });
  return max;
}
export function nomaliseSizes(sizes) {
  const gap = new Array(4).fill({ size: 0 });

  const _sizes = [];
  const files = sizes.reduce((agg, item) => {
    const _files = item.files.filter(f => f.size);
    _sizes.push({ timestamp: item.timestamp, files: _files });
    return agg.concat(..._files, gap);
  }, []);
  const maxSize = max(files, file => file.size);
  return { files, gap: gap.length, max: maxSize, sizes: _sizes };
}
export function sumTilIndex(arr, index) {
  let sum = 0;
  for (let i = 0; i <= index; i++) {
    sum = sum + arr[i].files.length;
  }
  return sum;
}
export function datetoString(d) {
  const _d = new Date();
  _d.setTime(d.timestamp);
  return _d.toLocaleString();
}
