const sizeCoffee = document.querySelector('.sizeCoffee'); // Размер кофе
const extraCoffee = document.querySelector('.extraCoffee'); // Сахар или молоко
const milkTypeCoffee = document.querySelector('.milkTypeCoffee'); // Размер кофе

const update = document.querySelector('.update'); // Наше окно order status
const silka = document.querySelector('.OS'); // Наша надпись Order Status

// Распоковывание нашего заказа
const data = JSON.parse(localStorage.getItem('PossibleOrder'));

const SIZE = [
  "SHORT",
  "TALL",
  "GRANDE",
  "VENTI"
]
const EXTRA = [
  "SUGAR",
  "MILK"
]
const MILKTYPE = [
  "OAT MILK",
  "SOY MILK",
  "ALMOND MILK"
]
const showAllViborOrder = () => {
  let s1 = ""; let s2 = ""; let s3 = "";
  let i = 0;
  SIZE.forEach(element => {
    s1 += `<button class="but_vib" onclick="viborSizeCoffee(${SIZE[i]})">${SIZE[i]}</button>`;
    i++;
  });
  i = 0;
  EXTRA.forEach(element => {
    s2 += `<button class="but_vib" onclick="viborExtraCoffee(${EXTRA[i]})">${EXTRA[i]}</button>`;
    i++;
  });
  i = 0;
  EXTRA.forEach(element => {
    s3 += `<button class="but_vib" onclick="viborMilkTypeCoffee(${MILKTYPE[i]})">${MILKTYPE[i]}</button>`;
    i++;
  });

  sizeCoffee.innerHTML = s1;
  extraCoffee.innerHTML = s2;
  milkTypeCoffee.innerHTML = s3;

}
// Добавки
const viborSizeCoffee = (siz) => {

}
const viborExtraCoffee = (ext) => {

}
const viborMilkTypeCoffee = (mil) => {

}






showAllViborOrder();

// Открытие формы Order Status

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