
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const API_PORT = 3001;
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get("/person/:input", (req, res) => res.json({ val1: 2, val2: 3 }));
router.get("/facility/:param", (req, res) => res.json({ val3: 4, val4: 5 }));
router.get("/exposure/:param", (req, res) => res.json({ val5: 6 }));

app.use("/api", router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));