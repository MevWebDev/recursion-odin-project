class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  append(value) {
    const newNode = new Node(value);
    if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
    this.tail = newNode;
    this.size++;
  }
  prepend(value) {
    this.head = new Node(value, this.head);
    this.size++;
  }
  pop() {
    let current = this.head;
    while (current != this.tail) {
      current = current.next;
    }
    current.next = null;
  }
  toString() {
    let current = this.head;
    let string = ``;
    while (current.next != null) {
      string += `(${current.value}) ->  `;
      current = current.next;
    }
    string += `null`;
    return string;
  }
  contains(value) {
    let current = this.head;
    while (current != this.tail) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }
  atIndex(idx) {
    let current = this.head;
    while (idx > 0) {
      current = current.next;
      idx--;
    }
    return current;
  }
  insertAt(value, idx) {
    let current = this.head;
    const newNode = new Node(value);
    while (idx > 1) {
      current = current.next;
      idx--;
    }
    const next = current.next;
    current.next = newNode;
    current.next.next = next;
  }
  removeAt(idx) {
    let current = this.head;
    while (idx > 1) {
      current = current.next;
      idx--;
    }
    current.next = current.next.next;
  }
}
class Node {
  constructor(value, next = "null") {
    this.value = value;
    this.next = next;
  }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());

list.insertAt("franek", 2);
console.log(list.toString());
list.removeAt(2);
console.log(list.toString());
