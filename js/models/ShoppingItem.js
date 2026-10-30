export class ShoppingItem {
    constructor({ id, label, category, recipeId, checked = false }) {
        this.id = id;
        this.label = label;
        this.category = category;
        this.recipeId = recipeId;
        this.checked = checked;
    }
}
