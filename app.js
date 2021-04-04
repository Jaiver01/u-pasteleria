const express = require('express');
const cors = require('cors');
const fs = require('fs');
var bodyParser = require('body-parser');
const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});