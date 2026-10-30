import { RecipeRepository } from "./services/RecipeRepository.js";
import { RecipeCard } from "./ui/RecipeCard.js";
import { FilterBar } from "./ui/FilterBar.js";

export class App {
    constructor() {
        this.repository = new RecipeRepository();
        this.list = document.querySelector(".recipe-list");
        this.filterBar = new FilterBar(
            document.querySelector(".filters"),
            difficulty => this.showRecipes(difficulty)
        );
    }

    init() {
        this.filterBar.init();
        this.showRecipes("all");
    }

    showRecipes(difficulty) {
        const recipes = this.repository.filterByDifficulty(difficulty);
        this.list.innerHTML = "";
        recipes.forEach(recipe => {
            this.list.appendChild(new RecipeCard(recipe).render());
        });
    }
}
