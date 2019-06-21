const myLibrary = [];
const bookTable = document.getElementById('book-table');
const btnNewBook = document.getElementById('btn-new');
const btnCloseForm = document.getElementById('btn-close-form');
const formNewBook = document.getElementById('new-book');
const btnSubmitBook = document.getElementById('new-submit');
let bookCount = 0;
function Book(title, author, pages, read) {
  this.id = bookCount++
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addToLibrary(book) {
  myLibrary.push(book);
  renderSingle(book);
}

function render(bookList) {
  bookList.forEach((book, index) => {
    renderSingle(book, index);
  });
}

function renderSingle(book, index) {
  row = document.createElement('tr');
  row.dataset.id = index;
    for([k, v] of Object.entries(book)) {
      data = document.createElement('td');
      data.innerHTML = v;
      if (k === 'read') {
        data.innerHTML = '';
        readBtn = document.createElement('button');
        readBtn.className = 'btn btn-sm btn-primary';
        readBtn.id = `btn-delete-${book.id}`;
        readBtn.innerHTML = book.read ? 'Read' : 'Not Read';
        readBtn.addEventListener("click", () => {
          toggleReadStatus(book);
        });
        data.appendChild(readBtn);
      }
      row.appendChild(data);
    }
    // Create 'Actions' cell for the book
    deleteData = document.createElement('td')
    deleteBtn = document.createElement('button');
    // Create button elements
    deleteBtn.className = 'btn btn-sm btn-danger';
    deleteBtn.innerHTML = 'Remove';
    
    // Hook click event listeners to the buttons
    deleteBtn.addEventListener("click", () => {
      if (confirm(`'${book.title}' will be removed !`))
        removeBook(index);
    });

    deleteData.appendChild(deleteBtn);
    row.appendChild(deleteData);

    bookTable.appendChild(row);
}

btnNewBook.onclick = (e) => {
  e.preventDefault;
  formNewBook.style.visibility = 'visible';
  document.getElementById('new-title').focus();
};

btnCloseForm.onclick = (e) => {
  e.preventDefault();
  formNewBook.style.visibility = 'hidden';
};

function getBookInfo() {
  const title = document.getElementById('new-title');
  const author = document.getElementById('new-author');
  const pages = document.getElementById('new-pages');
  const read = document.getElementById('new-read');
  let valuesValid = true;
  if (title.value.length < 1 || title.value.length > 50) {
    title.style.border = "1px solid red";
    document.getElementById('error-title').style.visibility = 'visible';
    valuesValid = false;
  }
  if (author.value.length < 3 || author.value.length > 30) {
    author.style.border = "1px solid red";
    document.getElementById('error-author').style.visibility = 'visible';
    valuesValid = false;
  }
  if (pages.value < 1 || pages.value > 50000) {
    pages.style.border = "1px solid red";
    document.getElementById('error-pages').style.visibility = 'visible';
    valuesValid = false;
  }
  if (valuesValid)
    return [title.value, author.value, pages.value, read.checked];
}


function createBook() {
  values = getBookInfo();
  book = new Book(values[0], values[1], values[2], values[3]);
  addToLibrary(book);
}

function toggleReadStatus(book) {
  readBtn = document.getElementById(`btn-delete-${book.id}`);
  if (book.read) {
    book.read = false;
    readBtn.innerHTML = "Not Read";
  } else {
    book.read = true;
    readBtn.innerHTML = "Read";
  }
}

btnSubmitBook.onclick = (e) => {
  e.preventDefault();
  createBook();
}

// Sample books
book1 = new Book('So long, and thanks for all the fish!', 'Douglas Noel Adams', 452, true);
book2 = new Book('Fight Club', 'Chuck Palahniuk', 213, true);
book3 = new Book('Nutuk', 'M.Kemal Atatürk', 523, true);
book4 = new Book('The Myth of Sisyphus', 'Albert Camus', 98, true);
book5 = new Book('One Hundred Years of Solitude', 'Gabriel García Márquez', 486, true);

myLibrary.push(book1, book2, book3, book4, book5);
render(myLibrary);

function removeBook(index) {
  // Remove the book from the list
  myLibrary.splice(index, 1);
  // Find that books' row
  bookRow = document.querySelectorAll(`[data-id='${index}']`)[0];
  // Remove the related row from table
  bookTable.removeChild(bookRow);
}