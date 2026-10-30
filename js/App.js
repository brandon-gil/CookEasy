import { RecipeRepository } from "./services/RecipeRepository.js";
import { ShoppingList } from "./services/ShoppingList.js";
import { MyRecipes } from "./services/MyRecipes.js";
import { RecipeCard } from "./ui/RecipeCard.js";
import { FilterBar } from "./ui/FilterBar.js";
import { Modal } from "./ui/Modal.js";

export class App {
    constructor() {
        this.repository = new RecipeRepository();
        this.shoppingList = new ShoppingList();
        this.myRecipes = new MyRecipes();
        this.list = document.querySelector(".recipe-list");
        this.modal = new Modal(
            document.querySelector("#recipe-modal"),
            recipe => this.addToShoppingList(recipe)
        );
        this.filterBar = new FilterBar(
            document.querySelector(".filters"),
            difficulty => this.showRecipes(difficulty)
        );
    }

    init() {
        this.filterBar.init();
        this.modal.init();
        this.list.addEventListener("click", event => this.handleListClick(event));
        this.showRecipes("all");
    }

    handleListClick(event) {
        const button = event.target.closest(".recipe-link");
        if (!button) {
            return;
        }
        const card = button.closest(".recipe-card");
        const recipe = this.repository.findById(card.dataset.id);
        this.modal.open(recipe, this.myRecipes.has(recipe.id));
    }

    addToShoppingList(recipe) {
        this.shoppingList.add(recipe);
        this.myRecipes.add(recipe.id);
    }

    showRecipes(difficulty) {
        const recipes = this.repository.filterByDifficulty(difficulty);
        this.list.innerHTML = "";
        recipes.forEach(recipe => {
            this.list.appendChild(new RecipeCard(recipe).render());
        });
    }
}
