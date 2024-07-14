import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import { Book } from './models/bookModel.js'
import booksRoute from './routes/booksRoutes.js'

const app = express()

// Middleware to parse request body
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Hi')
})

app.use('/books', booksRoute)

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