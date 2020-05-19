const GLOBAL_VARIABLE = "shopping list";

let itemsToBuy = [];
let editItemId = 0;
let editFirstItem;
let addButton;
let inputName;
let inputValue;
let tableWithItemsToBuy;
let form;
let burger;
let activeElements;
let imgProductsContainer;
let arabica;
let robusta;
let liberica;
let articles;
let imgChosenProduct;

let arabicaTab = [
  { name: "Caturra", imgAddress: "./images/caturra.png" },
  { name: "Pacamara", imgAddress: "./images/Pacamara.png" },
  { name: "Typica", imgAddress: "./images/typica.png" },
  { name: "Bourbon", imgAddress: "./images/Bourbon.png" },
  { name: "Pacas", imgAddress: "./images/Pacas.png" },
  { name: "Elefante", imgAddress: "./images/Elefante.png" },
];
let robustaTab = [
  { name: "India", imgAddress: "./images/india.png" },
  { name: "Uganda", imgAddress: "./images/uganda.png" },
  { name: "Zair", imgAddress: "./images/zair.png" },
];
let libericaTab = [
  { name: "Liberia", imgAddress: "./images/liberia.png" },
  { name: "Indonezia", imgAddress: "./images/indonezia.png" },
];
let articlesTab = [
  { name: "Filiżanka porcelana", imgAddress: "./images/filizanka1280.jpg" },
  { name: "Zestaw porcelany", imgAddress: "./images/zestaw.jpg" },
  { name: "Zestaw dla dwojga", imgAddress: "./images/zestawZCzajniczkiem.jpg" },
];

window.onload = () => {
  bindDom();
  addEventsToButtons();
  getFromLocalStorage();
  clearInputs(inputName, inputValue);
};

function bindDom() {
  addButton = document.getElementById("buttonAdd");
  inputName = document.getElementById("name");
  inputValue = document.getElementById("quantity");
  tableWithItemsToBuy = document.getElementsByTagName("tbody")[0];
  form = document.getElementsByTagName("form")[0];
  burger = document.querySelector(".burger");
  activeElements = document.querySelectorAll(".active");
  imgProductsContainer = document.querySelector(".imgProductsContainer");
  arabica = document.querySelector("#sliderPhoto1");
  robusta = document.querySelector("#sliderPhoto2");
  liberica = document.querySelector("#sliderPhoto3");
  articles = document.querySelector("#sliderPhoto4");
  imgChosenProduct = document.querySelector(".imgChosenProduct");
}

function createTableWithProducts(tab) {
  let photoClicked = event.target.getAttribute("value");
  let articleTitle = document.createElement("div");
  articleTitle.setAttribute("class", "titleCont");
  articleTitle.innerText = photoClicked;
  imgProductsContainer.appendChild(articleTitle);
  let photosContainer = document.createElement("div");
  photosContainer.setAttribute("class", "photosContainer");
  tab.forEach((element) => {
    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "mainDiv");
    let newName = document.createElement("p");
    newName.innerText = element.name;
    mainDiv.appendChild(newName);
    let imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "productImgDiv");
    let newImg = document.createElement("img");
    newImg.src = element.imgAddress;
    imgDiv.appendChild(newImg);
    mainDiv.appendChild(imgDiv);
    let addButton = document.createElement("button");
    addButton.innerText = "Dodaj do koszyka";
    addButton.setAttribute("name", element.name);
    addButton.setAttribute("imgUrl", element.imgAddress);
    addButton.addEventListener("click", openModal);
    mainDiv.appendChild(addButton);
    photosContainer.appendChild(mainDiv);
  });
  imgProductsContainer.appendChild(photosContainer);
  function openModal() {
    document.querySelector(".modal-wrap").classList.add("active");
    document.querySelector(".mainSection").classList.add("blur");
    let imgProduct = event.target.getAttribute("imgUrl");
    let nameProduct = event.target.getAttribute("name");
    imgChosenProduct.src = imgProduct;
    inputName.value = nameProduct;
    document.querySelector("span.hide").addEventListener("click", function () {
      document.querySelector(".modal-wrap").classList.remove("active");
      document.querySelector(".mainSection").classList.remove("blur");
    });
  }
}

function sendIdToEdit(element) {
  let idItemToEdit = parseInt(element.target.getAttribute("id"));
  let edit;
  if (idItemToEdit === 0) {
    editFirstItem = idItemToEdit;
    edit = itemsToBuy[0];
  } else {
    editItemId = idItemToEdit;
    edit = itemsToBuy[editItemId];
  }
  inputName.value = edit.productName;
  inputValue.value = edit.productQuantity;
}
function getTab(tab) {
  imgProductsContainer.innerHTML = [];
  createTableWithProducts(tab);
}
function addEventsToButtons() {
  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    let nameValue = inputName.value;
    let quantityValue = inputValue.value;
    if (isImputEmpty(nameValue, quantityValue)) {
      alert("Podaj nazwę i ilość produktu, aby dodać go do koszyka");
      return;
    }
    if (editItemId === 0 && editFirstItem === undefined) {
      createObject(itemsToBuy, nameValue, quantityValue);
    } else if (editFirstItem !== undefined) {
      editObject(itemsToBuy, 0);
    } else {
      editObject(itemsToBuy, editItemId);
    }
    addElementToLocalStorage(itemsToBuy);
    clearTable(tableWithItemsToBuy);
    createTable(tableWithItemsToBuy, itemsToBuy);
    clearInputs(inputName, inputValue);
  });

  arabica.addEventListener("click", (event) => {
    event.preventDefault();
    getTab(arabicaTab);
  });
  robusta.addEventListener("click", (event) => {
    event.preventDefault();
    getTab(robustaTab);
  });
  liberica.addEventListener("click", (event) => {
    event.preventDefault();
    getTab(libericaTab);
  });
  articles.addEventListener("click", (event) => {
    event.preventDefault();
    getTab(articlesTab);
  });
  burger.addEventListener("click", (event) => {
    event.preventDefault();
    activeElements.forEach((element) => {
      element.classList.toggle("off");
    });
  });
}

function removeItem(element) {
  let idItemToRemove = parseInt(element.target.getAttribute("id")); // rzutuje stringa na numbera
  removeFromArray(itemsToBuy, idItemToRemove);
  addElementToLocalStorage(itemsToBuy);
  clearTable(tableWithItemsToBuy);
  createTable(tableWithItemsToBuy, itemsToBuy);
}
function addElementToLocalStorage(tab) {
  let obj = JSON.stringify(tab);
  localStorage.setItem(GLOBAL_VARIABLE, obj);
}

function getFromLocalStorage() {
  const dataFromLocalStorage = localStorage.getItem(GLOBAL_VARIABLE);
  if (dataFromLocalStorage != null && dataFromLocalStorage.length >= 1) {
    itemsToBuy = JSON.parse(dataFromLocalStorage); //parsujemy elementy z stringu do obiektow JS
    alert("Masz " + itemsToBuy.length + " elementy w koszyku");
    createTable(tableWithItemsToBuy, itemsToBuy);
  } else {
    alert("Brak zakupów w koszyku");
  }
}
function createTable(tbody, items) {
  items.forEach((element, index) => {
    function createTd(value) {
      let newTd = document.createElement("td");
      newTd.innerText = value;
      tr.appendChild(newTd);
    }
    let indexButton = index + 1;
    let tr = document.createElement("tr");
    createTd(element.productName);
    createTd(element.productQuantity);
    createTd(indexButton);
    let tdDel = document.createElement("td");
    tdDel.setAttribute("class", "tdButtons");
    let btnEdit = document.createElement("button");
    btnEdit.innerText = "Edytuj";
    btnEdit.setAttribute("id", index);
    btnEdit.addEventListener("click", sendIdToEdit);
    tdDel.appendChild(btnEdit);
    let btnDelete = document.createElement("button");
    btnDelete.innerText = "Usuń";
    btnDelete.setAttribute("id", index);
    btnDelete.addEventListener("click", removeItem);
    tdDel.appendChild(btnDelete);
    tr.appendChild(tdDel);
    tbody.appendChild(tr);
  });
}
function createObject(tab, productName, productQuantity) {
  let obj = {
    productName: productName,
    productQuantity: productQuantity,
  };
  tab.push(obj);
}
function editObject(tab, id) {
  let elementToEdit = tab.find((element) => tab.indexOf(element) === id);
  elementToEdit.productName = inputName.value;
  elementToEdit.productQuantity = inputValue.value;
  editItemId = 0;
  editFirstItem = undefined;
}

function clearInputs(name, quantity) {
  name.value = "";
  quantity.value = "";
}

function removeFromArray(tab, el) {
  tab.splice(el, 1);
}
function clearTable(tab) {
  tab.innerHTML = "";
}
function isImputEmpty(productName, productQuantity) {
  return productName == "" || productQuantity == "";
}
