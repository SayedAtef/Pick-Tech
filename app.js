// this class represents any item enterd
class Item {
    constructor(name, code, money) {
        this.name = name;
        this.code = code;
        this.money = money;
    }
}

// this class represnts both purchase and profits
class Profit {
    constructor(code, money, description){
        this.code = code;
        this.money = money;
        this.description = description;
    }
}

// this class handles storing items into local storage
class Store {
    static getStor() {
        let stor;
        if (localStorage.getItem('stor') === null) {
            stor = [];
        } else {
            stor = JSON.parse(localStorage.getItem('stor'));
        }
        return stor;
    }

    static addToStor(storItem) {
        const stor = Store.getStor();
        stor.push(storItem);
        localStorage.setItem('stor', JSON.stringify(stor));
    }

    static removeFromStor(itemCode) {
        const stor = Store.getStor();
        stor.forEach((item, index) => {
            if (item.code === itemCode) {
                stor.splice(index, 1);
            }
        });
        localStorage.setItem('stor', JSON.stringify(stor));
    }
}

// this class handles storing profits into local storage
class ProfitList {
    static getProfitList() {
        let profit;
        if (localStorage.getItem('profit') === null) {
            profit = [];
        } else {
            profit = JSON.parse(localStorage.getItem('profit'));
        }
        return profit;
    }

    static addToProfitList(profit) {
        const profits = ProfitList.getProfitList();
        profits.push(profit);
        localStorage.setItem('profit', JSON.stringify(profits));
    }

    static removeFromProfit(itemCode) {
        const profits = ProfitList.getProfitList();
        profits.forEach((item, index) => {
            if (item.code === itemCode) {
                profits.splice(index, 1);
            }
        });
        localStorage.setItem('profit', JSON.stringify(profits));
    }
}

// this class handles UI tasks
class UI {
    static displayTables() {
        const stor = Store.getStor();
        stor.forEach(item => UI.addItemToStor(item));
        const profits = ProfitList.getProfitList();
        profits.forEach(profit => UI.addToProfitList(profit));
    }

    static addItemToStor(item) {
        const list = document.querySelector('#storage-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.code}</td>
            <td>${item.money}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static addToProfitList(profit) {
        const list = document.querySelector('#profit-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${profit.code}</td>
            <td>${profit.money}</td>
            <td>${profit.description}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>    
        `;
        list.appendChild(row);
    }

    static deleteItem(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields(){
        document.querySelector('#item-name').value = '';
        document.querySelector('#item-code-entery').value = '';
        document.querySelector('#money-paid').value = '';
        document.querySelector('#item-code').value = '';
        document.querySelector('#money-in').value = '';
        document.querySelector('#profit-amount').value = '';
        document.querySelector('#description').value = '';
    }
}

// Add Item
document.querySelector('#item-container').addEventListener('submit', el => {
    el.preventDefault();

    const name = document.querySelector('#item-name').value;
    const code = document.querySelector('#item-code-entery').value;
    const money = document.querySelector('#money-paid').value;

    if(name === '' || code === '' || money === ''){
        alert('Please Enter All Fields');
    }else {
        // instatiate an item
        const item = new Item(name, code, money);

        // add book to ui list
        UI.addItemToStor(item);
        
        // add to storage
        Store.addToStor(item);

        // clear fields
        UI.clearFields();
    }
}); 

// Remove Item
document.querySelector('#storage-list').addEventListener('click', el => {
    // remove from ui
    UI.deleteItem(el.target);

    // remove from storage
    Store.removeFromStor(el.target.parentElement.previousElementSibling.previousElementSibling.textContent);
});

// Remove from profit list
document.querySelector('#profit-list').addEventListener('click', el => {
    
    // remove from ui
    UI.deleteItem(el.target);
    

    // remove from storage
    ProfitList.removeFromProfit(el.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
});

// Event : display Storage List
document.addEventListener('DOMContentLoaded', UI.displayTables());

// catching the purchase input and storing it to the localStorage
document.querySelector('#purchase-container').addEventListener('submit', el => {
    el.preventDefault();
    const itemCode = document.querySelector('#item-code').value;
    const moneyIn = document.querySelector('#money-in').value;
    const description = '-'
    const stor = Store.getStor();
    const itemFound = stor.find(el => el.code === itemCode);
    const money = moneyIn - itemFound.money; 

    if(itemCode === '' || moneyIn === ''){
        alert('Please Enter All Fields');
    } else {
        const profit = new Profit(itemCode, money, description);

        // add purchase to UI
        UI.addToProfitList(profit);

        //add purchse to local storage
        ProfitList.addToProfitList(profit);

        //clear fields
        UI.clearFields();
    }
});

// catching the purchase input and storing it to the localStorage
document.querySelector('#profits-container').addEventListener('submit', el => {
    el.preventDefault();
    const itemCode = `${Date.now()}`;
    const money = document.querySelector('#profit-amount').value;
    const description = document.querySelector('#description').value;

    if(money === '' || description === ''){
        alert('Please Enter All Fields');
    } else {
        const profit = new Profit(itemCode, money, description);

        //add profit to UI
        UI.addToProfitList(profit);

        //add purchse to local storage
        ProfitList.addToProfitList(profit);

        //clear fields
        UI.clearFields();
    }
});



// Event : Show Purchase Form
document.querySelector('#purchase-button').addEventListener('click', () => {
    const form = document.querySelector('#purchase-container');
    if (form.classList.contains('d-none')) {
        form.classList.remove('d-none');
    } else {
        form.classList.add('d-none');
    }
});

// Event : Show Profit Form
document.querySelector('#profits-button').addEventListener('click', () => {
    const form = document.querySelector('#profits-container');
    if (form.classList.contains('d-none')) {
        form.classList.remove('d-none');
    } else {
        form.classList.add('d-none');
    }
});

// Event : Show Item Form
document.querySelector('#item-button').addEventListener('click', () => {
    const form = document.querySelector('#item-container');
    if (form.classList.contains('d-none')) {
        form.classList.remove('d-none');
    } else {
        form.classList.add('d-none');
    }
});

// Event : Show Tables
document.querySelector('#tables-button').addEventListener('click', () => {
    const div = document.querySelector('#tables-container');
    if (div.classList.contains('d-none')) {
        div.classList.remove('d-none');
    } else {
        div.classList.add('d-none');
    }
});

// Event : Make nav tabs tabable
// storage
const storageTab = document.querySelector('#nav-storage-tab');
storageTab.addEventListener('click', (e) => {
    const activeClass = document.querySelectorAll('.active');
    e.preventDefault();
    for (let i = 0; i < 2; i++) {
        activeClass[i].classList.remove('active');
    }
    activeClass[0].setAttribute('aria-selected', 'false');
    storageTab.classList.add('active');
    storageTab.setAttribute('aria-selected', 'true');
    activeClass[1].classList.remove('show');
    document.querySelector('#nav-storage').classList.add('show', 'active');
})
// profit
const profitTab = document.querySelector('#nav-profit-tab');
profitTab.addEventListener('click', (e) => {
    const activeClass = document.querySelectorAll('.active');
    e.preventDefault();
    for (let i = 0; i < 2; i++) {
        activeClass[i].classList.remove('active');
    }
    activeClass[0].setAttribute('aria-selected', 'false');
    profitTab.classList.add('active');
    profitTab.setAttribute('aria-selected', 'true');
    activeClass[1].classList.remove('show');
    document.querySelector('#nav-profit').classList.add('show', 'active');
});

// show profit
function sumProfits(){
    const profits = ProfitList.getProfitList();
    let totalProfits = profits.reduce((accum,item) => accum + parseInt(item.money), 0);
    return totalProfits;
}
document.querySelector('#main-event').innerHTML = `${sumProfits()}`;
