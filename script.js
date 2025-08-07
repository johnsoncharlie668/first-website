const books = [
    {
        title: 'Frankenstein',
        author: 'Mary Shelley',
        coverImage: 'images/book-covers/frankenstein-cover.jpg',
        style: 4.5,
        story: 4.5,
        soul: 5,
    },
    {
        title: 'The Stranger',
        author: 'Albert Camus',
        coverImage: 'images/book-covers/the-stranger-cover.jpg',
        style: 5,
        story: 4,
        soul: 5,
    },
    {
        title: 'The Metamorphosis',
        author: 'Franz Kafka',
        coverImage: 'images/book-covers/the-metamorphosis-cover.jpg',
        style: 5,
        story: 4,
        soul: 4.5,
    },
];

// Calculate overall rating for each book
for (let book in books) {
    book.rating = Math.round((book.style + book.story + book.soul / 3));
}

// Set starting conditions
currentBookIndex = 1;

