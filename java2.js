const sizeCoffee = document.querySelector('.sizeCoffee'); // Размер кофе
const extraCoffee = document.querySelector('.extraCoffee'); // Сахар или молоко
const milkTypeCoffee = document.querySelector('.milkTypeCoffee'); // Размер кофе

const update = document.querySelector('.update'); // Наше окно order status
const silka = document.querySelector('.OS'); // Наша надпись Order Status
const priceForOrderAndBuy = document.querySelector('.priceForOrder'); // Наша надпись Order Status
const but_buy_price = document.querySelector('.but_buy_price'); // Кнопка покупки кофе
const textCoffeeOglavlenie = document.querySelector('.textCoffeeOglavlenie'); // Добавление названия кофе и описания
const couCof = document.querySelector(".countOrder"); // Кол-во заказаных кофе

let listOrder = [];

!localStorage.listOrder ? listOrder = [] : listOrder = JSON.parse(localStorage.getItem('listOrder')); 

const updateocsl = () => { 
    localStorage.setItem('listOrder', JSON.stringify(listOrder)); 
}

// count - сколько кофе заказали в OS
const cou_Coff = () => {
  let k = 0;
  listOrder.forEach(lis => {
    k += lis[4];
  })
  couCof.innerHTML = `<p>${k}</p>`;
}
cou_Coff();

// Распоковывание нашего заказа (Картинки, Имени, Цены)
const data = JSON.parse(localStorage.getItem('PossibleOrder'));
console.log(data);
let priceCoffee = data.Price;
let fixPrice = 0;
// Добавление названия и описания
textCoffeeOglavlenie.innerHTML = `<h1>${data.Name}</h1>
                <p>A single espresso shot poured into hot foamy milk, with the surface topped with mildly sweetened cocoa powder and drizzled with scrumptious caramel syrup.</p>`;
// Добавки добавленые в заказ
let ourCoffeeAdd = []

// Реализация добавок в кофе
const dopss = [
  [
    "SHORT",
    "TALL",
    "GRANDE",
    "VENTI"
  ],
  [
    "SUGAR",
    "MILK"
  ],
  [
    "OAT MILK",
    "SOY MILK",
    "ALMOND MILK"
  ]
]
let colorDopss = [
  [
    "rgb(211, 210, 210)",
    "rgb(211, 210, 210)",
    "rgb(211, 210, 210)",
    "rgb(211, 210, 210)"
  ],
  [
    "rgb(211, 210, 210)",
    "rgb(211, 210, 210)"
  ],
  [
    "rgb(211, 210, 210)",
    "rgb(211, 210, 210)",
    "rgb(211, 210, 210)"
  ]
]
const priceDopss = [
  [
    0,
    0,
    0,
    0
  ],
  [
    0,
    0
  ],
  [
    0,
    0,
    0
  ]
]
const realPriceDopss = [
  [
    50,
    60,
    70,
    100
  ],
  [
    200,
    250
  ],
  [
    300,
    400,
    500
  ]
]
const showAllViborOrder = () => {
  let s1 = ""; let s2 = ""; let s3 = "";
  let i = 0;
  dopss[0].forEach(element => { 
    s1 += `<button style="background-color:${colorDopss[0][i]};" class="but_vib_size" onclick="doppsCoffee('${element}', ${0}, ${i})">${element}</button>`;
    i++;
  });
  i = 0;
  dopss[1].forEach(element => {
    s2 += `<button style="background-color:${colorDopss[1][i]};" class="but_vib_extra" onclick="doppsCoffee('${element}', ${1}, ${i})">${element}</button>`;
    i++;
  });
  i = 0;
  dopss[2].forEach(element => {
    s3 += `<button style="background-color:${colorDopss[2][i]};" class="but_vib_milktype" onclick="doppsCoffee('${element}', ${2}, ${i})">${element}</button>`;
    i++;
  });

  sizeCoffee.innerHTML = s1;
  extraCoffee.innerHTML = s2;
  milkTypeCoffee.innerHTML = s3;

}
// Добавки
const doppsCoffee = (siz, j, i) => {
  let k = 0;
  colorDopss[j].forEach(element => {
    if (k == i){
      colorDopss[j][k] = "#AC8F64";
      priceDopss[j][k] = realPriceDopss[j][k];
    }
    else{
      colorDopss[j][k] = "rgb(211, 210, 210)";
      priceDopss[j][k] = 0;
    }
    k++;
  })
  showAllViborOrder();

  // Изменяем массив с добавками в кофе
  let p = 0;
  if (ourCoffeeAdd != null){
    k = 0;
    dopss.forEach(strok => {
      strok.forEach(na => {
        if (siz == na){ p = k; }
      })
      k++;
    })
    ourCoffeeAdd[p] = siz;
  }
  else{
    ourCoffeeAdd.push(siz);
  }

  console.log(ourCoffeeAdd);
  console.log(priceDopss)

  let yourPrice = 0; // Расчет цены без учета кол-ва
  priceDopss.forEach(elem => {
    elem.forEach(el => {
      yourPrice += el;
    })
  })
  fixPrice = priceCoffee + yourPrice;
  console.log(fixPrice)
  PriceOrderMade(1);
}
showAllViborOrder();


// Расчет чены по кол-ву кофе
const PriceOrderMade = (c) => {
  let yourPrice = fixPrice * c;
  console.log(yourPrice);
  let f = "";
  f += `
        <p>${yourPrice}р</p>
        <div class="countCoffee">
          <button class="minusCoffee" onclick="PriceOrderMade(${c - 1})">-</button>
          <p>${c}</p>
          <button class="plusCoffee" onclick="PriceOrderMade(${c + 1})">+</button>
        </div>`;
  priceForOrderAndBuy.innerHTML = f;
  but_buy_price.innerHTML = `<button onclick="addOrderInList(${yourPrice}, ${c})">Place Order</button>`;
}
PriceOrderMade(1);


// Добавление заказа в listOrder - localStorage 
const addOrderInList = (yourPrice,c) => {
  let ordered = [];
  let check = false;
  listOrder.forEach(elem => {
    if (elem[0] == data.Name){
      elem[4] += 1;
      check = true;
    }
  })

  if (!check){
    ordered.push(data.Name);
    ordered.push(data.Price);
    ordered.push(data.Im);
    ordered.push(yourPrice);
    ordered.push(c);
    listOrder.push(ordered);
  }
    updateocsl();
    console.log(listOrder);
}


// Открытие формы Order Status и Реализация добавления кофе в список заказов 
silka.addEventListener("click", () => {   
  updateTask();
}); 

const updateTask = () => {  
  update.classList.remove("close"); 
  update.classList.add("open"); 
  let s = ''; 
  s += `<div class="update_form"> 
      <div class="mainOreder">
        <h1>Order Status</h1>
        <a id="exithide" href="#" onclick="closeform()">HIDE</a>
      </div>
  </div>
  <div class="Ordered_Kitchen">
        <p>Ordered</p>
        <div class="SavedOrder">

        </div>
    </div>`;
  update.innerHTML = s;

  const savedOrder = document.querySelector('.SavedOrder');
  let s2 = '';
  listOrder.forEach(lis => {
    s2 += `<div class="CoffeYourOrder">
                <img src="${lis[2]}" alt="кофе">
                <p class="prco">${lis[0]}</p>
                <div class="countisto">
                  <p>${lis[4]}</p>
                </div>
            </div>`;
  })
  savedOrder.innerHTML = s2;
}; 

const closeform = () => {  
  update.classList.add("close"); 
  update.classList.remove("open"); 
};  