export default class ObjectUtils {
  constructor(obj = {}) {
    this.obj = obj; // The object that all methods will operate on
  }

  // Adds a new key-value pair to the object
  add(key, value) {
    this.obj[key] = value;
    return this;
  }

  // Removes a key from the object
  remove(...keys) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      delete this.obj[key];
    }
    return this;
  }

  // Merges the current object with another object
  mergeObjects(newObj) {
    this.obj = { ...this.obj, ...newObj };
    return this;
  }

  // Checks if the object has a key
  has(key) {
    return Object.prototype.hasOwnProperty.call(this.obj, key);
  }

  // Gets the value of a key in the object
  get(key) {
    return this.obj[key];
  }

  // Clones the current object
  clone() {
    return JSON.parse(JSON.stringify(this.obj));
  }

  // Gets all keys of the object
  keys() {
    return Object.keys(this.obj);
  }

  // Gets all values of the object
  values() {
    return Object.values(this.obj);
  }

  // Gets all entries of the object
  entries() {
    return Object.entries(this.obj);
  }

  // Freezes the object
  freeze() {
    Object.freeze(this.obj);
    return this;
  }

  // Seals the object
  seal() {
    Object.seal(this.obj);
    return this;
  }

  // Checks if the object is frozen
  isFrozen() {
    return Object.isFrozen(this.obj);
  }

  // Checks if the object is sealed
  isSealed() {
    return Object.isSealed(this.obj);
  }

  // Converts the object to a map
  objectToMap() {
    return new Map(Object.entries(this.obj));
  }

  // Converts the object to a JSON string
  toJSONString() {
    return JSON.stringify(this.obj);
  }

  // Checks if the object is empty
  isEmpty() {
    return Object.keys(this.obj).length === 0;
  }

  // Gets the size of the object
  length() {
    return Object.keys(this.obj).length;
  }

  // Omits keys from the object
  omit(...keys) {
    this.obj = Object.keys(this.obj).reduce((acc, key) => {
      if (!keys.includes(key)) {
        acc[key] = this.obj[key];
      }
      return acc;
    }, {});
    return this;
  }

  // Picks keys from the object
  pick(...keys) {
    this.obj = keys.reduce((acc, key) => {
      if (this.obj.hasOwnProperty(key)) {
        acc[key] = this.obj[key];
      }
      return acc;
    }, {});
    return this;
  }

  // Swaps keys and values of the object
  invert() {
    this.obj = Object.keys(this.obj).reduce((acc, key) => {
      acc[this.obj[key]] = key;
      return acc;
    }, {});
    return this;
  }

  // Gets a nested property of the object
  getNested(path) {
    return path
      .split(".")
      .reduce((acc, key) => (acc ? acc[key] : undefined), this.obj);
  }

  // Sets a nested property of the object
  setNested(path, value) {
    const keys = path.split(".");
    keys.reduce((acc, key, index) => {
      if (index === keys.length - 1) {
        acc[key] = value;
      } else {
        acc[key] = acc[key] || {};
      }
      return acc[key];
    }, this.obj);
    return this;
  }

  // Deletes a nested property of the object
  deleteNested(path) {
    const keys = path.split(".");
    keys.reduce((acc, key, index) => {
      if (index === keys.length - 1) {
        delete acc[key];
      }
      return acc[key];
    }, this.obj);
    return this;
  }

  // Resets the object to a new one
  reset(newObj = {}) {
    this.obj = newObj;
    return this;
  }

  // Gets the current state of the object
  toObject() {
    return this.obj;
  }
}

export function object(obj) {
  return new ObjectUtils(obj);
}
