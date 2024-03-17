class Item {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

class ItemManager {
    constructor() {
        this.items = [];
    }

    async fetchData() {
        try {
            const response = await fetch("data.json");
            const data = await response.json();
            this.items = data.map(itemdata => new Item(itemdata.name, itemdata.price, itemdata.category));
            console.log("Data fetched successfully:", this.items);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
}

export { Item, ItemManager };