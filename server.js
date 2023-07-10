const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 5001




// Johnexky2332, phAiCEgbAzsFhjfy
let db,
    dbConnectionStr = "mongodb+srv://ShabsCreativeContent01:phAiCEgbAzsFhjfy@cluster0.ehulrnp.mongodb.net/",
    dbName = 'star-wars-quotes'

// MongoClient.connect(dbConnectionSTr)
// .then(client => { 
//    console.log(`Connected to ${dbName} Database`)
//    db = client.db(dbName)
//    // const quotesCollection = db.collection('quotes')
// })
// .catch(error => console.error(error))

// // let db
// // let dbConnectionStr = "mongodb+srv://ShabsCreativeContent01:phAiCEgbAzsFhjfy@cluster0.ehulrnp.mongodb.net/"
// // let dbName = 'star-wars-quotes'

// , { useUnifiedTopology: true }

const client = new MongoClient(dbConnectionStr)

async function connect(){
    try {
        await client.connect();
        db = client.db(dbName)
        console.log("Connected to MongoDB");

        app.listen(process.env.PORT || PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    }
    catch (error) {
        console.error(error);
    }
}

connect();



app.set('view engine', 'ejs')
// res.render(view, locals)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())




// app.get('/', (req, res) => {
//    res.send('<h1>Hello Word</h1>')
// })

app.get('/', (req, res) => {
   // res.sendFile(__dirname + '/index.html')

   db.collection('quotes').find().toArray()
   .then(data => {
      // console.log(data)
      res.render('index.ejs', { quotes: data })
   })
   .catch(error => console.error(error))
})

// app.post('/newQuotes', (req,res) => {
//    // console.log(req.body);
//    db.collection('quotes').insertOne(req.body)
//    .then(result => {
//       console.log('Quotes Added')
//       res.redirect('/')
//    }).catch(error => console.error(error))
// })

   
// app.listen(process.env.PORT || PORT, function(){
//    console.log(`Server is running on port ${PORT}`);
// })