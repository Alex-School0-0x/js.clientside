import { Item, ItemManager } from "./template.js";

//Variables
let orderNum = 1;
let daysTotal = 0;

//Arrays
let order = [];
let orderAmount = [];

//Constants
const mng = new ItemManager();
const body = document.body;
const newOrderBtn = document.createElement('button');
const annulBtn = document.createElement('button');
const itemDiv = document.createElement('div');
const ordernumDisplay = document.createElement('p');
const daysTotalDisplay = document.createElement('p');
const mainElm = document.createElement('div');
const orderSumBtn = document.createElement('button');
const orderDiv = document.createElement('div');
const filter = document.createElement('select');
const label = document.createElement('label');

//default Settings
newOrderBtn.id = 'newOrder';
newOrderBtn.textContent = 'New Order';
newOrderBtn.addEventListener('click', Go);

orderSumBtn.id = 'orderSum';
orderSumBtn.textContent = 'Check Order';
orderSumBtn.addEventListener('click', showOrder)
hideElm(orderSumBtn);

annulBtn.id = 'annul';
annulBtn.textContent = 'Annul';
annulBtn.addEventListener('click', annul);
hideElm(annulBtn);

itemDiv.className = 'gridDisplay';
hideElm(itemDiv);

orderDiv.className = 'gridDisplay';
hideElm(orderDiv);

label.htmlFor = 'filter';
label.textContent = 'Filter: ';
hideElm(label);

filter.name = 'filter';
filter.id = 'filter';
hideElm(filter);
filter.add(document.createElement('option'));
filter.firstChild.textContent = 'all';
filter.firstChild.value = "all";
filter.addEventListener('change', filterChange)

ordernumDisplay.id = 'ordernumDisplay';

daysTotalDisplay.id = 'daysTotalDisplay';
updateDaysTotal();

mainElm.id = 'main';
mainElm.appendChild(label);
mainElm.appendChild(filter);
mainElm.appendChild(newOrderBtn);
mainElm.appendChild(orderDiv);
mainElm.appendChild(itemDiv);
mainElm.appendChild(orderSumBtn);
mainElm.appendChild(annulBtn);

body.appendChild(mainElm);
body.appendChild(daysTotalDisplay);

// functions
async function Go() { //Starting function
    await mng.fetchData();
    resetItemDiv();
    hideElm(newOrderBtn);
    hideElm(orderDiv);
    showElm(label);
    showElm(filter);
    showElm(itemDiv);
    showElm(annulBtn);
    showElm(orderSumBtn);
    displayOrderNum();
    mng.items.forEach(displayItems);
    mng.categories.forEach(SetupSelectFilter)
}

function SetupSelectFilter(value) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    filter.appendChild(option);
}

function filterChange(event) {
    resetItemDiv();
    if (event.target.value == "all") {
        mng.items.forEach(displayItems);
    } else {
        const filteredItems = mng.items.filter(value => {
            return value.category == event.target.value;
        })
        filteredItems.forEach(displayItems);
    }
}

function annul() { // resets the page 
    resetItemDiv();
    showElm(newOrderBtn);
    hideElm(label);
    hideElm(filter);
    hideElm(orderDiv);
    hideElm(itemDiv);
    hideElm(annulBtn);
    hideElm(orderSumBtn);
    ordernumDisplay.remove();
    order = [];
    orderAmount = [];
}

function updateDaysTotal() {
    daysTotalDisplay.textContent = 'Total for today: $' + (daysTotal.toFixed(2));
}

function displayOrderNum() { //makes the ordernumber visable
    ordernumDisplay.textContent = 'Order Number: ' + orderNum;
    body.appendChild(ordernumDisplay);
}

function displayItems(value, index) { //makes buttons for items
    const button = document.createElement('button');

    button.id = 'item-' + index;
    button.textContent = value.name + ': $' + value.price;

    button.addEventListener("click", () => {
        console.log('Button ' + value.name + ' clicked');
        addToOrder(value);
    });
    itemDiv.appendChild(button);
}

function resetItemDiv() {
    while (itemDiv.firstChild) {
        itemDiv.removeChild(itemDiv.firstChild);
    }
}

function addToOrder(item) { //add item to order or increas the amount
    if (order.includes(item)) {
        orderAmount[order.indexOf(item)]++;
    } else {
        order.push(item);
        orderAmount.push(1);
    }
}

function showOrder() {
    const backBtn = document.createElement('button');
    const purcBtn = document.createElement('button');
    purcBtn.textContent = 'Purchase Order';
    purcBtn.addEventListener('click', () => {
        purchase();
        backBtn.remove();
        purcBtn.remove();
        hideElm(annulBtn);
    });
    backBtn.textContent = 'Back';
    backBtn.addEventListener('click', () => { Go(); backBtn.remove(); purcBtn.remove(); });
    mainElm.insertBefore(purcBtn, annulBtn)
    mainElm.insertBefore(backBtn, annulBtn)
    resetOrderDiv();
    hideElm(label);
    hideElm(filter);
    hideElm(orderSumBtn);
    hideElm(itemDiv);
    showElm(orderDiv);
    setupOrder();
}

function purchase() {
    const receipt = document.createElement('div');
    const total = document.createElement('p');
    const ordernumber = document.createElement('p');
    const sum = order.reduce(getTotal, 0);
    daysTotal += sum;
    updateDaysTotal();
    mainElm.appendChild(receipt);
    ordernumber.textContent = 'OrderNumber: ' + orderNum;
    receipt.id = 'receipt';
    hideElm(orderDiv);
    ordernumDisplay.remove();
    receipt.appendChild(ordernumber);
    order.forEach(setupReceipt);
    total.textContent = 'Total: $' + sum.toFixed(2);
    receipt.appendChild(total);
    orderNum++;
    setTimeout(() => { annul(); receipt.remove(); }, 5000);
}

function setupReceipt(value, index) {
    const txt = document.createElement('p');
    txt.textContent = '$' + value.price + value.name +
        ' x ' + orderAmount[index] + ' is $' + (value.price * orderAmount[index]).toFixed(2);
    document.getElementById('receipt').appendChild(txt);
}

function setupOrder() {
    const total = document.createElement('p');
    order.forEach(setupOrderItems);
    total.textContent = 'Total: $' + order.reduce(getTotal, 0).toFixed(2);
    orderDiv.appendChild(total);
}

function getTotal(total, value, index) {
    return total + (value.price * orderAmount[index]);
}

function setupOrderItems(value, index) {
    const txt = document.createElement('p');
    const buttons = document.createElement('div');
    const lessBtn = document.createElement('button');
    const moreBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    txt.textContent = '$' + value.price + value.name +
        ' x ' + orderAmount[index] + ' is $' + (value.price * orderAmount[index]).toFixed(2);
    lessBtn.textContent = 'Less';
    moreBtn.textContent = 'More';
    deleteBtn.textContent = 'Delete';
    buttons.appendChild(lessBtn);
    buttons.appendChild(moreBtn);
    buttons.appendChild(deleteBtn);
    lessBtn.addEventListener('click', () => lessLogic(index));
    moreBtn.addEventListener('click', () => moreLogic(index));
    deleteBtn.addEventListener('click', () => deleteLogic(index));
    orderDiv.appendChild(txt);
    orderDiv.appendChild(buttons);
}

function lessLogic(index) {
    if (orderAmount[index] == 1) {
        deleteLogic(index);
    } else {
        resetOrderDiv();
        orderAmount[index]--;
        setupOrder();
    }
}

function moreLogic(index) {
    resetOrderDiv();
    orderAmount[index]++;
    setupOrder()
}

function deleteLogic(index) {
    resetOrderDiv();
    order.splice(index, 1);
    orderAmount.splice(index, 1);
    setupOrder()
}

function resetOrderDiv() {
    while (orderDiv.firstChild) {
        orderDiv.removeChild(orderDiv.firstChild)
    }
}

function showElm(elm) { //makes html elements visable
    if (elm instanceof HTMLElement) {
        elm.style.display = elm.dataset.originalDisplay || '';
        delete elm.dataset.originalDisplay;
    } else {
        console.warn('not an HTMLElement', elm)
    }
}

function hideElm(elm) { //makes html elements invisable
    if (elm instanceof HTMLElement) {
        if (elm.style.display == 'none') return;
        elm.dataset.originalDisplay = elm.style.display;
        elm.style.display = 'none';
    } else {
        console.warn('not an HTMLElement', elm)
    }
}

// Made for testing
const testBtn = document.createElement("button");
testBtn.addEventListener("click", test);
testBtn.textContent = "Test";
testBtn.setAttribute("style", "position: absolute; right: 0; bottom: 0;");
body.appendChild(testBtn);
function test() {
    console.log(order);
    console.log(orderAmount);
}