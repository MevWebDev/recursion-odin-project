function mergesort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const half = Math.ceil(arr.length / 2);
  const firstHalf = arr.slice(0, half);
  const secondHalf = arr.slice(half);
  return merge(mergesort(firstHalf), mergesort(secondHalf));
}

function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  return [...result, ...left, ...right];
}
console.log(mergesort([3, 2, 1, 13, 8, 5, 0, 1]));
