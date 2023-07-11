const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 5001



// Set MiddleWare
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
// app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// // Johnexky2332, phAiCEgbAzsFhjfy
let db, quotesCollection ;

MongoClient.connect("mongodb+srv://ShabsCreativeContent01:phAiCEgbAzsFhjfy@cluster0.ehulrnp.mongodb.net/", { useUnifiedTopology: true })
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
   quotesCollection
     .insertOne(request.body)
     .then(result => {
       console.log('New quotes Added')
      response.redirect('/')
     })
     .catch(error => console.error(error))
})

   
app.listen(process.env.PORT || PORT, function(){
   console.log(`Server is running on port ${PORT}`);
})