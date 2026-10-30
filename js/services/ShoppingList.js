import { Storage } from "./Storage.js";
import { ShoppingItem } from "../models/ShoppingItem.js";

const KEY = "cookeasy.shopping";

export class ShoppingList {
    constructor() {
        // JSON ne conserve pas les classes : on recrée des ShoppingItem
        this.items = Storage.get(KEY, []).map(data => new ShoppingItem(data));
    }

    save() {
        Storage.set(KEY, this.items);
    }

    hasRecipe(recipeId) {
        return this.items.some(item => item.recipeId === recipeId);
    }

    add(recipe) {
        if (this.hasRecipe(recipe.id)) {
            return;
        }
        recipe.ingredients.forEach((ingredient, index) => {
            this.items.push(new ShoppingItem({
                id: `${recipe.id}-${index}`,
                label: ingredient.label,
                category: ingredient.category,
                recipeId: recipe.id
            }));
        });
        this.save();
    }

    toggle(id) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.checked = !item.checked;
            this.save();
        }
    }

    remove(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.save();
    }

    removeRecipe(recipeId) {
        this.items = this.items.filter(item => item.recipeId !== recipeId);
        this.save();
    }

    clear() {
        this.items = [];
        this.save();
    }

    // Ingrédients restants à trouver (cases non cochées)
    count() {
        return this.items.filter(item => !item.checked).length;
    }

    // { "Crèmerie": [item, item], "Épicerie": [...] }
    groupedByCategory() {
        const groups = {};
        this.items.forEach(item => {
            if (!groups[item.category]) {
                groups[item.category] = [];
            }
            groups[item.category].push(item);
        });
        return groups;
    }
}
