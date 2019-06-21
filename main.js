const myLibrary = [];
const bookTable = document.getElementById('book-table');
const btnNewBook = document.getElementById('btn-new');
const formNewBook = document.getElementById('new-book');
const btnSubmitBook = document.getElementById('new-submit');

function Book(title, author, pages, read) {
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
    renderSingle(book);
  });
}

function renderSingle(book) {
  row = document.createElement('tr');
    for([k, v] of Object.entries(book)) {
      data = document.createElement('td');
      data.innerHTML = v;
      row.appendChild(data);
    }
    bookTable.appendChild(row);
}

btnNewBook.onclick = () => {
  formNewBook.style.visibility = 'visible'
};

function getBookInfo() {
  const title = document.getElementById('new-title').value;
  const author = document.getElementById('new-author').value;
  const pages = document.getElementById('new-pages').value;
  const read = document.getElementById('new-read').value;
  return [title, author, pages, read];
}

function createBook() {
  values = getBookInfo();
  book = new Book(values[0], values[1], values[2], values[3]);
  addToLibrary(book);
}

btnSubmitBook.onclick = (e) => {
  e.preventDefault();
  createBook();
}

myBook = new Book('test','test',23,true);
myLibrary.push(myBook);
render(myLibrary);