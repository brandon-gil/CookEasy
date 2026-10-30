import { Storage } from "./Storage.js";

const KEY = "cookeasy.myrecipes";

export class MyRecipes {
    constructor() {
        this.ids = Storage.get(KEY, []);
    }

    save() {
        Storage.set(KEY, this.ids);
    }

    has(id) {
        return this.ids.includes(id);
    }

    add(id) {
        if (!this.has(id)) {
            this.ids.push(id);
            this.save();
        }
    }

    remove(id) {
        this.ids = this.ids.filter(recipeId => recipeId !== id);
        this.save();
    }

    clear() {
        this.ids = [];
        this.save();
    }

    all() {
        return this.ids;
    }
}
