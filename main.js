const openShopping = document.querySelector(".openShopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");


if (openShopping && closeShopping) {
  openShopping.addEventListener("click", () => {
    body.classList.add("active");
  });

  closeShopping.addEventListener("click", () => {
    body.classList.remove("active");
  });
}


let products = [
    {
        id:1,
        name: "PRODUCT 1" ,
        images:"https://picsum.photos/200/300?grayscalehttps://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        price: 2000
    },
    {
        id:2,
        name: "PRODUCT 2" ,
        images:"https://picsum.photos/200/300?grayscale",
        price: 2000
    },
    {
        id:3,
        name: "PRODUCT 3" ,
        images:"https://picsum.photos/200/300?grayscale",
        price: 2000
    },
    {
        id:4,
        name: "PRODUCT 4" ,
        images:"https://picsum.photos/200/300?grayscale",
        price: 2000
    },
    {
        id:5,
        name: "PRODUCT 5" ,
        images:"https://picsum.photos/200/300?grayscale",
        price: 2000
    },
    {
        id:6,
        name: "PRODUCT 6" ,
        images:"https://picsum.photos/200/300?grayscale",
        price: 2000
    },
]

let listCards = [];


const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
          <img src="https://picsum.photos/200/300?grayscalehttps://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Product Image">
          <div class="title">${value.name}</div>
          <div class="price">${value.price.toLocaleString()}</div>
          <button onclick="addToCard(${key})">Add To Card</button>
        `;
        list.appendChild(newDiv);
      });
    };


    initApp()

    const  addToCard = (key) => {
      if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1
      }


      reloadCard();
    }

    const reloadCard = () => {
      listCard.innerHTML = "";
      let count = 0;
      let totalPrice = 0;
      quantity.innerText = count;
    
      listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
    
        if (value != null) {
          let newDiv = document.createElement("li");
          newDiv.innerHTML = `
            <div><img src="${value.images}"></div>
            <div class="cardTitle">${value.name}</div>
            <div class="cardPrice">${value.price.toLocaleString()}</div>
            <div>
              <button style="background-color: #560bad" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
              <div class="count">${count}</div>
              <button style="background-color: #560bad" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>
          `;
          listCard.appendChild(newDiv);
        }
    
        total.innerText = totalPrice.toLocaleString();
        quantity.innerText = count; 
      });
    };

    const changeQuantity = (key, quantity) => {
      if(quantity == 0){
        delete listCards[key]
      } 
      else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price
      }

      reloadCard()
    }