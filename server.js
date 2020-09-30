const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8000;
const Cards = require('./dbCards');
const connection_url = 'mongodb+srv://admin:SangeetaPaul1!@cluster0.lsqla.mongodb.net/tinderdb?retryWrites=true&w=majority';
const Cors = require('cors');
const axios = require('axios');

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(Cors());

app.get('/', function(req, res) {
    res.status(200).send('Hello World!');
});

app.post('/tinder/cards', function(req, res) {
    const dbCard = req.body;
    Cards.create(dbCard, function(err, data) {
        if (err) {
            console.log('Error in uploading data: '+err);
            return;
        }
        res.status(201).send(data);
    });
});

app.get('/tinder/cards', function(req, res) {
    Cards.find(function(err, data) {
        if (err) {
            console.log('Error in retrieving data: '+err);
            return;
        }
        res.status(200).send(data);
    });
});

app.listen(port, function(err) {
    if (err) {
        console.log('Error in running the server: '+err);
        return;
    }
    console.log('Server is running perfectly on port: '+port);
})