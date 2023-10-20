import { menuArray } from './data.js'
// Render Meals List 
const itemsArea = document.getElementById('items');
function renderItemList(dataArr) {
    return dataArr.map(function(itemData){
        return `  <div class="item">
                    <div class="item-image">
                        <span>${itemData.emoji}</span>

                    </div>
                    <div class="item-details">
                        <h2 class="item-name">${itemData.name}</h2>
                        <p class="item-description">${itemData.ingredients}</p>
                        <p class="item-price">$${itemData.price}</p>
                    </div>
                    <div class="add-buttons" id='${itemData.id}'>
                        <a href="#">+</a>
                    </div>
                </div>`
    }).join('');
}
itemsArea.innerHTML = renderItemList(menuArray);

// Add Buttons Functionality
const addBtn = [...document.getElementsByClassName('add-buttons')];
const orderItems = document.getElementById('order-items');
const totalPrice = document.getElementById('price');
let orderListArr = [];

addBtn.forEach((e) => {
    e.addEventListener('click',function() {
        let id = e.getAttribute('id');
        for (let i = 0; i < menuArray.length;i++)
        { 
            if (menuArray[i].id == id) orderListArr.push(menuArray[i]);
        }
    
        renderOrderList(orderListArr);
    })
});

// render Order List Functionality
function renderOrderList(orderListArr)
{
    orderItems.innerHTML = '';
    let total = 0;
    orderListArr.forEach((item) => {
        orderItems.innerHTML +=
                                `<div class="order-item">         
                                    <p>${item.name}<small class = "remove-btn" id="${item.id}"><a href='#'>remove</a></small></p>
                                    <p class="price">$${item.price}</p>
                                </div>`;
        total += item.price;
        
    })
    totalPrice.textContent = "$" + total;

    removeFun();
    
}
// Remove buttons 
function removeFun(){
    const removeBtn  = [...document.getElementsByClassName('remove-btn')];

    removeBtn.forEach((e) => {
        e.addEventListener('click',function() {
            let id = e.getAttribute('id');
            for (let i = 0; i < orderListArr.length;i++)
            { 
                if (orderListArr[i].id == id) {
                    
                    orderListArr.splice(i, 1);
                    
                        break;
                }
            }
            renderOrderList(orderListArr);
        })
    });
}


const orderBtn = document.getElementById('order-btn');
const payBtn =document.getElementById('pay-btn');
const paymentWindow = document.getElementById('payment-data');
const closeArea = document.getElementById('close-area');
const thanksMassage= document.getElementById('thanks-massage');
const orderDiv = document.getElementById('order');
orderBtn.addEventListener('click',function(){
    paymentWindow.style.display = 'block';
    closeArea.style.display = 'block';
})
closeArea.addEventListener('click',() => {
    paymentWindow.style.display = 'none';
    closeArea.style.display = 'none';
})
payBtn.addEventListener('click',function(e){
    
    const clientName = document.getElementById('name-input').value;
    const thanksPragraph = document.getElementById('thnks-pragraph');
    thanksPragraph.textContent = `Thanks, ${clientName}! Your order is on its way!`
    thanksMassage.style.display ='flex';

    orderDiv.style.display = 'none'
    paymentWindow.style.display = 'none';
    closeArea.style.display = 'none';
    setTimeout(() => {
        orderListArr = [];
        thanksMassage.style.display ='none';
        orderDiv.style.display = 'block'
        renderOrderList(orderListArr);
    }, 1000);
    
})