import { Recipe } from "../models/Recipe.js";
import { Ingredient } from "../models/Ingredient.js";

const FV = "Fruits et légumes";
const VIANDES = "Viandes";
const CREMERIE = "Crèmerie";
const EPICERIE = "Épicerie";
const AUTRES = "Autres";

export class RecipeRepository {
    constructor() {
        this.recipes = [
            new Recipe({
                id: "carbonara",
                title: "Pâtes carbonara",
                image: "img/carbonara.jpg",
                difficulty: "facile",
                time: 20,
                ingredients: [
                    new Ingredient("200 g de spaghetti", EPICERIE),
                    new Ingredient("100 g de guanciale", VIANDES),
                    new Ingredient("2 œufs", CREMERIE),
                    new Ingredient("50 g de pecorino râpé", CREMERIE),
                    new Ingredient("Poivre noir", AUTRES),
                ],
                steps: [
                    "Faites cuire les spaghetti dans une grande casserole d'eau salée.",
                    "Faites dorer le guanciale à la poêle, puis mélangez les œufs avec le pecorino.",
                    "Égouttez les pâtes, mélangez-les hors du feu avec le guanciale et la sauce, puis poivrez."
                ]
            }),
            new Recipe({
                id: "avocado-toast",
                title: "Avocado toast",
                image: "img/avocado-toast.jpg",
                difficulty: "facile",
                time: 10,
                ingredients: [
                    new Ingredient("2 tranches de pain", EPICERIE),
                    new Ingredient("1 avocat mûr", FV),
                    new Ingredient("1 œuf", CREMERIE),
                    new Ingredient("½ citron", FV),
                    new Ingredient("Graines de sésame", EPICERIE)
                ],
                steps: [
                    "Faites griller les tranches de pain jusqu'à ce qu'elles soient bien dorées.",
                    "Écrasez l'avocat avec le jus de citron, du sel et un peu de poivre.",
                    "Répartissez l'avocat sur le pain, ajoutez l'œuf et parsemez de graines."
                ]
            }),
            new Recipe({
                id: "risotto",
                title: "Risotto aux champignons",
                image: "img/risotto.jpg",
                difficulty: "moyen",
                time: 35,
                ingredients: [
                    new Ingredient("200 g de riz arborio", EPICERIE),
                    new Ingredient("250 g de champignons", FV),
                    new Ingredient("1 oignon", FV),
                    new Ingredient("1 L de bouillon", EPICERIE),
                    new Ingredient("50 g de parmesan", CREMERIE)
                ],
                steps: [
                    "Faites revenir l'oignon et les champignons émincés dans un peu d'huile.",
                    "Ajoutez le riz, puis versez le bouillon louche par louche en remuant.",
                    "Hors du feu, incorporez le parmesan et servez aussitôt."
                ]
            }),
            new Recipe({
                id: "curry",
                title: "Curry de poulet",
                image: "img/curry.jpg",
                difficulty: "moyen",
                time: 40,
                ingredients: [
                    new Ingredient("2 filets de poulet", VIANDES),
                    new Ingredient("1 oignon", FV),
                    new Ingredient("2 c. à soupe de pâte de curry", EPICERIE),
                    new Ingredient("200 mL de lait de coco", EPICERIE),
                    new Ingredient("Riz basmati", EPICERIE)
                ],
                steps: [
                    "Coupez le poulet en morceaux et faites-le dorer avec l'oignon.",
                    "Ajoutez la pâte de curry puis le lait de coco et laissez mijoter 20 minutes.",
                    "Servez avec du riz basmati."
                ]
            }),
            new Recipe({
                id: "pancakes",
                title: "Pancakes moelleux",
                image: "img/pancakes.jpg",
                difficulty: "facile",
                time: 15,
                ingredients: [
                    new Ingredient("200 g de farine", EPICERIE),
                    new Ingredient("2 œufs", CREMERIE),
                    new Ingredient("250 mL de lait", CREMERIE),
                    new Ingredient("1 sachet de levure", EPICERIE),
                    new Ingredient("Framboises", FV)
                ],
                steps: [
                    "Mélangez la farine et la levure, puis ajoutez les œufs et le lait.",
                    "Faites cuire de petites louches de pâte dans une poêle chaude, 2 minutes par face.",
                    "Servez empilés avec des framboises."
                ]
            }),
            new Recipe({
                id: "fondant",
                title: "Fondant au chocolat",
                image: "img/fondant.jpg",
                difficulty: "moyen",
                time: 25,
                ingredients: [
                    new Ingredient("200 g de chocolat noir", EPICERIE),
                    new Ingredient("100 g de beurre", CREMERIE),
                    new Ingredient("3 œufs", CREMERIE),
                    new Ingredient("100 g de sucre", EPICERIE),
                    new Ingredient("50 g de farine", EPICERIE)
                ],
                steps: [
                    "Faites fondre le chocolat avec le beurre.",
                    "Ajoutez les œufs battus avec le sucre, puis la farine.",
                    "Versez dans des moules et faites cuire 10 minutes à 200 °C."
                ]
            })
        ];
    }

    getAll() {
        return this.recipes;
    }

    findById(id) {
        return this.recipes.find(recipe => recipe.id === id);
    }

    filterByDifficulty(difficulty) {
        if (difficulty === "all") {
            return this.recipes;
        }
        return this.recipes.filter(recipe => recipe.difficulty === difficulty);
    }
}