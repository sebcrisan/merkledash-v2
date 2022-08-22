import {getRoot} from "./getRoot.js";
import {getProjectData} from "./getProjectData.js";

import express from "express";
import cors from "cors";
const app = express();
const PORT = 8080;

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
    addresses = getProjectData(projectName);
    const root = getRoot(addresses);
    console.log(root);
    res.status(200).send({
        "root": root
    })
})