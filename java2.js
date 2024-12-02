const sizeCoffee = document.querySelector('.sizeCoffee'); // Размер кофе
const extraCoffee = document.querySelector('.extraCoffee'); // Сахар или молоко
const milkTypeCoffee = document.querySelector('.milkTypeCoffee'); // Размер кофе

const update = document.querySelector('.update'); // Наше окно order status
const silka = document.querySelector('.OS'); // Наша надпись Order Status

// Распоковывание нашего заказа (Картинки, Имени, Цены)
const data = JSON.parse(localStorage.getItem('PossibleOrder'));
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
      if (j == 0){ priceDopss[j][k] = 100; }
      else if (j == 1){ priceDopss[j][k] = 200; }
      else{ priceDopss[j][k] = 150; }
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
}
showAllViborOrder();

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
  </div>`
  update.innerHTML = s; 
}; 

const closeform = () => {  
  update.classList.add("close"); 
  update.classList.remove("open"); 
};  