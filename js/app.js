const addButton = document.querySelector('#addButton');
const closeButton = document.querySelector('.closeButton');
const submitButton = document.querySelector('#submit');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('#newForm');
const radio = document.getElementsByName('status');
const bookContainer = document.querySelector('.bookContainer');
const allError = document.querySelectorAll('.error');

let myLibrary = [],
  i = 0;

class Book {
  constructor(title, author, pageNumber, status) {
    this.Title = title;
    this.Author = author;
    this.Page = pageNumber;
    this.status = status;
  }
}

function checkValue() {
  const titleError = document.querySelector('.titleError');
  const authorError = document.querySelector('.authorError');
  const pageNumberError = document.querySelector('.pageNumberError');

  if (document.getElementById('title').validity.valueMissing) {
    titleError.textContent = 'required';
    authorError.textContent = '';
    pageNumberError.textContent = '';
    return false;
  }
  if (document.getElementById('author').validity.valueMissing) {
    authorError.textContent = 'required';
    titleError.textContent = '';
    pageNumberError.textContent = '';
    return false;
  }
  if (document.getElementById('pageNumber').validity.rangeUnderflow) {
    pageNumberError.textContent = 'negative value';
    authorError.textContent = '';
    titleError.textContent = '';
    return false;
  }
  if (document.getElementById('pageNumber').validity.valueMissing) {
    pageNumberError.textContent = 'required';
    authorError.textContent = '';
    titleError.textContent = '';
    return false;
  }
  allError.forEach((ele) => {
    ele.textContent = '';
  });
  return true;
}

function addBookToLibrary(event) {
  event.preventDefault();
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pageNumber = document.getElementById('pageNumber').value;
  let status;
  if (radio[0].checked) {
    status = radio[0].value;
  } else {
    status = radio[1].value;
  }
  if (!checkValue()) {
    return;
  }

  let newBook = new Book(title, author, pageNumber, status);
  myLibrary.push(newBook);
  form.reset();
  close();
  update();
}

let toggleButton, removeButton, divCard;

function update() {
  for (i; i < myLibrary.length; i++) {
    // card div for display book details
    divCard = document.createElement('div');
    divCard.classList.add('card');
    divCard.setAttribute('data-index', i);
    // toggleButton for read or not read
    toggleButton = document.createElement('button');
    toggleButton.classList.add('toggleStatus');
    toggleButton.setAttribute('id', i);
    // removeButton the data from array
    removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.textContent = 'X';
    removeButton.setAttribute('data-index', i);
    for (let j in myLibrary[i]) {
      if (j === 'status') {
        if (myLibrary[i][j] === 'yes') {
          toggleButton.textContent = 'Read';
          toggleButton.style.background = '#6bf250';
        } else {
          toggleButton.textContent = 'Not Read';
          toggleButton.style.background = '#f76d3b';
        }
        divCard.append(toggleButton);
        divCard.append(removeButton);
      } else {
        let p = document.createElement('p');
        p.textContent = `${j}: ${myLibrary[i][j]}`;
        divCard.appendChild(p);
      }
    }

    bookContainer.appendChild(divCard);
  }
  // read status function
  function toggle(b) {
    if (b.textContent === 'Read') {
      b.textContent = 'Not Read';
      b.style.background = '#f76d3b';
    } else {
      b.textContent = 'Read';
      b.style.background = '#6bf250';
    }
  }

  document.querySelectorAll('.toggleStatus').forEach((b) => {
    b.onclick = function () {
      toggle(b);
    };
  });

  // delete function
  function trash(r) {
    document.querySelectorAll('.card').forEach((c) => {
      if (c.dataset.index === r.dataset.index) {
        bookContainer.removeChild(c);
        myLibrary.splice(c.dataset.index, 1);
        i = myLibrary.length;
      }
    });
  }

  document.querySelectorAll('.remove').forEach((r) => {
    r.onclick = function () {
      trash(r);
    };
  });
}

function popup() {
  overlay.classList.add('active');
}

function close() {
  overlay.classList.remove('active');
  form.reset();
  allError.forEach((ele) => {
    ele.textContent = '';
  });
}

addButton.addEventListener('click', popup);

closeButton.addEventListener('click', close);

submitButton.addEventListener('click', addBookToLibrary);
