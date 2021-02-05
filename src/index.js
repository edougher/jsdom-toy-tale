let addToy = false;
let allToys = []

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  lostToys()
  createFormListener() 
});

//handle LIKE button event
function likeClicked(clicked_id) {
 const toysURL = "http://localhost:3000/toys/" + `${clicked_id}`
 //get the current from global var 'allToys[]'
 //could also retrieve from 'pTag.innerHTML' -->createToy()
 let toylikes = allToys.find(x => x.id == clicked_id).likes

 let newValue = {
   "likes": toylikes + 1
 }
  const reqObj = {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(newValue)
  }

  fetch(toysURL, reqObj)
  .then(resp => resp.json())
  .then(toy => {
    console.log(toy)
    //TODO display update to LIKES pTag
    createToyCard(toy)
  })
}

//form listener for new toy
function createFormListener() {
const form = document.querySelector('form')
 form.addEventListener('submit', function(e) { 
   e.preventDefault()
   //create new toy to POST from form.event.target
   const newToy = {
     name: e.target['name'].value,
     image: e.target['image'].value,
   }
   const reqObj = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(newToy)
    }

   fetch('http://localhost:3000/toys', reqObj)
   .then((resp) => resp.json())
   .then(toy => {
     form.reset()
     //TODO get new card to appear
     createToyCard(toy)
   })
 })
}

//fetch all toys from server, GET
function lostToys() {
  let toysURL = "http://localhost:3000/toys"
  fetch(toysURL)
  .then(resp => resp.json())
  .then(json => {
    renderCards(json)
    //assign json respose to global var
    allToys = json
  })
  
}

// display/render all toy cards that were fetched from lostToys() above
function renderCards(toys) {
  //iterate over json object, and create div card for each toy 
  toys.forEach(toy => {
    //-->createCard.js
   createToyCard(toy)
  })
}