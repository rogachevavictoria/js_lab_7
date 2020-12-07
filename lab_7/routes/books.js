const express = require(`express`);
const router = express.Router();
let books = require(`../public/js/books.json`);

//get books
router.get('/', (req, res) => {
    res.render('index', {books: books})
});

//get single book
router.get('/api/books/:isbn', (req, res) => {
    const found = books.some(book => book.isbn === req.params.isbn);
    if(found)
        res.json(books.filter(book => book.isbn === req.params.isbn));
    else
        res.status(400).json({msg: "book not found"});
    
});

//get available books
router.get('/available/true', (req, res) => {
        res.render('index', {books: books.filter(book => book.available === true)});
});

//create book
router.post('/api/books/', (req, res) => {
    const newBook = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        author: req.body.author,
        publisher: req.body.publisher,
        available: true
    };

    if(!newBook.title || !newBook.author)
        return res.status(400).json({msg: 'no name'});
    books.push(newBook);
    res.redirect('/');

});


//book card
router.get('/card/:isbn', (req, res) => {
    book = books.find(book => book.isbn === req.params.isbn);
    res.render('card', book);
    
});

//update book

router.put('/api/books/:isbn', (req, res) => {
    const found = books.some(book => book.isbn === req.params.isbn);
    if(found){
        const updBook = req.body;
        let pos = books.map((e) => e.isbn).indexOf(req.params.isbn);
        let book = books[pos];
            //console.log(books);
            book.title = updBook.title ? updBook.title : book.title;
            book.author = updBook.author ? updBook.author : book.author;
            book.published = updBook.published ? updBook.published : book.published;
            books.splice(pos, 1, book);
            // res.json({msg: 'book was updated', books});
            res.render('index', {books});
    }
    else
        res.status(400).json({msg: "book not found"});
});

//delete book 
router.delete('/api/books/:isbn', (req, res) => {
    const found = books.some(book => book.isbn === req.params.isbn);
    
    if(found){
        books = books.filter(book => book.isbn !== req.params.isbn);
        res.render('index', {books});
    }
    else
        res.status(400).json({msg: "book not found"});
    
});

module.exports = router;