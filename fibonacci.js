function fibonacci(n) {
  if (n === 0) {
    return [0];
  }

  if (n === 1) {
    return [0, 1];
  }
  let sequence = fibonacci(n - 1);
  sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
  return sequence;
}

function fibonacci2(n) {
  const sequence = [];
  let first = 0;
  let second = 1;
  let third;
  for (let i = 0; i < n; i++) {
    sequence.push(first);
    third = first + second;
    first = second;
    second = third;
  }
  return sequence;
}

console.log(fibonacci2(8));
