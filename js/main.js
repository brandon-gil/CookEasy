import { RecipeRepository } from "./services/RecipeRepository.js";

const repository = new RecipeRepository();

console.log(repository.getAll());
console.log(repository.filterByDifficulty("facile"));
console.log(repository.findById("curry"));