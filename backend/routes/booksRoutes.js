import express from "express"
import { Book } from "../models/bookModel.js"

const router = express.Router()

// Create a book
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.yearPublished
        ) {
            return res.status(400).send({
                message: "Enter all required fields"
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            yearPublished: req.body.yearPublished,

        }
        const book = await Book.create(newBook)

        return res.status(201).send(book)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})

        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// Get one book
router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const book = await Book.findById(id)

        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// Update a book
router.put('/:id', async (req, res) => {

    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.yearPublished
        ) {
            return res.status(400).send({
                message: "Enter all required fields"
            })
        }

        const { id } = req.params

        const result = await Book.findByIdAndUpdate(id, req.body)

        if (!result) {
            return res.status(500).send({ message: "Book not found" })
        }

        return res.status(400).send({ message: "Book updated" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

// Delete a book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const result = await Book.findByIdAndDelete(id)

        if (!result) {
            return res.status(404).send({ message: "Book not found" })
        }

        return res.status(200).send({ message: "Book deleted" })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

export default router