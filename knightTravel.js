function generateChessBoard() {
  const list = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      row[j] = [i, j];
    }
    list.push(row);
  }
  return list;
}

const list = generateChessBoard();
// console.log(list);
function generateAdjacencyMatrix(list) {
  const matrix = {};
  list.forEach((row, i) => {
    row.forEach((square, j) => {
      const moves = [];

      if (
        square[0] + 1 >= 0 &&
        square[1] + 2 >= 0 &&
        square[0] + 1 < 8 &&
        square[1] + 2 < 8
      ) {
        moves.push([square[0] + 1, square[1] + 2]);
      }
      matrix[`${i},${j}`] = moves;
      if (
        square[0] + 2 >= 0 &&
        square[1] + 1 >= 0 &&
        square[0] + 2 < 8 &&
        square[1] + 1 < 8
      ) {
        moves.push([square[0] + 2, square[1] + 1]);
      }
      matrix[`${i},${j}`] = moves;
      if (
        square[0] + 2 >= 0 &&
        square[1] - 1 >= 0 &&
        square[0] + 2 < 8 &&
        square[1] - 1 < 8
      ) {
        moves.push([square[0] + 2, square[1] - 1]);
      }
      matrix[`${i},${j}`] = moves;
      if (
        square[0] + 1 >= 0 &&
        square[1] - 2 >= 0 &&
        square[0] + 1 < 8 &&
        square[1] - 2 < 8
      ) {
        moves.push([square[0] + 1, square[1] - 2]);
      }
      matrix[`${i},${j}`] = moves;
      if (
        square[0] - 1 >= 0 &&
        square[1] + 2 >= 0 &&
        square[0] - 1 < 8 &&
        square[1] + 2 < 8
      ) {
        moves.push([square[0] - 1, square[1] + 2]);
      }
      matrix[`${i},${j}`] = moves;
      if (
        square[0] - 2 >= 0 &&
        square[1] + 1 >= 0 &&
        square[0] - 2 < 8 &&
        square[1] + 1 < 8
      ) {
        moves.push([square[0] - 2, square[1] + 1]);
      }
      matrix[`${i},${j}`] = moves;
      if (
        square[0] - 2 >= 0 &&
        square[1] - 1 >= 0 &&
        square[0] - 2 < 8 &&
        square[1] - 1 < 8
      ) {
        moves.push([square[0] - 2, square[1] - 1]);
      }
      matrix[`${i},${j}`] = moves;
      if (
        square[0] - 1 >= 0 &&
        square[1] - 2 >= 0 &&
        square[0] - 1 < 8 &&
        square[1] - 2 < 8
      ) {
        moves.push([square[0] - 1, square[1] - 2]);
      }
      matrix[`${i},${j}`] = moves;
    });
  });
  return matrix;
}
const matrix = generateAdjacencyMatrix(list);
// console.log(matrix);

function generateAdjacencyList(list, matrix) {
  const adjList = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const connections = [];
      for (let k = 0; k < matrix[i][j].length; k += 2) {
        adjList.push([i, j], [matrix[k], matrix[k + 1]]);
      }
    }
  }
  return adjList;
}

function bfs(start, end, adjMatrix) {
  const queue = [[start]];
  const visited = new Set();

  while (queue.length > 0) {
    const path = queue.shift(); // Get the path to the front square
    const square = path[path.length - 1]; // Get the last square in the path

    if (square.toString() === end.toString()) {
      return [
        `You made it in ${path.length} moves! Here's you're path: `,
        path,
      ]; // Return the path if the end square is reached
    }

    if (!visited.has(square.toString())) {
      visited.add(square.toString()); // Mark the square as visited

      // Add all unvisited neighbors to the queue
      const neighbors = adjMatrix[square];
      for (const neighbor of neighbors) {
        const newPath = [...path, neighbor];
        queue.push(newPath);
      }
    }
  }

  return null; // Return null if no path is found
}

const start = [0, 0];
const end = [3, 3];
const shortestPath = bfs(start, end, matrix);
console.log(shortestPath);
