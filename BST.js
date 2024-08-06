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
    while (true) {
      console.log(current.value);
      if (current.value > value) {
        if (current.left) {
          if (current.left.value === value) {
            if (!current.left.left && !current.left.right) {
              current.left = null;
              break;
            } else if (current.left.left && !current.left.right) {
              current.left = current.left.left;
              break;
            } else if (!current.left.left && current.left.right) {
              current.left = current.left.right;
              break;
            } else if (current.left.left && current.left.right) {
              current.left = current.left.left.right;
              break;
            }
          } else {
            current = current.left;
          }
        }
      }
      if (current.value < value) {
        if (current.right) {
          if (current.right.value === value) {
            if (!current.right.left && !current.right.right) {
              current.right = null;
              break;
            } else if (current.right.left && !current.right.right) {
              current.right = current.right.left;
              break;
            } else if (!current.right.left && current.right.right) {
              current.right = current.right.right;
              break;
            } else if (current.right.left && current.right.right) {
              current.right = current.right.right.left;
              break;
            }
          } else {
            current = current.right;
          }
        }
      }
    }
  }
}

const tree = new Tree();
tree.buildTree([25, 20, 22, 10, 5, 12, 36, 30, 28, 40, 38, 48]);
tree.insert(47);
tree.delete(40);
prettyPrint(tree.root);
