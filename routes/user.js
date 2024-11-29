const express = require('express');
const { User, Borrow, Book } = require('../config/database');
const router = express.Router();
const { validate } = require('express-validation');
const { userCreate } = require('../validations/validations');

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll({ subQuery: false });

        res.status(200).json(users)
    } catch (error) {
        console.log(error);

        next(error)
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        console.log(typeof (userId));

        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' })
        }

        const borrows = await Borrow.findAll({
            where: {
                userId: userId,
            },
            include: [
                { model: Book, as: "book" }
            ]
        })

        const books = borrows.map((borrow) => borrow.dataValues)
        const borrowedBooks = books.filter((book) => book.status === "borrowed").map((book) => book.book.dataValues)
        const returnedBooks = books.filter((book) => book.status === "returned").map((book) => {
            const bookData = book.book.dataValues;
            return {
                ...bookData,
                userScore: book.score
            };
        });


        res.status(200).json({ id: user.id, name: user.name, books: { past: returnedBooks, present: borrowedBooks } })
    } catch (error) {
        console.log(error);
    }
})

router.post('/', validate(userCreate), async (req, res) => {
    try {
        const { name } = req.body;

        const newUser = await User.create({ name })

        res.status(201).json("")
    } catch (error) {
        console.log(error);
    }
})

router.post('/:userId/borrow/:bookId', async (req, res) => {
    try {
        const { userId, bookId } = req.params

        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json('User not found!')
        }

        const borrow = await Borrow.findOne({ where: { bookId: bookId } })
        if (borrow.dataValues.status === 'borrowed') {
            res.status(409).json({ message: 'This book already borrowed right now!' })
        }
        const newBorrow = await Borrow.create({ userId, bookId })

        res.status(204)
    } catch (error) {
        console.log(error);

    }
})

router.post('/:userId/return/:bookId', async (req, res) => {
    try {
        const { userId, bookId } = req.params;
        const { score } = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json('User not found!')
        }

        const borrow = await Borrow.findOne({
            where: {
                userId: userId,
                bookId: bookId
            }
        });
        console.log(borrow);

        if (!borrow) {
            res.status(404).json({ message: 'This book not borrowed for this user!' })
        }

        borrow.status = "returned"
        borrow.score = score;
        await borrow.save();
        res.status(204)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;