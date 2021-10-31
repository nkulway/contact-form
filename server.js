const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const Sequelize = require('sequelize');
const { User } = require('./models');

const server = express();

server.use('/contacts', express.static(__dirname + '/public'));
// parse the data 
server.use(express.json()) // using a json body parser

server.engine('html', es6Renderer);
server.set('views', 'views');
server.set('view engine', 'html');

server.get('/heartbeat', (req, res) => {
    res.json({
        "is": "working"
    })
});

const { contacts } = require('./routes');
server.get('/', (req, res) => {
    res.render('landing');
});

server.use('/contacts', contacts);


server.listen('8080', () => {
    console.log('The server is running at Port 8080')
})