const iconPlus = document.querySelector('#btn-add-new');
const cancelBtn = document.querySelector('#cancel');
let selectedValue;
var inputTitle = "";
var inputAuthor = "";
var inputPages = "";
libraryWrapper = document.querySelector('.library-wrapper');

let myLibrary = JSON.parse(localStorage.getItem("library"));
myLibrary = myLibrary === null ? [] : myLibrary;

render();

const form = document.querySelector('.form');
const form1=document.querySelector('form');
iconPlus.addEventListener('click', showForm);
cancelBtn.addEventListener('click', showForm);

document.getElementById('book-add').addEventListener('click', function (e) {
    e.preventDefault();

    inputTitle = document.getElementById('title').value;
    inputAuthor = document.getElementById('author').value;
    inputPages = document.getElementById('pages').value;

    submitBook(e);
    resetForm();
    saveBook();
});



function showForm() {
    
    if (form.classList.contains('show')) {
        form.classList.remove('show');
        console.log("hello");


    } else {
        form.classList.add('show');
    }
}

class Book {

    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;

    }
}

Book.prototype.toString = function bookToString() {
    return `${this.title + ": " + this.author + ": " + this.pages + ": " + this.isRead}`;
}

function addToMyLibrary(book) {
    myLibrary.push(book);
}
function validateForm() {
    radioCheck();
    console.log(inputTitle + inputAuthor + inputPages);

    if (inputTitle === "" || inputAuthor === "" || inputPages === "" || !selectedValue) {
        return false;
    } else {
        return true;
    }
}
function radioCheck() {
    const rbs = document.querySelectorAll('input[name="choice"]');
    for (let rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }
}
function resetForm() {
    form1.reset();

}
function submitBook(e) {
    e.preventDefault();

    radioCheck();

    if (validateForm()) {
        let newBook = new Book(inputTitle, inputAuthor, inputPages, selectedValue);
        console.log("This is new book: " + newBook.toString());
        addToMyLibrary(newBook);
        render();
        resetForm();
       

    } else {
        alert("book not submitted");
    }
}
function saveBook() {
    localStorage.removeItem('library');
    localStorage.setItem("library", JSON.stringify(myLibrary));
   

}
function render() {
    clearElements();
    for (let book of myLibrary) {
        console.log("title: " + book.title);

        const bookList = libraryWrapper.appendChild(document.createElement('div'));//book-wrapper
        bookList.id="b-list";
        bookList.dataset.book_id = myLibrary.indexOf(book);
        const bookTitle = bookList.appendChild(document.createElement('h3'));//title
        const bookAuthor = bookList.appendChild(document.createElement('p'));//author
        const bookPages = bookList.appendChild(document.createElement('p'));//pages
        const bookStatus = bookList.appendChild(document.createElement('div'));//book status

        bookTitle.appendChild(document.createTextNode('Book Title: '));//title
        bookAuthor.appendChild(document.createTextNode('Book Author:'));//title
        bookPages.appendChild(document.createTextNode('Book Pages: '));//title

        // child elements
        const title = bookTitle.appendChild(document.createElement('span'));//title
        const author = bookAuthor.appendChild(document.createElement('span'));//title
        const pages = bookPages.appendChild(document.createElement('span'));//title
        const changeStatusTitle= bookStatus.appendChild(document.createElement('p'));
        const changeStatus = bookStatus.appendChild(document.createElement('button'));//button read/unread
        const removeButton = bookStatus.appendChild(document.createElement('button'));//button delete book

        
        removeButton.appendChild(document.createTextNode('Delete'))

        bookList.classList.add('book-wrapper');
        bookTitle.classList.add('book-title');
        bookAuthor.classList.add('book-author');
        bookAuthor.classList.add('book-author');
        bookPages.classList.add('book-pages');
        changeStatusTitle.classList.add('status-title')
        bookStatus.classList.add('book-status');
        removeButton.classList.add('remove-button');
        bookStatus.classList.add('book-status')

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        
        
        if (book.isRead==="yes") {
            changeStatus.textContent = "Read";
            changeStatus.classList.add('read-btn')
        
        } else {
            changeStatus.textContent = "Unread";
            changeStatus.classList.add('unread-btn')
        
        }

        changeStatus.addEventListener('click',changeReadStatus);
        removeButton.addEventListener('click',deleteBook);


}}

// function Clear elements
function clearElements() {
    let firstElement = libraryWrapper.firstElementChild;

    while (firstElement) {
        firstElement.remove();
        firstElement = libraryWrapper.firstElementChild;
    }
}
function changeReadStatus(event){
    console.log("Element: " + event.target.parentElement.parentElement.id);
    console.log("Book ID: " + event.target.parentElement.parentElement.getAttribute("data-book_id"));
    
    const index = event.target.parentElement.parentElement.getAttribute("data-book_id");
    const updatedBook = myLibrary[index];
    console.log("target found: " + updatedBook.toString());

    if (updatedBook.isRead === "yes") {
        updatedBook.isRead = "no";
        event.target.textContent = "Unread";
        event.target.classList.remove("read-btn");
        event.target.classList.add("unread-btn");
    } else {
        updatedBook.isRead = "yes";
        event.target.textContent = "Read";
        event.target.classList.remove("unread-btn");
        event.target.classList.add("read-btn");
    }

    saveBook();
}
function deleteBook(event){
    if (event.target.classList.contains("remove-button")) {
        event.target.parentElement.parentElement.remove();

        const index = event.target.parentElement.parentElement.getAttribute("data-book_id");
        myLibrary.splice(index, 1);

        saveBook();
        render();
    }
}