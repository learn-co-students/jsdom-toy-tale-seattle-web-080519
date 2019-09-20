const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
const mainUrl = 'http://localhost:3000/toys'


fetch(mainUrl)
  .then(resp => resp.json())
  .then(data => showToys(data))

function showToys(lostToys) {
  lostToys.map(toy =>addCard(toy));
};

function addCard(data) {
  const toyCollectionDiv = document.querySelector('#toy-collection');
  toyCollectionDiv.className = "card";
  
  const name = document.createElement("p");
  name.textContent = data.name;

  const img = document.createElement("img");
  img.src = data.image;
  img.className = "toy-avatar"

  const likes = document.createElement("p");
  likes.id = data.id
  
    if (data.likes <= 1) {
      likes.textContent = data.likes + " Like";
    } else {
      likes.textContent = data.likes + " Likes"
    }

  const likeButton = document.createElement("button");
  likeButton.className = "like-btn"
  likeButton.textContent = "Like"

  toyCollectionDiv.appendChild( name )
  toyCollectionDiv.appendChild( img )
  toyCollectionDiv.appendChild( likes )
  toyCollectionDiv.appendChild( likeButton )

  likeButton.addEventListener("click", () =>addLike(data))
};

function addLike(data) {
  data.likes += 1

  fetch(`${mainUrl}/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ likes: data.likes })
  })
  .then(resp => resp.json())
  .then(data => updateCardLike(data))
};

function updateCardLike(data) {
  let likenum = document.getElementById(data.id)
  if (data.likes <= 1) {
    likenum.textContent = data.likes + " Like";
  } else {
    likenum.textContent = data.likes + " Likes"
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
      .then(data => addCard(data))
  })
}

// function showLikes(parent, toy) {
  
//   parent.addEventListener("click", (e) => {
//     let parent = document.querySelector(".like-btn");
//     e.preventDefault()
    

// }

// showLikes();