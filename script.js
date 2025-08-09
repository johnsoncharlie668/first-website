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
        story: 4.5,
        soul: 5,
    },
    {
        title: 'The Metamorphosis',
        author: 'Franz Kafka',
        coverImage: 'images/book-covers/the-metamorphosis-cover.jpg',
        coverImageDescription: "The Metamorphosis book cover: A man turned bug monster lying on his bed",
        style: 5,
        story: 4,
        soul: 5,
    },
    {
        title: 'The Bluest Eye',
        author: 'Toni Morrison',
        coverImage: 'images/book-covers/the-bluest-eye-cover.jpg',
        coverImageDescription: 'The Bluest Eye book cover: Pecola sits by a window with a sorrowful expression',
        style: 4,
        story: 4,
        soul: 4,
    },
    {
        title: 'The Glass Castle',
        author: 'Jeannette Walls',
        coverImage:'images/book-covers/the-glass-castle-cover.jpg',
        coverImageDescription: 'The Glass Castle book cover: A young girl whispers',
        style: 4,
        story: 4.5,
        soul: 3.5,
    },
    {
        title: 'No Country for Old Men',
        author: 'Cormac McCarthy',
        coverImage: 'images/book-covers/no-country-for-old-men-cover.jpg',
        coverImageDescription: 'No Country for Old Men book cover: A vast field with a lone road sign',
        style: 4,
        story: 4.5,
        soul: 3.5,
    },
    {
        title: 'The Plague',
        author: 'Albert Camus',
        coverImage: 'images/book-covers/the-plague-cover.jpg',
        coverImageDescription: 'The Plague book cover: A minimalist rendition of Dr. Bernard Rieux standing with blothces of pestilence',
        style: 4,
        story: 4,
        soul: 4,
    },
    {
        title: 'The Bean Trees',
        author: 'Barbara Kingsolver',
        coverImage: 'images/book-covers/the-bean-trees-cover.jpg',
        coverImageDescription: 'The Bean Trees cover: A lone tree stands tall',
        style: 3.5,
        story: 3.5,
        soul: 4.5,
    }
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
function displayStar(container, imageAddress) {
    const starElement = document.createElement("IMG");
    starElement.src = imageAddress;
    container.append(starElement);
}

function displayRating(starContainer, rating) {
    let remainingStars = rating;
    for (let i = 0; i < 5; i++) {
        if (remainingStars >= 1) {
            displayStar(starContainer, 'images/stars/full-star.svg');
        }
        else if (remainingStars === 0.5) {
            displayStar(starContainer, 'images/stars/half-star.svg');
        }
        else {displayStar(starContainer, 'images/stars/empty-star.svg');}

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

const previousBookArticle = document.createElement('article');
previousBookArticle.className = 'unselected-book';
previousBookArticle.innerHTML = previousBookHTML;

const currentBookArticle = document.createElement('article');
currentBookArticle.className = 'current-book';
currentBookArticle.innerHTML = currentBookHTML;

const nextBookArticle = document.createElement('article');
nextBookArticle.className = 'unselected-book';
nextBookArticle.innerHTML = nextBookHTML;


// Set starting html
bookCarousel.append(previousBookArticle);
bookCarousel.append(currentBookArticle);
bookCarousel.append(nextBookArticle);

// Set stars
const starRows = document.querySelectorAll('.star-row');
for (let i = 0; i < starRows.length; i++) {
    displayRating(starRows[i], books[i].rating);
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

    console.log(currentBookIndex);
}

function updateStars() {
    for (let i = 0; i < starRows.length; i++) {
        // For each row of stars first clear the existing stars
        starRows[i].innerHTML = '';
        // Then repopulate that row
        displayRating(starRows[i], books[(i + previousBookIndex + numBooks) % numBooks].rating);
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
}

// Get buttons
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");

// Make buttons functional
leftButton.onclick = () => updateBooks(-1);
rightButton.onclick = () => updateBooks(+1);
