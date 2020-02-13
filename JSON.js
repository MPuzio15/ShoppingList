const GLOBAL_VARIABLE = "shopping list"; //przechowuje klucz z localStorage
window.onload = () => {
  let itemsToBuy = [];
  let editItemId = 0;

  const addButton = document.getElementById("buttonAdd");
  const input1 = document.getElementById("name");
  const input2 = document.getElementById("quantity");
  const tableWithItemsToBuy = document.getElementsByTagName("tbody")[0];
  const form = document.getElementsByTagName("form")[0];
  // po to zeby nam sie nie odswiezala strona
  form.onsubmit = newElement => {
    newElement.preventDefault();
  };

  const dataFromLocalStorage = localStorage.getItem(GLOBAL_VARIABLE);
  if (dataFromLocalStorage != null && dataFromLocalStorage.length > 1) {
    itemsToBuy = JSON.parse(dataFromLocalStorage); //parsujemy elementy z stringu do obiektow JS
    alert("Masz " + itemsToBuy.length + " elementy w koszyku");
    createTable(tableWithItemsToBuy, itemsToBuy);
  } else {
    alert("Brak zakupów w koszyku");
  }
  addButton.addEventListener("click", () => {
    debugger;
    let nameValue = input1.value;
    let quantityValue = input2.value;
    console.log(nameValue, quantityValue);

    if (isImputEmpty(nameValue, quantityValue)) {
      alert("Podaj nazwę i ilość produktu, aby dodać go do koszyka");
      return;
    }
    
    if (editItemId === 0) {
      createObject(itemsToBuy, nameValue, quantityValue);
    } else {
      editObject(itemsToBuy, editItemId);
    }
    addElementToLocalStorage(itemsToBuy);
    clearTable(tableWithItemsToBuy);
    createTable(tableWithItemsToBuy, itemsToBuy);
    clearInputs(input1, input2);
  });

  function clearInputs(name, quantity) {
    name.value = "";
    quantity.value = "";
  }

  function createTable(tbody, items) {
    items.forEach((element, index) => {
      var tr = document.createElement("tr");
      const valueTd = document.createElement("td");
      valueTd.innerText = element.productName;
      tr.appendChild(valueTd);
      const qtyTd = document.createElement("td");
      qtyTd.innerText = element.productQuantity; // wlasciwosc, property
      tr.appendChild(qtyTd);
      let tdId = document.createElement("td");
      tdId.innerText = index + 1;
      tr.appendChild(tdId);
      let tdDel = document.createElement("td");
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

  //sprawdzamy czy inputy sa puste
  function isImputEmpty(productName, productQuantity) {
    return productName == "" || productQuantity == "";
  }

  //tworzymy nowy obiekt
  function createObject(tab, productName, productQuantity) {
    let obj = {
      productName: productName,
      productQuantity: productQuantity
    };
    tab.push(obj);
  }
  function editObject(tab, id) {
    debugger;
    var elementToEdit = tab.find(element => tab.indexOf(element) === id);
    elementToEdit.productName = input1.value;
    elementToEdit.productQuantity = input2.value;
  }

  function sendIdToEdit(element) {
    let idItemToEdit = parseInt(element.target.getAttribute("id"));
    editItemId = idItemToEdit;
    console.log(editItemId);
    var edit = itemsToBuy[editItemId];
    input1.value = edit.productName;
    input2.value = edit.productQuantity;
  }
  // dodajemy obiekt do localStorage:
  function addElementToLocalStorage(tab) {
    let obj = JSON.stringify(tab);
    localStorage.setItem(GLOBAL_VARIABLE, obj);
  }
  //usuwamy element z listy za pomocą przycisku Delete

  function removeItem(element) {
    let idItemToRemove = parseInt(element.target.getAttribute("id")); // rzutuje stringa na numbera
    removeFromArray(itemsToBuy, idItemToRemove);
    addElementToLocalStorage(itemsToBuy);
    clearTable(tableWithItemsToBuy);
    createTable(tableWithItemsToBuy, itemsToBuy);
  }
};



function removeFromArray(tab, el) {
  tab.splice(el, 1);
}

function clearTable(tab) {
  tab.innerHTML = ""; //aktualizujemy cala talice, nie tylko text!
}
