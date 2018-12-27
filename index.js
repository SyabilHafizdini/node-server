const mongoose = require('mongoose')
const express = require('express') 
const app = express() 
const bodyParser = require('body-parser')

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://root:root@vocapp-vev3t.mongodb.net/Books?retryWrites=true")

// Creating the Book Schema
const bookSchema = mongoose.Schema({    
    title: String,
    price: Number,
    read: Boolean
})

// Creating the Book Model
const Book = mongoose.model('Books', bookSchema)

// Configuring GET endpoint
app.get('/books', (req, res)=>{
    Book.find({}, null, {sort: {_id: -1}}, (err, books) => {
        if (err) return console.log("Error: ", err)
        res.send(books)
    })
})

// Configuring POST endpoint
app.post('/books', (req, res) => {
    let  newBook = Book(req.body)
    newBook.save((err, results) => {
        if (err) {
            console.log("Error: ", err)
            process.exit(1)
        } else {
            console.log("Saved: ", results)
            res.sendStatus(201)
        }
    })
})

// Configuring the PUT endpoint
app.put('/books/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, book) {
        if (err) return res.status(500).send(err);
        return res.send(book);
    })
})

// Configuring the DELETE endpoint
app.delete('/books/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id, function(err, book) {
        if (err) return res.status(500).send(err);
        return res.send(book);
    })
})

app.listen(3000)
console.log("Server is running")