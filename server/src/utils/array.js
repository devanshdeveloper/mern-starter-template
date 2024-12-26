class ArrayUtils {
  constructor(arr) {
    this.arr = arr;
  }

  // 1. Check if array is empty
  isEmpty() {
    return this.arr.length === 0;
  }

  // 2. Find the index of an element
  indexOf(value) {
    return this.arr.indexOf(value);
  }

  // 3. Remove duplicates
  removeDuplicates() {
    this.arr = [...new Set(this.arr)];
    return this;
  }

  // 4. Merge two arrays
  merge(arr2) {
    this.arr = [...this.arr, ...arr2];
    return this;
  }

  // 5. Flatten a nested array
  flatten() {
    this.arr = this.arr.flat(Infinity);
    return this;
  }

  // 6. Deep clone an array
  deepClone() {
    this.arr = JSON.parse(JSON.stringify(this.arr));
    return this;
  }

  random() {
    return this.arr[Math.floor(Math.random() * this.arr.length)];
  }

  // 7. Get the first element
  first() {
    return this.arr[0];
  }

  // 8. Get the last element
  last() {
    return this.arr[this.arr.length - 1];
  }

  // 9. Remove the first element
  removeFirst() {
    this.arr.shift();
    return this;
  }

  // 10. Remove the last element
  removeLast() {
    this.arr.pop();
    return this;
  }

  // 11. Find the intersection of two arrays
  intersection(arr2) {
    this.arr = this.arr.filter((value) => arr2.includes(value));
    return this;
  }

  // 12. Find the difference between two arrays
  difference(arr2) {
    this.arr = this.arr.filter((value) => !arr2.includes(value));
    return this;
  }

  // 13. Check if an element exists
  contains(value) {
    return this.arr.includes(value);
  }

  // 14. Get the unique values
  unique() {
    this.arr = [...new Set(this.arr)];
    return this;
  }

  // 15. Convert array to string
  toString() {
    return this.arr.join(",");
  }

  // 16. Convert array to a number string
  toNumberString() {
    return this.arr.map(String).join(",");
  }

  // 17. Reverse an array
  reverse() {
    this.arr.reverse();
    return this;
  }

  // 18. Sort an array in ascending order
  sortAsc() {
    this.arr.sort((a, b) => a - b);
    return this;
  }

  // 19. Sort an array in descending order
  sortDesc() {
    this.arr.sort((a, b) => b - a);
    return this;
  }

  // 20. Find the maximum value in an array
  max() {
    return Math.max(...this.arr);
  }

  // 21. Find the minimum value in an array
  min() {
    return Math.min(...this.arr);
  }

  // 22. Sum the elements of an array
  sum() {
    return this.arr.reduce((acc, val) => acc + val, 0);
  }

  // 23. Average of the elements of an array
  average() {
    return this.arr.length
      ? this.arr.reduce((acc, val) => acc + val, 0) / this.arr.length
      : 0;
  }

  // 24. Remove an element by index
  removeByIndex(index) {
    this.arr.splice(index, 1);
    return this;
  }

  // 25. Add an element at the end
  push(value) {
    this.arr.push(value);
    return this;
  }

  // 26. Add an element at the beginning
  unshift(value) {
    this.arr.unshift(value);
    return this;
  }

  // 27. Map over the array
  map(callback) {
    this.arr = this.arr.map(callback);
    return this;
  }

  // 28. Filter the array
  filter(callback) {
    this.arr = this.arr.filter(callback);
    return this;
  }

  // 29. Reduce the array
  reduce(callback, initialValue) {
    this.arr = this.arr.reduce(callback, initialValue);
    return this;
  }

  // 30. Find an element in the array
  find(callback) {
    return this.arr.find(callback);
  }

  // 31. Every element meets condition?
  every(callback) {
    return this.arr.every(callback);
  }

  // 32. Some elements meet condition?
  some(callback) {
    return this.arr.some(callback);
  }

  // 33. Find the index of the element matching condition
  findIndex(callback) {
    return this.arr.findIndex(callback);
  }

  // 34. Check if the array includes a value
  includes(value) {
    return this.arr.includes(value);
  }

  // 35. Remove null/undefined from an array
  compact() {
    this.arr = this.arr.filter((val) => val != null);
    return this;
  }

  // 36. Chunk an array into smaller arrays
  chunk(size) {
    const result = [];
    for (let i = 0; i < this.arr.length; i += size) {
      result.push(this.arr.slice(i, i + size));
    }
    this.arr = result;
    return this;
  }

  // 37. Get the difference between multiple arrays
  differenceMultiple(...arrays) {
    this.arr = arrays.reduce((acc, arr) =>
      acc.filter((value) => !arr.includes(value))
    );
    return this;
  }

  // 38. Zip multiple arrays into a single array
  zip(...arrays) {
    this.arr = this.arr.map((_, i) => arrays.map((arr) => arr[i]));
    return this;
  }

  // 39. Unzip a zipped array
  unzip(arr) {
    this.arr = arr[0].map((_, i) => arr.map((subArr) => subArr[i]));
    return this;
  }

  // 40. Get the intersection of multiple arrays
  intersectionMultiple(...arrays) {
    this.arr = arrays.reduce((acc, arr) =>
      acc.filter((value) => arr.includes(value))
    );
    return this;
  }

  // 41. Get the array without falsy values
  withoutFalsy() {
    this.arr = this.arr.filter(Boolean);
    return this;
  }

  // 42. Get a subarray from the beginning
  take(count) {
    this.arr = this.arr.slice(0, count);
    return this;
  }

  // 43. Get a subarray from the end
  takeRight(count) {
    this.arr = this.arr.slice(this.arr.length - count);
    return this;
  }

  // 44. Create a range of numbers
  range(start, end, step = 1) {
    this.arr = [];
    for (let i = start; i < end; i += step) {
      this.arr.push(i);
    }
    return this;
  }

  // 45. Find the index of the last occurrence of an element
  lastIndexOf(value) {
    return this.arr.lastIndexOf(value);
  }

  // 46. Get the array without the first element
  withoutFirst() {
    this.arr = this.arr.slice(1);
    return this;
  }

  // 47. Get the array without the last element
  withoutLast() {
    this.arr = this.arr.slice(0, -1);
    return this;
  }

  // 48. Group the array into chunks of size n
  groupBy(size) {
    const result = [];
    for (let i = 0; i < this.arr.length; i += size) {
      result.push(this.arr.slice(i, i + size));
    }
    this.arr = result;
    return this;
  }

  // 49. Apply a function on each element with index
  forEach(callback) {
    this.arr.forEach(callback);
    return this;
  }

  // 50. Make an array with all elements multiplied by a factor
  multiplyBy(factor) {
    this.arr = this.arr.map((x) => x * factor);
    return this;
  }

  // 51. Remove an item if exists in array
  removeItem(item) {
    const index = this.arr.indexOf(item);
    if (index !== -1) this.arr.splice(index, 1);
    return this;
  }

  // 52. Find the first element that meets condition
  findFirst(callback) {
    return this.arr.find(callback);
  }

  // 53. Get the last element satisfying condition
  findLast(callback) {
    const reversedArr = [...this.arr].reverse();
    return reversedArr.find(callback);
  }

  // 54. Repeat an array n times
  repeat(times) {
    this.arr = Array(times).fill(this.arr).flat();
    return this;
  }

  // 55. Swap two elements in the array
  swap(index1, index2) {
    [this.arr[index1], this.arr[index2]] = [this.arr[index2], this.arr[index1]];
    return this;
  }

  // 56. Get the maximum element based on a function
  maxBy(fn) {
    this.arr = this.arr.reduce(
      (max, item) => (fn(item) > fn(max) ? item : max),
      this.arr[0]
    );
    return this;
  }

  // 57. Get the minimum element based on a function
  minBy(fn) {
    this.arr = this.arr.reduce(
      (min, item) => (fn(item) < fn(min) ? item : min),
      this.arr[0]
    );
    return this;
  }

  // 58. Repeat an element n times
  repeatElement(value, times) {
    this.arr = new Array(times).fill(value);
    return this;
  }

  // 59. Shuffle an array randomly
  shuffle() {
    for (let i = this.arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
    }
    return this;
  }

  // 60. Flatten the array and remove null/undefined
  flattenAndCompact() {
    this.arr = ArrayUtils.flatten(this.arr).filter(Boolean);
    return this;
  }

  // 61. Rotate the array by n positions
  rotate(n) {
    n = n % this.arr.length;
    this.arr = this.arr.slice(n).concat(this.arr.slice(0, n));
    return this;
  }

  // 62. Insert an element at a specific index
  insertAt(index, value) {
    this.arr.splice(index, 0, value);
    return this;
  }

  // 63. Count occurrences of a value
  countOccurrences(value) {
    return this.arr.filter((item) => item === value).length;
  }

  // 64. Remove all occurrences of a value
  removeAllOccurrences(value) {
    this.arr = this.arr.filter((item) => item !== value);
    return this;
  }

  // 65. Create a range of integers
  integerRange(start, end) {
    this.arr = Array.from({ length: end - start + 1 }, (_, i) => i + start);
    return this;
  }

  // 66. Get all permutations of an array
  permutations() {
    if (this.arr.length === 0) return [[]];
    const result = [];
    for (let i = 0; i < this.arr.length; i++) {
      const rest = [...this.arr.slice(0, i), ...this.arr.slice(i + 1)];
      const perms = this.permutations(rest);
      for (const perm of perms) {
        result.push([this.arr[i], ...perm]);
      }
    }
    this.arr = result;
    return this;
  }

  // 67. Check if all elements are equal
  areEqual() {
    return this.arr.every((value) => value === this.arr[0]);
  }

  // 68. Get the common values between multiple arrays
  commonValues(...arrays) {
    this.arr = this.arr.filter((value) =>
      arrays.every((arr) => arr.includes(value))
    );
    return this;
  }

  // 69. Add unique values from another array
  addUnique(arr2) {
    this.arr = [...new Set([...this.arr, ...arr2])];
    return this;
  }

  // 70. Get the first n elements of the array
  firstN(n) {
    this.arr = this.arr.slice(0, n);
    return this;
  }

  // 71. Get the last n elements of the array
  lastN(n) {
    this.arr = this.arr.slice(-n);
    return this;
  }

  // 72. Get the difference of two arrays (order matters)
  differenceWithOrder(arr2) {
    this.arr = this.arr.filter((value) => !arr2.includes(value));
    return this;
  }

  // 73. Create a new array from the given value repeated n times
  repeatValue(value, n) {
    this.arr = new Array(n).fill(value);
    return this;
  }

  // 74. Remove all false values
  removeFalseValues() {
    this.arr = this.arr.filter(Boolean);
    return this;
  }

  // 75. Merge arrays and sort
  mergeAndSort(...arrays) {
    this.arr = [].concat(...arrays).sort((a, b) => a - b);
    return this;
  }

  // 76. Get unique values while preserving order
  uniqueOrdered() {
    this.arr = [...new Set(this.arr)];
    return this;
  }

  // 77. Filter out false values (null, undefined, 0, false)
  compactFalse() {
    this.arr = this.arr.filter((val) => val);
    return this;
  }

  // 78. Interleave two arrays
  interleave(arr2) {
    const result = [];
    const len = Math.max(this.arr.length, arr2.length);
    for (let i = 0; i < len; i++) {
      if (i < this.arr.length) result.push(this.arr[i]);
      if (i < arr2.length) result.push(arr2[i]);
    }
    this.arr = result;
    return this;
  }

  // 79. Find the median of an array
  median() {
    const sorted = this.arr.slice().sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }

  // 80. Remove an element by value
  removeByValue(value) {
    const index = this.arr.indexOf(value);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
    return this;
  }
}

function array(array) {
  return new ArrayUtils(array);
}

export default array;
