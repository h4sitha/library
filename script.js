const bookShelf = document.querySelector('#book-shelf');
const newBookBtn = document.querySelector('#new-book');
const dialog = document.querySelector('dialog');

const form = document.querySelector('form');
const cancelBtn = document.querySelector('button#cancel');
const submitBtn = document.querySelector('button#submit');

const bookTitle = document.querySelector('input#book-title');
const bookAuthor = document.querySelector('input#book-author');
const bookPages = document.querySelector('input#book-pages');
const isBookRead = document.querySelector('input#book-read');


dialog.addEventListener('close', (e) => {
    if (dialog.returnValue === 'submit') {
        addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, isBookRead.checked);
    }
    dialog.returnValue = "default";
    displayBooks(libraryBooks);
    form.reset();
})

newBookBtn.addEventListener('click', () => {
    dialog.showModal();
})

const libraryBooks = [
    new Book("The Maze Runner", "James Dashner", 371, true),
    new Book("The Scorch Trials", "James Dashner", 359, false),
    new Book("The Death Cure", "James Dashner", 327, true)
];

displayBooks(libraryBooks);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    libraryBooks.push(newBook);
}

function displayBooks(arr) {
    bookShelf.textContent = "";
    for (let i=0; i < arr.length; i++) {
        const div = document.createElement('div');
        for (let key in arr[i]) {
            if (arr[i].hasOwnProperty(key)) {
                const span = document.createElement('span');
                if (key === "pages") {
                    span.textContent = `${arr[i][key]} pages`;
                } else if (key === "author") {
                    span.textContent = `by ${arr[i][key]}`;
                } 
                else if (key === "read") {
                    continue;
                } 
                else {
                    span.textContent = `${arr[i][key]}`;
                }
            div.appendChild(span);
            }
        }

        if (arr[i]["read"]) {
            div.style.backgroundColor = "hsla(120, 73%, 75%, 0.3)";
        }

        const changeReadStatusBtn = document.createElement('button');
        changeReadStatusBtn.textContent = (arr[i]["read"]) ? "Read" : "Not Read";
        changeReadStatusBtn.classList.add('button-style');

        changeReadStatusBtn.dataset.type = (arr[i]["read"]) ? "status-read" : "status-notread";
        changeReadStatusBtn.dataset.indexNumber = i;

        changeReadStatusBtn.addEventListener('click', (e) => {
            let currentBookIndex = e.target.dataset.indexNumber;
            console.log(libraryBooks[currentBookIndex].statusChange());
        })

        div.appendChild(changeReadStatusBtn);
        
        const deleteBookBtn = document.createElement('button');
        deleteBookBtn.classList.add("X-button", "button-style");
        deleteBookBtn.textContent = "Delete";
        deleteBookBtn.dataset.indexNumber = i;

        deleteBookBtn.addEventListener('click', (e) => {
            let bookIndex = e.target.dataset.indexNumber;
            deleteBook(bookIndex);
        })

        div.appendChild(deleteBookBtn);

        bookShelf.appendChild(div);
    }
}

function deleteBook(index) {
    let currentBook = libraryBooks[index].title;
    let isSure = prompt(`Are you sure you want to delete "${currentBook}"? Yes or No.`);
    if (isSure.toLowerCase() === "yes") {
        libraryBooks.splice(index, 1);
        displayBooks(libraryBooks);
    }
}

Book.prototype.statusChange = function () {
    this.read = !this.read;
    displayBooks(libraryBooks);
}