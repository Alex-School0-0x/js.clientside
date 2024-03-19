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
        this.categories = [];
    }

    async fetchData() {
        this.items = [];
        await fetch("data.json")
        .then((resp) => {
            if (!resp.ok) throw new Error('Was not a vaild response');
            return resp.json();
        })
        .then((data) => {
            this.items = data.map(itemdata => new Item(itemdata.name, itemdata.price, itemdata.category));
            this.categories = [...new Set(data.map(itemdata => itemdata.category))]
            console.log("Data fetched successfully:", this.items, this.categories);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }
}

export { Item, ItemManager };