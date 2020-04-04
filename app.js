const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/BookstoreDB");

const bookSchema = mongoose.Schema({
  name: String,
  author: String,
  isbn: Number,
  pages: Number,
  rating: Number
});
const Book = mongoose.model("Book", bookSchema);

app.get("/", function(req, res){
  res.render("index");
});
app.post("/", function(req, res){
  let bookInfo = req.body
  if(!bookInfo.name || !bookInfo.author || !bookInfo.isbn){
    console.log("sheex")
  }else{
    let newBook = new Book({
      name: bookInfo.name,
      author: bookInfo.author,
      isbn: bookInfo.isbn,
      pages: bookInfo.pages,
      rating: bookInfo.rating
    });
    newBook.save(function(err, Book){
      if(err){
        console.log("Error");
      }else{
        console.log("Book got added")
      }
    });
  }
  res.redirect("/")
});
// const book1 = new Book({
//   name: "Harry Porter and the girl who got banged",
//   author: "JK Rowling",
//   isbn: 6966969696669696,
//   pages:6969,
//   rating: 69
// });

// book1.save(function(err, book1){
//   if(err){
//     console.log(err)
//   }else{
//     console.log(book1.name + "Saved")
//   }
// });

app.post("/")
app.listen(2500, function(req, res){
  console.log("Server is running on Port 2500.")
});
