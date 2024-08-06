const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT  = process.env.PORT;

app.use(express.json());
app.use(cors());

const gameRoutes = require('./routes/games');
app.use('/api/games', gameRoutes);

mongoose
.connect(MONGO_URI)
.then(() =>{
    console.log('App connected to database')
    app.listen(PORT, () => {
        console.log(`Listining to port ${PORT}`)
    })
})
.catch((error) =>{
    console.log(error)
})
