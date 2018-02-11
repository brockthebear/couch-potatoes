require('dotenv').config();
const express = require("express");
const http = require('http');
const path = require("path");

// express modules.
const bodyParser = require('body-parser');
const compression = require("compression");
const logger = require('morgan');

const app = express();

const globals = require("./globals");

// Must come before render
Object.assign(global, globals);
const render = require("./render");

const port = process.env.DB_PORT || 3000;
app.set('port', port);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(compression());

app.get("/", render);
app.use(express.static(path.resolve(__dirname, "..", "dist")));
app.get("*", render);

http.createServer(app).listen(app.get('port'), () => {
    console.log(`Server started on port: ${port}`);
});
