function binarySearch(arr, number) {
  const half = Math.round(arr.length / 2);

  const left = arr.slice(0, half);
  const right = arr.slice(half);
  if (arr[half] === number) {
    return "Found";
  } else if (arr[half] > number) {
    return binarySearch(left, number);
  } else {
    return binarySearch(right, number);
  }
}
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 7));
