export class Modal {
    constructor(element) {
        this.element = element;
        this.image = element.querySelector(".modal-image");
        this.badge = element.querySelector(".modal-badge");
        this.title = element.querySelector("#modal-title");
        this.time = element.querySelector(".modal-time");
        this.ingredients = element.querySelector(".modal-ingredients");
        this.steps = element.querySelector(".modal-steps");
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
    }

    open(recipe) {
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

    close() {
        this.element.hidden = true;
        if (this.lastFocused) {
            this.lastFocused.focus();
        }
    }
}
