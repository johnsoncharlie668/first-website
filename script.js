const books = [
    {
        title: 'Frankenstein',
        author: 'Mary Shelley',
        coverImage: 'images/book-covers/frankenstein-cover.jpg',
        coverImageDescription: 'Frankenstein book cover: Features "The Wanderer Above the Sea Fog" by Caspar David Friedrich - a German romantic painting',
        style: 4.5,
        story: 4.5,
        soul: 5,
    },
    {
        title: 'The Stranger',
        author: 'Albert Camus',
        coverImage: 'images/book-covers/the-stranger-cover.jpg',
        coverImageDescription: "The Stranger book cover: A series of black spikes radially point to the novel's title on a white background",
        style: 5,
        story: 4,
        soul: 5,
    },
    {
        title: 'The Metamorphosis',
        author: 'Franz Kafka',
        coverImage: 'images/book-covers/the-metamorphosis-cover.jpg',
        coverImageDescription: "The Metamorphosis book cover: A man turned bug monster lying on his bed",
        style: 5,
        story: 4,
        soul: 4.5,
    },
];

// Calculate overall rating for each book
for (let book of books) {
    book.rating = Math.round(((book.style + book.story + book.soul) / 3) * 2) / 2;
    console.log(`${book.title}: ${book.rating}`)
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
function DisplayStar(container, imageAddress) {
    starElement = document.createElement("IMG");
    starElement.src = imageAddress;
    container.append(starElement);
}

function DisplayRating(starContainer, rating) {
    remainingStars = rating;
    for (let i = 0; i < 5; i++) {
        if (remainingStars >= 1) {
            DisplayStar(starContainer, 'images/stars/full-star.svg');
        }
        else if (remainingStars === 0.5) {
            DisplayStar(starContainer, 'images/stars/half-star.svg');
        }
        else {DisplayStar(starContainer, 'images/stars/empty-star.svg');}

        remainingStars -= 1;
    }
}

// Now get book carousel to make it dynamically generated
const bookCarousel = document.querySelector(".book-carousel");

let previousBookHTML = `
    <div class='book-cover'>
        <img src=${previousBook.coverImage} alt= ${previousBook.coverImageDescription}/>
        <button class="left" id="left-button">
            <i data-lucide="circle-arrow-left"></i>
        </button>
    </div>
    <div class ='book-info'>
        <div class='basic-info'>
            <h4 class="title">${previousBook.title}</h4>
            <p class="author">${previousBook.author}</p>
        </div>

        <div class="star-row"></div>
    </div>
`;

let currentBookHTML = `
    <div class='book-cover'>
        <img src=${currentBook.coverImage} alt=${currentBook.coverImageDescription}/>
    </div>
    <div class ='book-info'>
        <div class='basic-info'>
            <h4 class="title">${currentBook.title}</h4>
            <p class="author">${currentBook.author}</p>
        </div>

        <div class="star-row"></div>
    </div>
`;

let nextBookHTML = `
    <div class='book-cover'>
        <img src="${nextBook.coverImage}" alt=${nextBook.coverImageDescription} />
        <button class="right" id="right-button">
            <i data-lucide="circle-arrow-right"></i>
        </button>
    </div>
    <div class ='book-info'>
        <div class='basic-info'>
            <h4 class="title">${nextBook.title}</h4>
            <p class="author">${nextBook.author}</p>
        </div>

        <div class="star-row"></div>
    </div>
`;

previousBookArticle = document.createElement('article');
previousBookArticle.className = 'unselected-book';
previousBookArticle.innerHTML = previousBookHTML;

currentBookArticle = document.createElement('article');
currentBookArticle.className = 'current-book';
currentBookArticle.innerHTML = currentBookHTML;

nextBookArticle = document.createElement('article');
nextBookArticle.className = 'unselected-book';
nextBookArticle.innerHTML = nextBookHTML;


// Set starting html
bookCarousel.append(previousBookArticle);
bookCarousel.append(currentBookArticle);
bookCarousel.append(nextBookArticle);

// Set stars
const starRows = document.querySelectorAll('.star-row');
for (let i = 0; i < starRows.length; i++) {
    DisplayRating(starRows[i], books[i].rating);
}

// Create icons for buttons
lucide.createIcons()

// The next section is all about updates

// By using modulus, we have wrapping around functionality
function UpdateBookIndex(change) {
    previousBookIndex = (previousBookIndex + change + numBooks) % numBooks;
    currentBookIndex = (currentBookIndex + change + numBooks) % numBooks;
    nextBookIndex = (nextBookIndex + change + numBooks) % numBooks;

    previousBook = books[previousBookIndex];
    currentBook = books[currentBookIndex];
    nextBook = books[nextBookIndex];

    console.log(currentBookIndex);
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

function UpdateBookCarousel() {
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
}


function UpdateBooks(change) {
    UpdateBookIndex(change);
    UpdateBookCarousel();
}

// Get buttons
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");

// Make buttons functional
leftButton.onclick = () => UpdateBooks(-1);
rightButton.onclick = () => UpdateBooks(+1);

