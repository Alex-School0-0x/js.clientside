import { Item, ItemManager } from "./template.js";

const mng = new ItemManager();
mng.fetchData();
const newOrderBtn = document.getElementById("newOrder");

function Go() {
    newOrderBtn.setAttribute("style", "display: none")
    displayItems();
}
newOrderBtn.addEventListener('click', Go);

function displayItems() {
    mng.items.forEach((value, index) => {
        const button = document.createElement("button");
         
        button.id = 'item-'+index;
        button.textContent = value.name + ': $' + value.price + button.id;

        button.addEventListener("click", () => {
            console.log('Button '+value.name+' clicked');

        });
        document.getElementById("demo").appendChild(button)
    });
}
