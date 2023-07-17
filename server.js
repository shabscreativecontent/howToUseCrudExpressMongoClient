const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 5001
require('dotenv').config()



// Set MiddleWare
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



let dbConnectionStr = process.env.DB_STRING
let db, quotesCollection ;

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
.then(client => {
   console.log("connected to Database");
   db = client.db('star-wars-quotes')
   quotesCollection = db.collection('quotes')
}).catch(error => console.error(error))

// app.get('/', (request, response) => {
//    response.send("<h1>Hello World</h1>")
// })

app.get('/', (request, response) => {
   quotesCollection.find().toArray()
     .then(results => {
       response.render('index.ejs', { quotes: results })
     })
     .catch(error => console.error(error))
 })


app.post('/quotes', (request, response) => {
   quotesCollection.insertOne({name: request.body.name, quote: request.body.quote, likes: 0})
     .then(result => {
       console.log('Quote Added')
      response.redirect('/')
     })
     .catch(error => console.error(error))
})

app.put('/updateLikes', (request, response) => {
   quotesCollection.updateOne({name: request.body.nameS, quote: request.body.quoteS, likes: request.body.likeS},{
      $set: {
         likes:request.body.likeS + 1
      }
   }, {
      sort: {_id: -1},
      upsert: false
   }).then(result => {
      console.log(result)
      console.log("likes Updated")
      response.json('likes Updated')
   }).catch(error => console.error(error))
})


app.delete('/deleteQuotes', (request, response) => {
   quotesCollection.deleteOne({name: request.body.nameS}).then(result => {
      console.log('Quote Deleted');
      response.json('Quote Deleted')
   }).catch(error => console.error(error))
})

   
app.listen(process.env.PORT || PORT, function(){
   console.log(`Server is running on port ${PORT}`);
})