// Filter
function applyFilter() {
    const filters = document.querySelectorAll(".filter");

    filters.forEach((f) => {
        f.classList.remove("selected");
    });

    const foods = document.getElementById("foods");
    const drinks = document.getElementById("drinks");

    const filterRadios = document.querySelectorAll(".filter-radio");
    const category = Array.from(filterRadios).find((filterRadio) => filterRadio.checked).value;

    switch (category) {
        case "all":
            document.getElementById("filterAll").parentElement.classList.add("selected");
            foods?.classList.remove("hide");
            drinks?.classList.remove("hide");
            break;
        case "foods":
            document.getElementById("filterFoods").parentElement.classList.add("selected");
            foods?.classList.remove("hide");
            drinks?.classList.add("hide");
            break;
        case "drinks":
            document.getElementById("filterDrinks").parentElement.classList.add("selected");
            foods?.classList.add("hide");
            drinks?.classList.remove("hide");
    }
}

applyFilter();

const filtersForm = document.getElementById("filters");

filtersForm.addEventListener("change", () => {
    applyFilter();
});

// Search
function search(form) {
    const data = new FormData(form);
    const keyword = data.get("keyword");

    const menus = document.querySelectorAll(".menu");

    menus.forEach((menu) => {
        menu.classList.remove("hide");

        const name = menu.dataset.name;

        if (!name.toLowerCase().includes(keyword.toLowerCase())) {
            menu.classList.add("hide");
        }
    });

    const foods = [];
    const drinks = [];

    menus.forEach((menu) => {
        if (menu.dataset.category === "food") {
            foods.push(menu);
        } else {
            drinks.push(menu);
        }
    });

    const foodsEmptyMessage = document.getElementById("foodsEmptyMessage");
    foodsEmptyMessage?.classList.remove("show");

    if (foods.every((food) => food.classList.contains("hide"))) {
        foodsEmptyMessage?.classList.add("show");
    }

    const drinksEmptyMessage = document.getElementById("drinksEmptyMessage");
    drinksEmptyMessage?.classList.remove("show");

    if (drinks.every((drink) => drink.classList.contains("hide"))) {
        drinksEmptyMessage?.classList.add("show");
    }
}

const searchForm = document.getElementById("searchForm");
search(searchForm);

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    search(event.currentTarget);
});
