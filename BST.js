const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }
  buildTree(arr) {
    const data = arr.filter((value, index) => arr.indexOf(value) === index);
    this.root = new Node(data.shift());

    let current = this.root;
    let child = data[0];
    while (data.length > 0) {
      if (current.value > child) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = new Node(data.shift());
          current = this.root;
          child = data[0];
        }
      } else if (current.value < child) {
        if (current.right) {
          current = current.right;
        } else {
          current.right = new Node(data.shift());
          current = this.root;
          child = data[0];
        }
      }
    }
  }
  insert(value) {
    const node = new Node(value);
    let current = this.root;
    let child = value;
    while (true) {
      if (current.value > child) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = node;
          current = this.root;
          break;
        }
      } else if (current.value < child) {
        if (current.right) {
          current = current.right;
        } else {
          current.right = node;
          current = this.root;
          break;
        }
      }
    }
  }
  delete(value) {
    let current = this.root;
    let parent = null;
    while (current != null) {
      console.log(current.value);
      if (current.value === value) {
        console.log("even");
        if (!current.left && !current.right) {
          if (parent === null) {
            this.root = null;
          } else if (parent.left === current) {
            console.log("left leaf");
            parent.left = null;
          } else if (parent.right === current) {
            console.log("right leaf");
            parent.right = null;
          }

          break;
        } else if (!current.left && current.right) {
          console.log("no left");
          if (parent === null) {
            this.root = current.right;
          } else if (parent.left === current) {
            parent.left = current.right;
          } else if (parent.right === current) {
            parent.right = current.right;
          }
          current = current.right;
          break;
        } else if (current.left && !current.right) {
          console.log("no right");
          if (parent === null) {
            this.root = current.left;
          } else if (parent.left === current) {
            parent.left = current.left;
          } else if ((parent.right = current)) {
            parent.right = current.left;
          }
          current = current.left;
          break;
        } else {
          const [parent, minimum] = this.bstMinimum(current.right);
          current.value = minimum.value;
          parent.left = null;

          break;
        }
      }
      parent = current;
      if (current.value > value) {
        current = current.left;
      } else if (current.value < value) {
        current = current.right;
      }
    }
  }

  bstMinimum(node) {
    let parent = null;
    while (node.left != null) {
      parent = node;
      node = node.left;
    }
    return [parent, node];
  }
  find(value, node = this.root) {
    if (node === null) return null;
    if (node.value === value) return node;

    if (value < node.value) return this.find(value, node.left);
    return this.find(value, node.right);
  }
  levelOrder(cb, node = this.root) {
    if (!cb) return;
    if (node === null) return;
    let queue = [node];
    while (queue.length > 0) {
      let currentNode = queue.shift();
      cb(currentNode);

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }
  inOrder(cb, node = this.root) {
    if (node === null) return;
    this.inOrder(cb, node.left);
    cb(node.value);
    this.inOrder(cb, node.right);
  }
  preOrder(cb, node = this.root) {
    if (node === null) return;
    cb(node.value);
    this.preOrder(cb, node.left);
    this.preOrder(cb, node.right);
  }
  postOrder(cb, node = this.root) {
    if (node === null) return;
    this.postOrder(cb, node.left);
    this.postOrder(cb, node.right);
    cb(node.value);
  }
  height(node = this.root) {
    if (node === null) return 0;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node, root = this.root) {
    if (root === null) return -1;
    if (root.value === node) return 0;
    let left = this.depth(node, root.left);
    let right = this.depth(node, root.right);
    if (left === -1 && right === -1) return -1;
    return 1 + Math.max(left, right);
  }
  isBalanced(node = this.root) {
    if (node === null) return true;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }
  rebalance() {
    const nodes = [];
    this.inOrder((value) => nodes.push(value));
    this.root = this.buildBalancedTree(nodes, 0, nodes.length - 1);
  }
  buildBalancedTree(nodes, start, end) {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let node = new Node(nodes[mid]);
    node.left = this.buildBalancedTree(nodes, start, mid - 1);
    node.right = this.buildBalancedTree(nodes, mid + 1, end);
    return node;
  }
}

const tree = new Tree();
tree.buildTree([25, 20, 10, 22, 5, 12, 36, 30, 28, 40, 38, 48]);
tree.insert(49);
tree.insert(50);
// tree.delete(25); // doesnt work for higher level nodes
// console.log(tree.find(40));
// prettyPrint(tree.root);
// tree.levelOrder(console.log);
// tree.postOrder(console.log);
// console.log(tree.depth(25));
// console.log(tree.isBalanced());
// tree.rebalance();
// prettyPrint(tree.root);

function generateRandomArray(cap) {
  const array = [];
  for (let i = 0; i < cap; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  return array;
}
const randomArray = generateRandomArray(10);
const testTree = new Tree();
testTree.buildTree(randomArray);
prettyPrint(testTree.root);
console.log(testTree.isBalanced());
testTree.rebalance();
prettyPrint(testTree.root);
