import express, { request, response } from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import { Book } from './models/bookModel.js'

const app = express()

// Middleware to parse request body
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Hi')
})

// Create a book
app.post('/books', async (req, res) => {
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
app.get('/books', async (req, res) => {
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
app.get('/books/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const book = await Book.findById(id)

        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to DB')
        app.listen(PORT, () => {
            console.log(`App running on ${PORT}`)
        })

    })
    .catch((error) => {
        console.log(error)
    })