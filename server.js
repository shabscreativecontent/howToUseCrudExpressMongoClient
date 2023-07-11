const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 5001



// Set MiddleWare
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


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


// // Johnexky2332, phAiCEgbAzsFhjfy
// let db,
//     dbConnectionStr = "mongodb+srv://ShabsCreativeContent01:phAiCEgbAzsFhjfy@cluster0.ehulrnp.mongodb.net/",
//     dbName = 'star-wars-quotes'
//     dbCollection = db.collection('quotes')

// // MongoClient.connect(dbConnectionSTr)
// // .then(client => { 
// //    console.log(`Connected to ${dbName} Database`)
// //    db = client.db(dbName)
// //    // const quotesCollection = db.collection('quotes')
// // })
// // .catch(error => console.error(error))

// // // let db
// // // let dbConnectionStr = "mongodb+srv://ShabsCreativeContent01:phAiCEgbAzsFhjfy@cluster0.ehulrnp.mongodb.net/"
// // // let dbName = 'star-wars-quotes'

// // const client = new MongoClient(dbConnectionStr)

// // async function connect(){
// //     try {
// //         await client.connect();
// //         db = client.db(dbName)
// //         console.log("Connected to MongoDB");

// //         app.listen(process.env.PORT || PORT, () => {
// //             console.log(`Server running on port ${PORT}`)
// //         })
// //     }
// //     catch (error) {
// //         console.error(error);
// //     }
// // }

// // connect();


// // Create a MongoClient with a MongoClientOptions object to set the Stable API version

// // const client = new MongoClient(dbConnectionStr, {
// //    serverApi: {
// //        version: ServerApiVersion.v1,
// //        strict: true,
// //        deprecationErrors: true,
// //    }
// // })

// // async function run() {
// //    try {
// //      // Connect the client to the server (optional starting in v4.7)
// //      await client.connect();
// //      // Send a ping to confirm a successful connection
// //      db = await client.db(dbName).command({ ping: 1 });
// //      console.log("Pinged your deployment. You successfully connected to MongoDB!");

// //    //   app.listen(process.env.PORT || PORT, function(){
// //    //    console.log(`Server is running on port ${PORT}`);
// //    // })
// //    } finally {
// //      // Ensures that the client will close when you finish/error
// //      await client.close();
// //    }
// //  }

// //  run().catch(console.dir);


// const connectDB = async 

// // app.get('/', (req, res) => {
// //    res.send('<h1>Hello Word</h1>')
// // })

// app.get('/', (req, res) => {
//    // res.sendFile(__dirname + '/index.html')

//    dbCollection.find().toArray()
//    .then(data => {
//       // console.log(data)
//     res.render('index.ejs', { quotes: data })
//    })
//    .catch(error => console.error(error))
// })

// // app.post('/newQuotes', (req,res) => {
// //    // console.log(req.body);
// //    db.collection('quotes').insertOne(req.body)
// //    .then(result => {
// //       console.log('Quotes Added')
// //       res.redirect('/')
// //    }).catch(error => console.error(error))
// // })

   
app.listen(process.env.PORT || PORT, function(){
   console.log(`Server is running on port ${PORT}`);
})