import { books } from "./book-data.js";

const params = new URLSearchParams(window.location.search);
const parsedTitle = params.get('title');
console.log(parsedTitle);
const link = "book-profile.html?title=" + parsedTitle;
console.log(link);

const book = books.find((bookObject) => bookObject.link === link);

const title = document.querySelector('.title');
const author = document.querySelector('.author');
const cover = document.querySelector('.cover');
const review = document.querySelector('.review');

title.textContent = book.title;
author.textContent = book.author;
cover.src = book.coverImage;
review.textContent = book.review;

const overallRow = document.querySelector('.overall.star-row');
const overallStars = Array.from(overallRow.children);

const storyRow = document.querySelector('.story.star-row');
const storyStars = Array.from(storyRow.children);

const styleRow = document.querySelector('.style.star-row');
const styleStars = Array.from(styleRow.children);

const soulRow = document.querySelector('.soul.star-row');
const soulStars = Array.from(soulRow.children);


function displayStar(starElement, imageAddress) {
    console.log(starElement);
    starElement.src = imageAddress;
}

function displayRating(starsInRow, rating, starType) {
    console.log(starsInRow);
    let remainingStars = rating;
    for (let i = 0; i < 5; i++) {
        if (remainingStars >= 1) {
            displayStar(starsInRow[i], 'images/stars/' + starType + '/full-star.svg');
        }
        else if (remainingStars === 0.5) {
            displayStar(starsInRow[i], 'images/stars/' + starType + '/half-star.svg');
        }
        else {displayStar(starsInRow[i], 'images/stars/' + starType + '/empty-star.svg');}

        remainingStars -= 1;
    }
}

console.log(overallRow);
console.log(overallStars);
displayRating(overallStars, book.rating, 'overall');
displayRating(storyStars, book.story, 'story');
displayRating(styleStars, book.style, 'style');
displayRating(soulStars, book.soul, 'soul');

lucide.createIcons();


