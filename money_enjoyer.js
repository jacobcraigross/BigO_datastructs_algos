// All the DOM elements we need to latch on to for manipulation. 
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// Data coming from the external API gets housed here. 
let data = [];

// the function to take the JSON object data from the API and create formatted HTML elements out of it. 
function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    // for only one parameter, you dont need the extra surrounding parantheses. ((item) => {})
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// the function that handles that data from the API and pushes it into the DOM. 
function addData(obj) {
    data.push(obj);
    updateDOM();
}

// the async await function that FETCHES our data/users. 
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`, 
        money: Math.floor(Math.random() * 2000000)
    };
    // the function for this is declared above, on line 13
    addData(newUser);
}

// pre-populating the page with 5 rich mother fuckers. 
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();


// event listeners for all the buttons 
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);

// formatting the money correctly via REGEX
function formatMoney(number) {
    return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// prepping the functionality for when the double money button is clicked. map() method.  
function doubleMoney() {
 data = data.map(user => {
     return {...user, money: user.money * 2};
 })
 updateDOM();
}

// prepping the functionality for when the sort by richest button is clicked. sort() method
function sortByRichest() {
    // since these are objects, we have to (b.money - a.money), we cannot just do (b - a)
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

// prepping the functionality for showing only millionaires. filter() method.
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}
