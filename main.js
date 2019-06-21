const myLibrary = [];
const bookTable = document.getElementById('book-table');
const btnNewBook = document.getElementById('new-book');

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

function getBookInfo() {
  
}

myBook = new Book('test','test',23,true);
myLibrary.push(myBook);
render(myLibrary);