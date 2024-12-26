export default class DiscountManager {
  constructor(initialDiscounts = []) {
    this.discounts = initialDiscounts;
    this.validOperators = ["flat", "percentage"];
  }

  addDiscount(discount) {
    this.discounts = [...this.discounts, discount];
  }

  isEligible(cart) {
    
  }
}
