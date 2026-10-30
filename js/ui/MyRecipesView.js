import { RecipeCard } from "./RecipeCard.js";

export class MyRecipesView {
    constructor({ repository, myRecipes, shoppingList, container, modal, onChange }) {
        this.repository = repository;
        this.myRecipes = myRecipes;
        this.shoppingList = shoppingList;
        this.container = container;
        this.modal = modal;
        this.onChange = onChange;
    }

    init() {
        this.container.addEventListener("click", event => {
            const removeButton = event.target.closest(".remove-link");
            if (removeButton) {
                this.remove(removeButton.dataset.id);
                return;
            }

            const openButton = event.target.closest(".recipe-link");
            if (openButton) {
                const card = openButton.closest(".recipe-card");
                this.modal.open(this.repository.findById(card.dataset.id), true);
            }
        });

        this.render();
    }

    remove(id) {
        this.myRecipes.remove(id);
        this.shoppingList.removeRecipe(id);
        this.render();
    }

    render() {
        this.container.innerHTML = "";

        const recipes = this.myRecipes.all()
            .map(id => this.repository.findById(id))
            .filter(recipe => recipe);

        if (recipes.length === 0) {
            const empty = document.createElement("p");
            empty.className = "empty-message";
            empty.textContent = "Vous n'avez pas encore ajouté de recette.";
            this.container.appendChild(empty);
        }

        recipes.forEach(recipe => {
            const item = document.createElement("div");
            item.className = "recipe-item";

            const remove = document.createElement("button");
            remove.type = "button";
            remove.className = "remove-link";
            remove.dataset.id = recipe.id;
            remove.textContent = "Retirer de mes recettes";

            item.append(new RecipeCard(recipe).render(), remove);
            this.container.appendChild(item);
        });

        this.onChange();
    }
}
