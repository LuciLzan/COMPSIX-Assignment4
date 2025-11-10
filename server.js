/**
 *
 * Step 5
 * Create Your Express Server: In server.js, a list of books has been created for you. These will be the books that will be hosted by the API. Create a basic Express server that:
 *
 * Imports Express and creates an application instance
 * Sets up middleware to parse JSON requests with app.use(express.json())
 * Starts the server on port 3000.
 * Verify that the server works by running
 */

//Via https://app.rize.education/courses/4751/resource/b093c68c-a3fe-48f8-81f4-d1a710458eb0?weekId=10837
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

//Via https://app.rize.education/courses/4751/resource/21972863-1abd-4c52-9b0a-a3d2ba25aac0?weekId=10837
// Only start server when running directly, not when testing
if (require.main === module) {
    app.listen(port, () => {
        console.log(`API server running at
    http://localhost:${port}`);
    });
}


// Books for bookstore API
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        copiesAvailable: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        copiesAvailable: 7
    }
    // Add more books if you'd like!
];

//Create your REST API here with the following endpoints:
    //'GET /api/books': 'Get all books',
app.get('/api/books', (req, res) => {
    return res.status(200).json(books)
})
    //'GET /api/books/:id': 'Get a specific book',
app.get('/api/books/:id', (req, res) =>{
    let book = books.find(book => book.id === parseInt(req.params.id));
    return book?res.status(200).json(book):res.status(404).send({message: `Can not find book with id ${parseInt(req.params.id)}`})
})
    //'POST /api/books': 'Add a new book',
app.post('/api/books', (req, res) => {
    let newBook = req.body;
    newBook.id = books.length+1
    books.push(newBook)
    return res.status(201).json(newBook);
})
    //'PUT /api/books/:id': 'Update a book',
app.put('/api/books/:id', (req, res) => {
    let book = books.find(book => book.id === parseInt(req.params.id));
    let newProps = req.body;
    if(!book) {return res.status(404).send({message: `Can not find book with id ${parseInt(req.params.id)}`})}
    for(let prop in newProps) {
        book[prop] = newProps[prop];
    }
    return  res.status(200).json(book);

})
    //'DELETE /api/books/:id': 'Delete a book'
app.delete('/api/books/:id', (req, res) => {
    let book = books.find(book => book.id === parseInt(req.params.id));
    if(!book) {return res.status(404).send({message: `Can not find book with id ${parseInt(req.params.id)}`})}
    books.splice(books.indexOf(book), 1);
    return res.status(200).json({"message":"Book Deleted"});
})

module.exports = app;
