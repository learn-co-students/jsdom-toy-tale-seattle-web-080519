const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
const mainUrl = 'http://localhost:3000/toys'
const TOY_COLLECTION_DIV = document.querySelector('#toy-collection');

fetch(mainUrl)
  .then(resp => resp.json())
  .then(data => showToys(data))

function showToys(lostToys) {
  lostToys.map(toy =>displayCard(toy));
};

function displayCard(toy) {
  const newDiv = document.createElement("div");
  newDiv.className = "card";
  newDiv.id = `card${toy.id}`;

  const name = document.createElement("p");
  name.textContent = toy.name;

  const likes = document.createElement("p");
  likes.className = "likes";
  if (toy.likes <= 1) {
    likes.textContent = toy.likes + " Like";
  } else {
    likes.textContent = toy.likes + " Likes"
  }

  const img = document.createElement("img");
  img.className = "toy-avatar";
  img.src = toy.image;

  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.textContent = "Like";
  likeButton.addEventListener("click", () => addLike(toy))

  TOY_COLLECTION_DIV.appendChild( newDiv )
  newDiv.appendChild( name )
  newDiv.appendChild( img )
  newDiv.appendChild( likes )
  newDiv.appendChild( likeButton )
};

function addLike(toy, event) {
  fetch(`${mainUrl}/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ likes: toy.likes += 1 })
  })
  .then(resp => resp.json())
  .then(data => updateCardLike(data));
};

function updateCardLike(toy) {
  let likenum = document.querySelector(`#card${toy.id} .likes`)
  if (toy.likes <= 1) {
    likenum.textContent = toy.likes + " Like";
  } else {
    likenum.textContent = toy.likes + " Likes"
  }
};

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
  showForm()
});

function showForm() {
  document
    .querySelector(".add-toy-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      const name = e.target.name.value;
      const image = e.target.image.value;
      const likes = 0
      const newToy = {name, image, likes};

      fetch(mainUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newToy)
      })
      .then(resp => resp.json())
      .then(data => displayCard(data))
  })
}
