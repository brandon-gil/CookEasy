const CATEGORY_ORDER = ["Fruits et légumes", "Crèmerie", "Viandes", "Épicerie", "Autres"];

export class ShoppingView {
    constructor({ shoppingList, container, summary, clearButton, onClear, onChange }) {
        this.shoppingList = shoppingList;
        this.container = container;
        this.summary = summary;
        this.clearButton = clearButton;
        this.onClear = onClear;
        this.onChange = onChange;
    }

    init() {
        this.clearButton.addEventListener("click", () => {
            this.shoppingList.clear();
            this.onClear();
            this.render();
        });

        this.container.addEventListener("change", event => {
            if (event.target.matches(".item-check")) {
                this.shoppingList.toggle(event.target.dataset.id);
                this.render();
            }
        });

        this.container.addEventListener("click", event => {
            const button = event.target.closest(".item-remove");
            if (button) {
                this.shoppingList.remove(button.dataset.id);
                this.render();
            }
        });

        this.render();
    }

    render() {
        const groups = this.shoppingList.groupedByCategory();
        const categories = CATEGORY_ORDER.filter(category => groups[category]);

        this.container.innerHTML = "";

        if (categories.length === 0) {
            const empty = document.createElement("p");
            empty.className = "empty-message";
            empty.textContent = "Votre liste est vide. Ajoutez les ingrédients d'une recette depuis la page d'accueil.";
            this.container.appendChild(empty);
        } else {
            // Deux colonnes : les catégories sont réparties à tour de rôle
            const columns = [document.createElement("div"), document.createElement("div")];
            columns.forEach(column => {
                column.className = "shopping-col";
                this.container.appendChild(column);
            });
            categories.forEach((category, index) => {
                columns[index % 2].appendChild(this.createGroup(category, groups[category]));
            });
        }

        const remaining = this.shoppingList.count();
        this.summary.textContent = remaining === 0
            ? "Rien à acheter pour le moment."
            : `${remaining} ingrédient${remaining > 1 ? "s" : ""} restant${remaining > 1 ? "s" : ""} à trouver.`;

        this.onChange();
    }

    createGroup(category, items) {
        const section = document.createElement("section");
        section.className = "shopping-group";

        const header = document.createElement("header");
        header.className = "group-header";
        const title = document.createElement("h2");
        title.textContent = category;
        const count = document.createElement("span");
        count.className = "group-count";
        count.textContent = items.length;
        header.append(title, count);

        const list = document.createElement("ul");
        items.forEach(item => list.appendChild(this.createItem(item)));

        section.append(header, list);
        return section;
    }

    createItem(item) {
        const li = document.createElement("li");
        li.className = item.checked ? "shopping-item checked" : "shopping-item";

        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.className = "item-check";
        input.dataset.id = item.id;
        input.checked = item.checked;
        const text = document.createElement("span");
        text.textContent = item.label;
        label.append(input, text);

        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "item-remove";
        remove.dataset.id = item.id;
        remove.setAttribute("aria-label", `Supprimer ${item.label}`);
        remove.textContent = "×";

        li.append(label, remove);
        return li;
    }
}
