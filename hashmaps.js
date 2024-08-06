class HashMap {
  constructor() {
    this.capacity = 16;
    this.LOAD_FACTOR = 0.75;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    let size = 0;
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }
  checkLoad() {
    const length = this.length();
    const load = length / this.buckets.length;
    console.log(`Current load is ${load}`);
    if (load >= this.LOAD_FACTOR) {
      this.capacity = this.capacity * 2;
      const entries = this.entries();
      this.buckets = Array.from({ length: this.capacity }, () => []);

      entries.forEach((entry) => {
        this.set(entry[0], entry[1]);
      });
    }
  }
  set(key, value) {
    this.checkLoad();

    const hashedKey = this.hash(key);
    const index = hashedKey % this.capacity;
    const bucket = this.buckets[index];

    const exists = bucket.some((record) => record.key === key);
    if (!exists) {
      bucket.push({ key, value });
    } else {
      const idx = bucket.findIndex((record) => {
        return record.key === key;
      });
      bucket[idx] = { key, value };
    }
  }

  get(key) {
    const hashedKey = this.hash(key);
    const index = hashedKey % this.capacity;
    const bucket = this.buckets[index];
    const found = bucket.find((record) => record.key === key);
    return found ? found.value : null;
  }
  has(key) {
    const hashedKey = this.hash(key);
    const index = hashedKey % this.capacity;
    const bucket = this.buckets[index];
    const found = bucket.find((record) => record.key === key);
    return found ? true : false;
  }
  remove(key) {
    const hashedKey = this.hash(key);
    const index = hashedKey % this.capacity;
    const bucket = this.buckets[index];
    this.buckets[index] = bucket.filter((record) => {
      return record.key != key;
    });
  }
  keys() {
    const allKeys = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((key) => {
        allKeys.push(key.key);
      });
    });
    return allKeys;
  }
  values() {
    const allValues = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((key) => {
        allValues.push(key.value);
      });
    });
    return allValues;
  }
  entries() {
    const allEntries = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((key) => {
        allEntries.push([key.key, key.value]);
      });
    });
    return allEntries;
  }
  length() {
    const keys = this.keys();
    return keys.length;
  }
  clear() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("lion", "silver");
test.set("moon", "silver");

console.log(test);
