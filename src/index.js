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
    renderToy(toy)
  })
}

// form listener for new toy
function createFormListener() {
const form = document.querySelector('form')
 form.addEventListener('submit', function(e) { 
   e.preventDefault()
   console.log(e)
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
     //console.log(toy)
     renderToy(toy)
   })
 })
}

//render newly created toy
function renderToy(toy) {
const toyCollection = document.getElementById("toy-collection")
const toyElement = document.createElement('div')
  toyElement.className = 'card'
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const pTag = document.createElement('p')
  const btnTag = document.createElement('button')
  pTag.innerHTML = `${toy.likes} Likes` 
  btnTag.className = 'like-btn'
  btnTag.innerHTML = 'Like <3'
  btnTag.setAttribute("id", `${toy.id}`)
  btnTag.setAttribute( "onClick", "likeClicked(this.id)" )
  h2.innerHTML = toy.name
  img.src = toy.image
  toyElement.appendChild(h2)
  toyElement.appendChild(img)
  toyElement.appendChild(pTag)
  toyElement.appendChild(btnTag)
  console.log(toyElement)
  
  toyCollection.appendChild(toyElement)
}



//fetch all toys from server, GET
function lostToys() {
  let toysURL = "http://localhost:3000/toys"
  fetch(toysURL)
  .then(resp => resp.json())
  .then(json => {
    renderCards(json)
    allToys = json
  })
  
}

// display/render all toy cards divs that were fetched from lostToys() above
function renderCards(toys) {
  
  const toyCollection = document.getElementById("toy-collection")
  
  //iterate over json object, and create div card for each toy 
  toys.forEach(toy => {
    const toyElement = document.createElement('div')
    toyElement.className = 'card'
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const pTag = document.createElement('p')
    const btnTag = document.createElement('button')
    pTag.innerHTML = `${toy.likes} Likes` 
    btnTag.className = 'like-btn'
    btnTag.innerHTML = 'Like <3'
    //for likes assign each card a data-dash id = toy id
    btnTag.setAttribute("id", `${toy.id}`)
    btnTag.setAttribute( "onClick", "likeClicked(this.id)" )

    h2.innerHTML = toy.name
    img.src = toy.image
    toyElement.appendChild(h2)
    toyElement.appendChild(img)
    toyElement.appendChild(pTag)
    toyElement.appendChild(btnTag)
    
    toyCollection.appendChild(toyElement)
    //console.log(toyCollection)
  })

  //TODO function to handle div card creation
  function createToyCard(toy) {
    const toyElement = document.createElement('div')
    toyElement.className = 'card'

    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const pTag = document.createElement('p')
    const btnTag = document.createElement('button')
    pTag.innerHTML = `${toy.likes} Likes` 
    btnTag.className = 'like-btn'
    btnTag.innerHTML = 'Like <3'
  }




}