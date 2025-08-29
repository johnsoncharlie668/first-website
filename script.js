import { books } from "./book-data.js";

// Calculate overall rating for each book
for (let book of books) {
    book.rating = Math.round(((book.style + book.story + book.soul) / 3) * 2) / 2;
}

// Get stating info needed for book carousel
let previousBookIndex = 0;
let currentBookIndex = 1;
let nextBookIndex = 2;

let previousBook = books[previousBookIndex];
let currentBook = books[currentBookIndex];
let nextBook = books[nextBookIndex];
const numBooks = books.length;

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
            <a href="book-profile.html">
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
    displayRating(stars[i], books[i].rating);
}

// Create icons for buttons
lucide.createIcons()

// The next section is all about updates

// By using modulus, we have wrapping around functionality
function updateBookIndex(change) {
    previousBookIndex = (previousBookIndex + change + numBooks) % numBooks;
    currentBookIndex = (currentBookIndex + change + numBooks) % numBooks;
    nextBookIndex = (nextBookIndex + change + numBooks) % numBooks;

    previousBook = books[previousBookIndex];
    currentBook = books[currentBookIndex];
    nextBook = books[nextBookIndex];
}

function updateStars() {
    for (let i = 0; i < starRows.length; i++) {
        // For each row of stars simply change the src of the imgae
        displayRating(stars[i], books[(i + previousBookIndex + numBooks) % numBooks].rating);
    }
}

// Need lots of info to make changes to book carousel
const prevCover = previousBookArticle.querySelector('img');
const prevTitle = previousBookArticle.querySelector('.title');
const prevAuthor = previousBookArticle.querySelector('.author');

const currentCover = currentBookArticle.querySelector('img');
const currentTitle = currentBookArticle.querySelector('.title');
const currentAuthor = currentBookArticle.querySelector('.author');

const nextCover = nextBookArticle.querySelector('img');
const nextTitle = nextBookArticle.querySelector('.title');
const nextAuthor = nextBookArticle.querySelector('.author');

function updateBookCarousel() {
    // Update all the book info
    prevCover.src = previousBook.coverImage;
    prevCover.alt = previousBook.coverImageDescription;
    prevTitle.textContent = previousBook.title;
    prevAuthor.textContent = previousBook.author;

    currentCover.src = currentBook.coverImage;
    currentCover.alt = currentBook.coverImageDescription;
    currentTitle.textContent = currentBook.title;
    currentAuthor.textContent = currentBook.author;

    nextCover.src = nextBook.coverImage;
    nextCover.alt = nextBook.coverImageDescription;
    nextTitle.textContent = nextBook.title;
    nextAuthor.textContent = nextBook.author;

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

// Now add in book profile html
function getProfileHTML(book) {
    return `
            <div class="container">
            <div class="left">
                <div class="general-info">
                    <div class="basic-profile-info">
                        <h1>The Stranger</h1>
                        <h2>Albert Camus</h2>
                    </div>
                    <div class="overall star-row">
                        <img src="images/stars/overall/full-star.svg">
                        <img src="images/stars/overall/full-star.svg">
                        <img src="images/stars/overall/full-star.svg">
                        <img src="images/stars/overall/full-star.svg">
                        <img src="images/stars/overall/full-star.svg">
                    </div>
                </div>
                <div class="special-ratings">
                    <div class="rating-container">
                        <h3 class="rating-descriptor">Story:</h3>
                        <div class="special star-row">
                            <img src="images/stars/story/full-star.svg">
                            <img src="images/stars/story/full-star.svg">
                            <img src="images/stars/story/full-star.svg">
                            <img src="images/stars/story/full-star.svg">
                            <img src="images/stars/story/full-star.svg">
                        </div>
                    </div>
                    <div class="rating-container">
                        <h3 class="rating-descriptor">Style:</h3>
                        <div class="special star-row">
                            <img src="images/stars/style/full-star.svg">
                            <img src="images/stars/style/full-star.svg">
                            <img src="images/stars/style/full-star.svg">
                            <img src="images/stars/style/full-star.svg">
                            <img src="images/stars/style/full-star.svg">
                        </div>
                    </div>
                    <div class="rating-container">
                        <h3 class="rating-descriptor">Soul:</h3>
                        <div class="special star-row">
                            <img src="images/stars/soul/full-star.svg">
                            <img src="images/stars/soul/full-star.svg">
                            <img src="images/stars/soul/full-star.svg">
                            <img src="images/stars/soul/full-star.svg">
                            <img src="images/stars/soul/full-star.svg">
                        </div>
                    </div>
                </div>

                <p>
                    The Stranger is my favorite book of all time. It truly forces you to reconcile your own empathy with one who seems so alien.
                </p>
            </div>
            <div class="right">
                <img src="images/book-covers/the-stranger-cover.jpg" class="cover">
            </div>
        </div>
    `;
}
