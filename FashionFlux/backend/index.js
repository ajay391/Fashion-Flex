const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;

// console.log(process.env.DB_URL)
// prajay391
// klNMf41Awv0H6n3I

app.use(express.json({limit:"25mb"}));
app.use((express.urlencoded({limit:"25mb"})));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials:true
}))

// all routes

const authRoutes = require('./src/users/user.route');
const productsRoutes = require('./src/products/products.route');
const reviewsRoutes = require('./src/reviews/reviews.router');


app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/reviews', reviewsRoutes);

main().then(()=>console.log("Mongodb is successfully connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

  app.get('/', (req, res) => {
    res.send('Hai AJ')
  })
}



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})