import { books } from "./book-data.js";
let workingBooks = [...books]

// Get stating info needed for book carousel
let previousBookIndex = 0;
let currentBookIndex = 1;
let nextBookIndex = 2;

let previousBook = workingBooks[previousBookIndex];
let currentBook = workingBooks[currentBookIndex];
let nextBook = workingBooks[nextBookIndex];
const numBooks = workingBooks.length;

// Use a function to display stars in accordance with rating
function displayStar(starElement, imageAddress) {
    starElement.src = imageAddress;
}

function displayRating(starsInRow, rating) {
    let remainingStars = rating;
    for (let i = 0; i < 5; i++) {
        if (remainingStars >= 1) {
            displayStar(starsInRow[i], 'images/stars/overall/full-star.svg');
        }
        else if (remainingStars === 0.5) {
            displayStar(starsInRow[i], 'images/stars/overall/half-star.svg');
        }
        else {displayStar(starsInRow[i], 'images/stars/overall/empty-star.svg');}

        remainingStars -= 1;
    }
}

// To display what number book we're on, always just display currentBookIndex unless it's 0: In that case display numBooks
const bookIndexDisplay = document.querySelector(".book-index-display");

function updateBookIndexDisplay() {
    if (currentBookIndex != 0) {
        bookIndexDisplay.innerHTML = `${currentBookIndex} / ${numBooks}`;
    }
    else {
                bookIndexDisplay.innerHTML = `${numBooks} / ${numBooks}`;
    }
}

updateBookIndexDisplay();

// Now get book carousel to make it dynamically generated
const bookCarousel = document.querySelector(".book-carousel");

function getBookHTML(book, position) {
    const arrows = {
        previous: {icon: 'circle-arrow-left', class: 'left', id: 'left-button'},
        next: {icon: 'circle-arrow-right', class: 'right', id: 'right-button'}
    };

    return `
        <div class='book-cover'>
            <a href="${book.link}" class="link">
                <img src="${book.coverImage}" alt= "${book.coverImageDescription}"/>
            </a>
            ${arrows[position] ? `
            <button class="${arrows[position].class}" id="${arrows[position].id}">
                <i data-lucide="${arrows[position].icon}"></i>
            </button> ` : ``}
        </div>
        <div class ='book-info'>
            <div class='basic-info'>
                <h4 class="title">${book.title}</h4>
                <p class="author">${book.author}</p>
            </div>

            <div class="star-row">
                <img>
                <img>
                <img>
                <img>
                <img>
            </div>
        </div>
    `;
}

const previousBookArticle = document.createElement('article');
previousBookArticle.className = 'unselected-book';
previousBookArticle.innerHTML = getBookHTML(previousBook, 'previous');

const currentBookArticle = document.createElement('article');
currentBookArticle.className = 'current-book';
currentBookArticle.innerHTML = getBookHTML(currentBook, null);

const nextBookArticle = document.createElement('article');
nextBookArticle.className = 'unselected-book';
nextBookArticle.innerHTML = getBookHTML(nextBook, 'next');


// Set starting html
bookCarousel.append(previousBookArticle);
bookCarousel.append(currentBookArticle);
bookCarousel.append(nextBookArticle);

// Set stars
const starRows = document.querySelectorAll('.star-row');
const stars = [];
for (let i = 0; i < starRows.length; i++) {
    stars.push(starRows[i].children);
    displayRating(stars[i], workingBooks[i].rating);
}

// Create icons for buttons
lucide.createIcons();

// The next section is all about updates

// By using modulus, we have wrapping around functionality
function updateBookIndex(change) {
    previousBookIndex = (previousBookIndex + change + numBooks) % numBooks;
    currentBookIndex = (currentBookIndex + change + numBooks) % numBooks;
    nextBookIndex = (nextBookIndex + change + numBooks) % numBooks;

    previousBook = workingBooks[previousBookIndex];
    currentBook = workingBooks[currentBookIndex];
    nextBook = workingBooks[nextBookIndex];
}

function updateStars() {
    for (let i = 0; i < starRows.length; i++) {
        // For each row of stars simply change the src of the imgae
        displayRating(stars[i], workingBooks[(i + previousBookIndex + numBooks) % numBooks].rating);
    }
}

// Need lots of info to make changes to book carousel
const prevCover = previousBookArticle.querySelector('img');
const prevTitle = previousBookArticle.querySelector('.title');
const prevAuthor = previousBookArticle.querySelector('.author');
const prevLink = previousBookArticle.querySelector('.link');

const currentCover = currentBookArticle.querySelector('img');
const currentTitle = currentBookArticle.querySelector('.title');
const currentAuthor = currentBookArticle.querySelector('.author');
const currentLink = currentBookArticle.querySelector('.link');

const nextCover = nextBookArticle.querySelector('img');
const nextTitle = nextBookArticle.querySelector('.title');
const nextAuthor = nextBookArticle.querySelector('.author');
const nextLink = nextBookArticle.querySelector('.link');

function updateBookCarousel() {
    // Update all the book info
    prevCover.src = previousBook.coverImage;
    prevCover.alt = previousBook.coverImageDescription;
    prevTitle.textContent = previousBook.title;
    prevAuthor.textContent = previousBook.author;
    prevLink.href = previousBook.link;

    currentCover.src = currentBook.coverImage;
    currentCover.alt = currentBook.coverImageDescription;
    currentTitle.textContent = currentBook.title;
    currentAuthor.textContent = currentBook.author;
    currentLink.href = currentBook.link;

    nextCover.src = nextBook.coverImage;
    nextCover.alt = nextBook.coverImageDescription;
    nextTitle.textContent = nextBook.title;
    nextAuthor.textContent = nextBook.author;
    nextLink.href = nextBook.link;

    // Then update stars
    updateStars();
}

function updateBooks(change) {
    updateBookIndex(change);
    updateBookCarousel();
    updateBookIndexDisplay();
}

// Get buttons
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");

// Make buttons functional
leftButton.onclick = () => updateBooks(-1);
rightButton.onclick = () => updateBooks(+1);

// Make filter and order selectors functional
const selectorList = document.querySelectorAll('.dropdown-options > li');

selectorList.forEach(selector => {
    selector.addEventListener('click', () => {
        console.log(`We got a click gang on ${selector.id}`);
        console.log(workingBooks);
        // Add active-sort class to chosen and remove from others
        selectorList.forEach(selector => {
            if (selector.classList.contains('active-sort')) {
                selector.classList.remove('active-sort');
            }
        });
        selector.classList.add('active-sort');
        switch (selector.id) {
            case 'overall-order-selector':
                workingBooks.sort((a, b) => b.rating - a. rating);
                break;
            case 'story-order-selector':
                workingBooks.sort((a, b) => b.story - a.story);
                break;
            case 'style-order-selector':
                workingBooks.sort((a, b) => b.style - a.style);
                break;
            case 'soul-order-selector':
                workingBooks.sort((a, b) => b.soul - a.soul);
                break;
            case 'title-order-selector':
                workingBooks.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
                break;
            case 'author-order-selector':
                workingBooks.sort((a, b) => a.author.toLowerCase().localeCompare(b.author.toLowerCase()));
                break;
            case 'genre-filter-selector':
                break;
            case 'rating-filter-selector':
                break;
            default:
                break;
        }
        
        console.log(workingBooks);
        updateBooks(0);
    })
});


