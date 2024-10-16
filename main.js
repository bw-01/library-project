const myLibrary = [];

//Book class
class Book {
  #pages = 0; //use # to set to private so property can't be changed

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.#pages = pages;
    this.read = read;
  }

  //getter is required to access a private property
  get pages() {
    return this.#pages;
  }

  get info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read} read yet`;
  }
}

//Add books to the library array
myLibrary.push(new Book("1984", "George Orwell", 328, "Yes"));
myLibrary.push(new Book("To Kill a Mockingbird", "Harper Lee", 281, "No"));
let book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, "Yes");
myLibrary.push(book1);

//Clears the books table so it can be updated
function clearTable() {
  const libraryTable = document.querySelector(".library-table");
  libraryTable.innerHTML = `
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Read(?)</th>
            <th>Delete Book</th>
            <th>Toggle Read</th>
        </tr>
    `;
}

//Delete a book
function deleteBook(index) {
  myLibrary.splice(index, 1);
  listBooks();
}

//Update the read status to the opposite option
function updateRead(index) {
  myLibrary[index].read = myLibrary[index].read === "Yes" ? "No" : "Yes";
  listBooks();
}

//Fills the table with books from the library array
function listBooks() {
  clearTable();
  const libraryTable = document.querySelector(".library-table");

  myLibrary.forEach((book, index) => {
    const row = libraryTable.insertRow();

    const titleCell = row.insertCell();
    titleCell.textContent = book.title;

    const authorCell = row.insertCell();
    authorCell.textContent = book.author;

    const pagesCell = row.insertCell();
    pagesCell.textContent = book.pages;

    const readCell = row.insertCell();
    readCell.textContent = book.read;

    const deleteCell = row.insertCell();
    deleteCell.classList.add("delete-cell");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function () {
      deleteBook(index);
    });
    deleteCell.appendChild(deleteButton);

    const readToggle = row.insertCell();
    readToggle.classList.add("read-toggle");
    const readButton = document.createElement("button");
    readButton.textContent = "Read";
    readButton.classList.add("read-button");
    readButton.addEventListener("click", function () {
      updateRead(index);
    });
    readToggle.appendChild(readButton);
  });
}

listBooks();

const newBookButton = document.querySelector(".new-book");
const newBookForm = document.querySelector(".book-form form");
const formContainer = document.querySelector(".book-form");

//Display the form to add a new book with the 'New Book' button is pressed
newBookButton.addEventListener("click", function () {
  formContainer.style.display = "block";
});

//Form validation
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");

function validateForm() {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity("Please enter a title");
  } else if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity("Title is too short, must be at least 1 character");
  } else {
    titleInput.setCustomValidity("");
  }

  if (author.validity.valueMissing) {
    author.setCustomValidity("Please add an author");
  } else if (author.validity.tooShort) {
    author.setCustomValidity("Author name is too short, must be at least 3 characters");
  } else {
    author.setCustomValidity("");
  }

  if (pages.value < 10) {
    pages.setCustomValidity("The book must have at least 10 pages")
  } else {
    pages.setCustomValidity("");
  }
}

titleInput.addEventListener("input", validateForm);
authorInput.addEventListener("input", validateForm);
pagesInput.addEventListener("input", validateForm);

//Get the book details from the form and add it to the library
newBookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  validateForm(); //trigger validation check before form submission

  //Check if form is valid after running custom validation
  if (!newBookForm.checkValidity()) {
    newBookForm.reportValidity(); //displays validation error messages
    return;
  }

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const read = document.querySelector('input[name="read"]:checked').value;

  let book = new Book(title, author, pages, read);
  myLibrary.push(book);

  newBookForm.reset();
  formContainer.style.display = "none";
  listBooks();
});
