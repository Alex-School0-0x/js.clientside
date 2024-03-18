import { Item, ItemManager } from "./template.js";

let orderNum = 1;
let order = [];
const mng = new ItemManager();
const newOrderBtn = document.getElementById("newOrder");
const itemDiv = document.createElement('div');
const ordernumDisplay = document.createElement("p");
const mainElm = document.getElementById("main");

async function Go() {
    await mng.fetchData();
    newOrderBtn.style.display = 'none';
    itemDiv.id = 'demo';
    mainElm.appendChild(itemDiv);
    displayOrderNum();
    displayItems();
}
newOrderBtn.addEventListener('click', Go);

function displayOrderNum() {

    ordernumDisplay.textContent = 'Order Number: '+orderNum;
    ordernumDisplay.id = 'ordernumDisplay';

    mainElm.appendChild(ordernumDisplay);
}

function annual() {
    while (itemDiv.firstChild) {
        itemDiv.removeChild(itemDiv.firstChild);
    }
    itemDiv.remove()
    newOrderBtn.style.display = 'inline';
    ordernumDisplay.remove()
    order = [];
}

function displayItems() {
    mng.items.forEach((value, index) => {
        const button = document.createElement("button");
         
        button.id = 'item-'+index;
        button.textContent = value.name + ': $' + value.price;

        button.addEventListener("click", () => {
            console.log('Button '+value.name+' clicked');
            order.push(value);
        });
        itemDiv.appendChild(button)
    });
}

function test() {
    annual();
    console.log(order);
}
document.getElementById("test").addEventListener("click", test);