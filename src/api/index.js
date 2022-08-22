const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const getRoot = require('./getRoot');

app.use(cors());
app.use(express.json());

app.listen(
    PORT,
    () => {
        console.log(`it's alive on http://localhost:${PORT}`);
    }
);

var corsOptions = {
    origin: 'http://127.0.0.1:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.get('/v1/:projectName/root', cors(corsOptions), (req, res) => {
    const {projectName} = req.params;
    let addresses = [
        'a',
        'b',
        'c'
    ]
    const root = getRoot(addresses);
    console.log(root);
    res.status(200).send({
        "root": root
    })
})