let addToy = false;

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
     //lostToys()
   })
 })
}

//function renderToy(toy) {
//const toyCollection = document.getElementById("toy-collection")
//const toyElement = document.createElement('div')
//  toyElement.className = 'card'
//  const h2 = document.createElement('h2')
//  const img = document.createElement('img')
//  const pTag = document.createElement('p')
//  const btnTag = document.createElement('button')
//  pTag.innerHTML = `${toy.likes} Likes` 
//  btnTag.className = 'like-btn'
//  btnTag.innerHTML = 'Like <3'
//  h2.innerHTML = toy.name
//  img.src = toy.image
//  toyElement.appendChild(h2)
//  toyElement.appendChild(img)
//  toyElement.appendChild(pTag)
//  toyElement.appendChild(btnTag)
//  
//  toyCollection.appendChild(toyElement)
//}




function lostToys() {
  let toysURL = "http://localhost:3000/toys"
  fetch(toysURL)
  .then(resp => resp.json())
  .then(json => renderCards(json))
}
function renderCards(toys) {
  const toyCollection = document.getElementById("toy-collection")
  
  
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

    h2.innerHTML = toy.name
    img.src = toy.image
    toyElement.appendChild(h2)
    toyElement.appendChild(img)
    toyElement.appendChild(pTag)
    toyElement.appendChild(btnTag)
    
    toyCollection.appendChild(toyElement)
    //console.log(toyCollection)
  })




}