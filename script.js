const bookShelf = document.querySelector('#book-shelf');
const newBookBtn = document.querySelector('#new-book');
const dialog = document.querySelector('dialog');

const form = document.querySelector('form');
const cancelBtn = document.querySelector('button#cancel');

cancelBtn.addEventListener('click', () => {
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

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    const newBook = new Book();
    libraryBooks.push(newBook);
}

function displayBooks(arr) {
    bookShelf.textContent = "";
    for (let i=0; i < arr.length; i++) {
        const div = document.createElement('div');
        for (let key in arr[i]) {
            const span = document.createElement('span');
            span.textContent = `${arr[i][key]}`;
            div.appendChild(span);
        }
        bookShelf.appendChild(div);
    }
}