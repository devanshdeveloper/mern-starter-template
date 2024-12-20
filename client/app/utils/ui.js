export default class UIUtils {
  constructor() {}

  // react-select
  getOptionsForSelect(array) {
    return array.map((e) => ({ value: e, label: e }));
  }
  getOptionByValue(array, value) {
    return array.find((e) => e.value === value);
  }
}

export const uiUtils = new UIUtils();
