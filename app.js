const express = require('express');
const cors = require('cors');
const fs = require('fs');
var bodyParser = require('body-parser');
const app = express();

const router = express.Router;

const indexRoutes = require('./routes/index');

const mongoose = require('mongoose');

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.urlencoded({ extended: false }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/', indexRoutes);

app.get('/phone', (req, res) => {
    res.send('311 218 8255');
});

app.get('/address', (req, res) => {
    res.send('Calle 5 No. 9 - 57');
});

app.put('/writeFile', (req, res) => {
    fs.writeFile('./files/' + req.body.name, req.body.data, function(err) {
        if (err) {
            res.send('Error: ' + err);
            return;
        }
        
        res.send('File created successfully');
    });
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Jaiver:PyCtAgLCfz9uXxGR@cluster0-shard-00-00.7eovb.mongodb.net:27017,cluster0-shard-00-01.7eovb.mongodb.net:27017,cluster0-shard-00-02.7eovb.mongodb.net:27017/prueba?ssl=true&replicaSet=atlas-aux9yu-shard-0&authSource=admin&retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('La conexión se ha establecido correctamente.');

    app.listen(PORT, () => {
        console.log(`App listening at http://localhost:${PORT}`)
    });
});