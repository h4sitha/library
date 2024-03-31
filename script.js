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

dialog.addEventListener('close', (e) => {
    if (dialog.returnValue === 'submit') {
        const isRead = (isBookRead.checked) ? "Yes" : "No";
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
        read: "Yes"
    },
    {
        title: "The Scorch Trials",
        author: "James Dashner",
        pages: 359,
        read: "Yes"
    },
    {
        title: "The Death Cure",
        author: "James Dashner",
        pages: 327,
        read: "Yes"
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
            const span = document.createElement('span');
            if (key === "pages") {
                span.textContent = `${arr[i][key]} pages`;
            } else if (key === "author") {
                span.textContent = `by ${arr[i][key]}`;
            } else {
                span.textContent = `${arr[i][key]}`;
            }
            div.appendChild(span);
        }
        const deleteBookBtn = document.createElement('button');
        deleteBookBtn.classList.add("X-button");
        deleteBookBtn.textContent = "Delete";
        deleteBookBtn.dataset.indexNumber = i;
        div.appendChild(deleteBookBtn);
        bookShelf.appendChild(div);
    }
    deleteBookBtnList = document.querySelectorAll('#book-shelf button.X-button');
    deleteFunctionUpdate();
}

function deleteFunctionUpdate() {
    deleteBookBtnList.forEach((button) => {
        button.addEventListener('click', (e) => {
            let bookIndex = e.target.dataset.indexNumber;
            deleteBook(bookIndex);
        })
    })
}

function deleteBook(index) {
    libraryBooks.splice(index, 1);
    displayBooks(libraryBooks);
}