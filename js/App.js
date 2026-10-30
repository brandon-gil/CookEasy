import { RecipeRepository } from "./services/RecipeRepository.js";
import { RecipeCard } from "./ui/RecipeCard.js";
import { FilterBar } from "./ui/FilterBar.js";
import { Modal } from "./ui/Modal.js";

export class App {
    constructor() {
        this.repository = new RecipeRepository();
        this.list = document.querySelector(".recipe-list");
        this.modal = new Modal(document.querySelector("#recipe-modal"));
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
        this.modal.open(recipe);
    }

    showRecipes(difficulty) {
        const recipes = this.repository.filterByDifficulty(difficulty);
        this.list.innerHTML = "";
        recipes.forEach(recipe => {
            this.list.appendChild(new RecipeCard(recipe).render());
        });
    }
}
