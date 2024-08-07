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
}

const tree = new Tree();
tree.buildTree([25, 20, 10, 22, 5, 12, 36, 30, 28, 40, 38, 48]);
// tree.insert(9);
tree.delete(25); // doesnt work for higher level nodes

prettyPrint(tree.root);
