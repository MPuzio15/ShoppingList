// 1.Stwórz stronę “Lista zakupów”, strona powinna zawierać:
// a.formularz na wprowadzanie danych (nazwa, ilość) oraz przycisk “dodaj”
// b.tabelkę z przedmiotami do kupienia z przyciskami do edycji i usuwania przedmiotów

// 2.Napisz funkcję do generowania unikalnego ID dla przedmiotu


// 3.Po naciśnięciu przycisku dodaj, pobierz dane z formularza i dodaj je do localstorage, 
// oraz odśwież listę zakupów

document.addEventListener("DOMContentLoaded", function(){
    const addButton = document.getElementById("buttonAdd");
    const tBody = document.getElementsByTagName("tbody")[0];
    
    addButton.addEventListener("click", add);
    function add(event){
        event.preventDefault();
        var tr = document.createElement("tr");
        const td1 = document.createElement("td")
        const td2 = document.createElement("td")
        td1.innerText(tdNameValue.value);
        td2.innerText(tdQuantityValue);
        const tdNameValue = document.getElementById("name");
        const tdQuantityValue = document.getElementById("quantity");
        
        tr.appendChild(td1);
        tr.appendChild(td2);
    }
}

// 4.Zaimplementuj funkcjonalność usuwania i edycji

// 5.Wykorzystaj localstorage do zapewnienia trwałości danych

// document.addEventListener("DOMContentLoaded", function() {
//   const list = document.getElementById("lista");
//   const collection = list.getElementsByTagName("li"); //pobieramy wszystkie li z listy
//   const tab = [...collection];
//   console.log(tab.length); //wypisuje sobie ilość elementów w kolekcji

//   tab.forEach(li => {
//     li.addEventListener("click", function przekresl() {
//       li.style.textDecoration = "line-through";
//     });
//   });

// // lub    for (let i=0; i<tablicaZKolekcji.length; i++) {     //pętla po wszystkich li
// //         li[i].style.textDecoration = "line-through";

//   let button = document.getElementById("dodaj");
//   let input = document.querySelector("input");
//   button.addEventListener("click", add);
//   function add() {
//     let newLi = document.createElement("li");
//     let liValue = input.value;
//     newLi.innerText = liValue;
//     list.appendChild(newLi);
//   }
// });