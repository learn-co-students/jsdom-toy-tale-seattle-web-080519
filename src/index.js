let addToy = false;
const toyUrl = "http://localhost:3000/toys";
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  getToys();
  const form = document.getElementsByClassName("add-toy-form")[0];
  form.addEventListener("submit", postAToy);
});

function postAToy(event) {
  event.preventDefault();
  console.log("postAToy fires");
  const input = document.getElementsByClassName("input-text");
  const inputtedName = input[0].value;
  const inputtedUrl = input[1].value;
  fetch(toyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: inputtedName,
      image: inputtedUrl,
      likes: 0
    })
  })
    .then(res => res.json())
    .then(res => appendOneToy(res))
    .catch(err => console.log(err));
}

function getToys() {
  fetch(toyUrl)
    .then(res => res.json())
    // .then(res => console.log(res))
    .then(res => loopThroughToys(res))
    .catch(err => console.log(err));
}

function loopThroughToys(toys) {
  toys.forEach(toy => appendOneToy(toy));
}

function appendOneToy(toy) {
  const toyCollectionDiv = document.getElementById("toy-collection");

  const div = document.createElement("div");
  div.setAttribute("class", "card");

  const h2Name = document.createElement("h2");
  h2Name.innerText = toy.name;

  const img = document.createElement("img");
  img.setAttribute("src", toy.image);
  img.setAttribute("class", "toy-avatar");

  const pLikes = document.createElement("p");
  pLikes.innerText = `${toy.likes} Likes`;

  const likesBtn = document.createElement("button");
  likesBtn.innerText = "Like <3";
  likesBtn.setAttribute("class", "like-btn");
  likesBtn.addEventListener("click", () => likeFunction(toy, pLikes));

  div.appendChild(h2Name);
  div.appendChild(img);
  div.appendChild(pLikes);
  div.appendChild(likesBtn);

  toyCollectionDiv.appendChild(div);
}

function likeFunction(toy, pLikes) {
  const nextLikes = parseInt(pLikes.innerText, 10) + 1;
  const currentId = toy.id;
  console.log("like f fires");
  fetch(`${toyUrl}/${currentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: nextLikes
    })
  })
    .then(toy => {
      pLikes.innerText = `${nextLikes} Likes`;
      toy.likes = nextLikes;
    })
    .catch(err => console.log(err));
}
