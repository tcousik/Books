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

// Post a book
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