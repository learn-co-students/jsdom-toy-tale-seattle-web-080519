document.addEventListener('DOMContentLoaded', function() {
  getToys()
});

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const addToyForm = document.querySelector(".add-toy-form")
addToyForm.addEventListener("submit", postToy)

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

const apiUrl = "http://localhost:3000/toys"
// make a 'GET' request to fetch all the toy objects:

function getToys() {
  // GET function via fetch which does post, put, delete, patch;
  fetch(apiUrl)
    .then(response => response.json())
    .then(json => renderToys(json))
    .catch(err =>console.log(err));
    // any request should have '.catch'
};

function renderToys(toysAr) {
  console.log(toysAr)
  toysAr.forEach(toy => renderOneToy(toy))
};

function renderOneToy(toy) {
  const toyCollection = document.getElementById("toy-collection")
  // make a <div class="card"> for each toy:
  const toyCard = document.createElement('div');
  toyCard.setAttribute("class", "card");
// and add it to the toy-collection div:
  // h2 tag with the toy's name:
  const h2 = document.createElement('h2');
  h2.innerText = toy.name;
  // img tag with the src of the toy's image attribute and the class name "toy-avatar":
  const img = document.createElement('img')
  img.src = toy.image;
  img.setAttribute("class", "toy-avatar");
  // p tag with how many likes that toy has:
  const pLikes = document.createElement('p')
  pLikes.textContent = `Total Likes: ${toy.likes}`;
  // button tag with a class "like-btn":
  const button = document.createElement('button')
  button.setAttribute("class", "like-btn");
  button.textContent = "Like <3"
  button.addEventListener("click", ()=> patchLikes(toy, pLikes))
  // ()=> to prevent unusual behavior

  toyCard.appendChild(h2)
  toyCard.appendChild(img)
  toyCard.appendChild(pLikes)
  toyCard.appendChild(button)

  toyCollection.appendChild(toyCard)
};

// POST/creating a new toy:
function postToy(e) {
  console.log("postToy fires")
  e.preventDefault();
  // document.querySelector(".add-toy-form")
  // addBtn.addEventListener("submit", function(e) {
   
    const name = e.target.name.value;
    const image = e.target.image.value;
    const newToy = { name: name, image: image, likes: 0 };

  fetch(apiUrl, {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }, 
      body: JSON.stringify({ name: name, image: image, likes: 0 })
  })
    .then(response => response.json())
    .then(json => renderOneToy(json))
  }

function patchLikes(toy, pLikes) {
  // event.preventDefault();
  let newLikes = parseInt(pLikes.innerText.split(":")[1].trim(), 10)
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({"likes" : newLikes + 1})
  })
  .then(response => response.json())
  .then(json => {
    pLikes.innerText = `Total Likes: ${json.likes}`
    // console.log (newLike = json.likes);
  });
}
