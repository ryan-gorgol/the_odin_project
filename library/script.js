//library array for book objects
let library = [];

if (localStorage.getItem("library")) {
  library = JSON.parse(localStorage.getItem("library"));
}

const tileContainer = document.getElementById("tilecontainer");

// book protoype
function book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = read;
}

renderLibrary();

// submit button action. onClick should create new DOM tile with user input displayed in newTile
const btnsubmit = document.getElementById("btnsubmit");

btnsubmit.addEventListener("click", createBook);

//function which removes the selected object from the array, and re-renders the DOM
function deleteBook(index) {
    library.splice(index, 1);
    var indexRemoval = localStorage.key(library.index);
    console.log(indexRemoval);
    renderLibrary();
}

// add a new book based on user input
function createBook() {
  const newBook = Object.create(book);

  newBook.title = document.getElementById("title").value;
  newBook.author = document.getElementById("author").value;
  newBook.read = getRadioValue();
  library.push(newBook);
  renderLibrary();

  localStorage.setItem("library", JSON.stringify(library));
}

// function which returns the selected radio button value
function getRadioValue() {
  var ele = document.getElementsByName("read");

  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) return ele[i].value;
  }
}

function newTile(title, author, read, index) {
  const newTileElement = document.createElement("div");

  tileContainer.appendChild(newTileElement);
  newTileElement.setAttribute("class", "tileRead");
  newTileElement.setAttribute("data-index", index);

  const titleElement = document.createElement("span");
  titleElement.setAttribute("class", "titleElement");
  titleElement.textContent = title;

  newTileElement.appendChild(titleElement);

  const authorElement = document.createElement("span");
  authorElement.setAttribute("class", "authorElement");
  authorElement.textContent = author;

  newTileElement.appendChild(authorElement);

  const readElement = document.createElement("span");
  readElement.setAttribute("class", "readElement");
  /*readElement.textContent = read */

  const deleteButton = document.createElement("button");

  deleteButton.setAttribute("class", "deletebtn");
  deleteButton.setAttribute("id", "deletebtn");
  deleteButton.setAttribute("data-index", index);
  deleteButton.textContent = "remove book";

  // remove button action.
  deleteButton.addEventListener("mouseup", () => {
    deleteBook(index);
  });

  newTileElement.appendChild(deleteButton);

  if (read === "read") {
    newTileElement.setAttribute("class", "tileRead");
  } else {
    newTileElement.setAttribute("class", "tileNotRead");
  }
}

// loop over library array and call newTile to render library
function renderLibrary() {
  //const tileContainer = document.getElementById('tilecontainer')
  while (tileContainer.firstChild) {
    tileContainer.removeChild(tileContainer.lastChild);
  }

  library.forEach((item, index) =>
    newTile(item.title, item.author, item.read, index)
  );
}

/* add static book1 data to the DOM. THIS ISN'T USEFUL, but atleast i know it works.
function tileData() {
    title1.innerHTML = (book1.title);
    author1.innerHTML = (book1.author);
    read1.innerHTML = (book1.read);
} */
