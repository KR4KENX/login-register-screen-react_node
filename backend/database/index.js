const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sqat1024:XXXXXXX@cluster0.kfseani.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err))