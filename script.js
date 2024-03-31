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

let deleteBookBtnList;
let changeReadStatusBtnList;

dialog.addEventListener('close', (e) => {
    if (dialog.returnValue === 'submit') {
        const isRead = (isBookRead.checked) ? true : false;
        console.log(isRead)
        addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, isRead);
    }
    dialog.returnValue = "default";
    displayBooks(libraryBooks);
    form.reset();
})

newBookBtn.addEventListener('click', () => {
    dialog.showModal();
})

const libraryBooks = [
    {
        title: "The Maze Runner",
        author: "James Dashner",
        pages: 371,
        read: true
    },
    {
        title: "The Scorch Trials",
        author: "James Dashner",
        pages: 359,
        read: false
    },
    {
        title: "The Death Cure",
        author: "James Dashner",
        pages: 327,
        read: true
    }
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

        const changeReadStatusBtn = document.createElement('button');
        changeReadStatusBtn.textContent = (arr[i]["read"]) ? "Read" : "Not Read";
        changeReadStatusBtn.classList.add('button-style');

        changeReadStatusBtn.dataset.type = (arr[i]["read"]) ? "status-read" : "status-notread";
        changeReadStatusBtn.dataset.indexNumber = i;

        div.appendChild(changeReadStatusBtn);
        
        const deleteBookBtn = document.createElement('button');
        deleteBookBtn.classList.add("X-button", "button-style");
        deleteBookBtn.textContent = "Delete";
        deleteBookBtn.dataset.indexNumber = i;
        div.appendChild(deleteBookBtn);
        
        bookShelf.appendChild(div);
    }
    deleteBookBtnList = document.querySelectorAll('#book-shelf button.X-button');
    deleteFunctionUpdate();
    changeReadStatusBtnList = document.querySelectorAll('#book-shelf button:not(.X-button)');
    changeStatusUpdate();
}

function deleteFunctionUpdate() {
    deleteBookBtnList.forEach((button) => {
        button.addEventListener('click', (e) => {
            let bookIndex = e.target.dataset.indexNumber;
            deleteBook(bookIndex);
        })
    })
}

function changeStatusUpdate() {
    changeReadStatusBtnList.forEach((button) => {
        button.addEventListener('click', (e) => {
            console.log(e.target);
            let bookIndexStatus = e.target.dataset.indexNumber;
            libraryBooks[bookIndexStatus].statusChange();
        })
    })
}

function deleteBook(index) {
    libraryBooks.splice(index, 1);
    displayBooks(libraryBooks);
}

Book.prototype.statusChange = function () {
    this.read = !this.read;
    displayBooks(libraryBooks);
}