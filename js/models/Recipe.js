export class Recipe {
    constructor({ id, title, image, difficulty, time, ingredients, steps}) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.difficulty = difficulty;  // "facile" ou "moyen"
        this.time = time;              // en minutes
        this.ingredients = ingredients; // tableau d'Ingrédient
        this.steps = steps;            // tableau de textes
    }

    get difficultyLabel() {
        return this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1)
    }

    get timeLabel() {
        return `${this.time} min de préparation`;
    }
}