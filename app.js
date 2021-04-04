const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/phone', (req, res) => {
    res.send('311 218 8255');
});
app.get('/address', (req, res) => {
    res.send('Calle 5 No. 9 - 57');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});