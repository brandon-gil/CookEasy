export class Header {
    constructor(element, shoppingList) {
        this.badge = element.querySelector(".cart-count");
        this.shoppingList = shoppingList;
    }

    update() {
        const count = this.shoppingList.count();
        this.badge.textContent = count;
        this.badge.hidden = count === 0;
    }
}
