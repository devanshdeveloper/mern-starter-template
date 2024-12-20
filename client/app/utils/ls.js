export class useStorage {
  constructor(storageObj) {
    this.storageObj = storageObj;
  }
  remove(key) {
    if (!key) return;
    this.storageObj.removeItem(key);
  }
  clear() {
    this.storageObj.clear();
  }
  item(key, value) {
    if (!key) return;
    if (value) {
      this.storageObj.setItem(key, JSON.stringify(value));
      return value;
    } else {
      let temp = this.storageObj.getItem(key);
      if (temp) return JSON.parse(temp);
    }
  }
}

export const ls = new useStorage(localStorage);
