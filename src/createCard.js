//TODO function to handle div card creation
function createToyCard(toy) {
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
    //assign btn id = toy id
    btnTag.setAttribute("id", `${toy.id}`)
    //assign onClick attr to likeCliked() which is a function
    btnTag.setAttribute( "onClick", "likeClicked(this.id)" )

    h2.innerHTML = toy.name
    img.src = toy.image
    toyElement.appendChild(h2)
    toyElement.appendChild(img)
    toyElement.appendChild(pTag)
    toyElement.appendChild(btnTag)
    
    toyCollection.appendChild(toyElement)
  }