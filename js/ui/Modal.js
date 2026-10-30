export class Modal {
    constructor(element, onAdd) {
        this.element = element;
        this.onAdd = onAdd;
        this.currentRecipe = null;
        this.image = element.querySelector(".modal-image");
        this.badge = element.querySelector(".modal-badge");
        this.title = element.querySelector("#modal-title");
        this.time = element.querySelector(".modal-time");
        this.ingredients = element.querySelector(".modal-ingredients");
        this.steps = element.querySelector(".modal-steps");
        this.addButton = element.querySelector(".modal-add");
        this.closeButtons = element.querySelectorAll(".modal-close, .modal-close-btn");
        this.lastFocused = null;
    }

    init() {
        this.closeButtons.forEach(button => {
            button.addEventListener("click", () => this.close());
        });

        // Clic sur le fond sombre (pas sur la fenêtre elle-même)
        this.element.addEventListener("click", event => {
            if (event.target === this.element) {
                this.close();
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && !this.element.hidden) {
                this.close();
            }
        });

        this.addButton.addEventListener("click", () => {
            this.onAdd(this.currentRecipe);
            this.setAdded(true);
        })
    }

    open(recipe, isAdded = false) {
        this.currentRecipe = recipe;
        this.setAdded(isAdded);
        this.lastFocused = document.activeElement;

        this.image.src = recipe.image;
        this.image.alt = recipe.title;
        this.badge.textContent = recipe.difficultyLabel;
        this.badge.className = `badge modal-badge badge-${recipe.difficulty}`;
        this.title.textContent = recipe.title;
        this.time.textContent = recipe.timeLabel;

        this.ingredients.innerHTML = "";
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement("li");
            li.textContent = ingredient.label;
            this.ingredients.appendChild(li);
        });

        this.steps.innerHTML = "";
        recipe.steps.forEach(step => {
            const li = document.createElement("li");
            li.textContent = step;
            this.steps.appendChild(li);
        });

        this.element.hidden = false;
        this.closeButtons[0].focus();
    }

    setAdded(isAdded) {
        this.addButton.disabled = isAdded;
        this.addButton.textContent = isAdded
            ? "Ingrédients ajoutés ✓"
            : "Ajouter à la liste de courses";
    }

    close() {
        this.element.hidden = true;
        if (this.lastFocused) {
            this.lastFocused.focus();
        }
    }
}
