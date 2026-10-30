export class RecipeCard {
    constructor(recipe) {
        this.recipe = recipe;
    }

    render() {
        const article = document.createElement("article");
        article.className = "recipe-card";
        article.dataset.id = this.recipe.id;
        article.dataset.difficulty = this.recipe.difficulty;

        article.innerHTML = `
            <img src="${this.recipe.image}" alt="${this.recipe.title}">
            <div class="recipe-card-body">
                <span class="badge badge-${this.recipe.difficulty}">${this.recipe.difficultyLabel}</span>
                <h3>${this.recipe.title}</h3>
                <p class="recipe-time"><img src="img/ClockIcon.png" alt=""> ${this.recipe.timeLabel}</p>
                <button type="button" class="recipe-link">Voir la recette <img src="img/ArrowIcon.png" alt=""></button>
            </div>
        `;

        return article;
    }
}
