import { RecipeRepository } from "./services/RecipeRepository.js";
import { ShoppingList } from "./services/ShoppingList.js";
import { MyRecipes } from "./services/MyRecipes.js";
import { Header } from "./ui/Header.js";
import { Modal } from "./ui/Modal.js";
import { MyRecipesView } from "./ui/MyRecipesView.js";

const repository = new RecipeRepository();
const shoppingList = new ShoppingList();
const myRecipes = new MyRecipes();
const header = new Header(document.querySelector(".site-header"), shoppingList);

const modal = new Modal(document.querySelector("#recipe-modal"), () => {});
modal.init();

new MyRecipesView({
    repository,
    myRecipes,
    shoppingList,
    container: document.querySelector("#my-recipes-list"),
    modal,
    onChange: () => header.update()
}).init();
