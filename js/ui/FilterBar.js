export class FilterBar {
    constructor(container, onFilter) {
        this.container = container;
        this.buttons = container.querySelectorAll(".filter-btn");
        this.onFilter = onFilter;
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener("click", () => {
                this.setActive(button);
                this.onFilter(button.dataset.filter);
            });
        });
    }

    setActive(activeButton) {
        this.buttons.forEach(button => button.classList.remove("active"));
        activeButton.classList.add("active");
    }
}
