import { ShoppingList } from "./services/ShoppingList.js";
import { MyRecipes } from "./services/MyRecipes.js";
import { Header } from "./ui/Header.js";
import { ShoppingView } from "./ui/ShoppingView.js";

const shoppingList = new ShoppingList();
const myRecipes = new MyRecipes();
const header = new Header(document.querySelector(".site-header"), shoppingList);

new ShoppingView({
    shoppingList,
    container: document.querySelector("#shopping-groups"),
    summary: document.querySelector("#shopping-summary"),
    clearButton: document.querySelector("#clear-list"),
    onClear: () => myRecipes.clear(),
    onChange: () => header.update()
}).init();
