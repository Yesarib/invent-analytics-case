const express = require('express');
const { User, Borrow, Book } = require('../config/database');
const { validate } = require('express-validation');
const { bookCreate } = require('../validations/validations');
const router = express.Router();

router.post('/', validate(bookCreate), async (req, res) => {
    try {
        const { name } = req.body;

       
        const newBook = await Book.create({ name })

        res.status(201).json("")
    } catch (error) {
        console.log(error);
    }
})

router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();

        res.status(200).json(books)
    } catch (error) {
        console.log(error);

    }
})

router.get('/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params
        const book = await Book.findByPk(bookId);
        if (!book) {
            res.status(404).json({ message: 'Book not found!' })
        }

        const borrowedBook = await Borrow.findAll({
            where: {
                bookId: bookId,
                status: 'returned'
            }
        });

        let score = 0;
        borrowedBook.forEach(borrow => {
            score += borrow.dataValues.score;
        })


        res.status(200).json({ id: book.id, name: book.name, score: score / borrowedBook.length })
    } catch (error) {
        console.log(error);

    }
})

module.exports = router;

