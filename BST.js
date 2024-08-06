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
    this.root = this._deleteNode(this.root, value);
  }

  _deleteNode(root, value) {
    if (root === null) {
      return root;
    }

    if (value < root.value) {
      root.left = this._deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = this._deleteNode(root.right, value);
    } else {
      // Node to be deleted found

      // Node with only one child or no child
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      // Node with two children: Get the inorder successor (smallest in the right subtree)
      root.value = this._minValue(root.right);

      // Delete the inorder successor
      root.right = this._deleteNode(root.right, root.value);
    }

    return root;
  }

  _minValue(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current.value;
  }
}

const tree = new Tree();
tree.buildTree([25, 20, 22, 10, 5, 12, 36, 30, 28, 40, 38, 48]);
tree.insert(47);
tree.delete(40); // doesnt work for higher level nodes
console.log(tree.root.right.right.right);
prettyPrint(tree.root);
