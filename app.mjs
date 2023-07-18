import express from "express";
import log from "@ajar/marker";
import morgan from "morgan";

const { PORT, HOST } = process.env;

// console.log(process.env);

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).send("Hello Express!");
});

app.get("/users", (req, res, next) => {
  res.status(200).send("Get all Users");
});

// '/search?food=burger&town=ashdod'

// - `req.query` -
app.get("/search", (req, res) => {
  log.magenta("query string food: ", req.query.food);
  log.magenta("query string town: ", req.query.town);
  res.status(200).json(req.query);
});

// `req.params`;
app.get("/user/:user_id", (req, res) => {
  res.status(200).send(`<h1>Hello user #${req.params.user_id}</h1>`);
});

// `req.body`
app.post("/shows", (req, res, next) => {
  res
    .status(200)
    .send(`Creating a new show by the name of:${req.body?.showName}.`);
});

// return html markup response
app.get("/hello", (req, res) => {
  let data = "Super";
  const markup = `<h1>Hello Express</h1>
    <p>Nice to work with your library</p>
    <p>Some great values</p>
    <ul>
    <li>Fun</li>
    <li>Amazing</li>
    <li>${data}</li>
    </ul>`;
  res.status(200).set("Content-Type", "text/html").send(markup);
});

// return 404 status with a custom response to unsupported routes
app.use((req, res, next) => {
  res.status(404).send(`- 404 - ${req.url} was not found`);
});

app.listen(PORT, HOST, () => {
  log.magenta(`🌎  listening on`, `http://${HOST}:${PORT}`);
});

//------------------------------------------
//         Express Echo Server
//------------------------------------------
/*
### Challenge instructions

1. Install the `morgan` 3rd party middleware  
use the middleware in your app:  
         `app.use( morgan('dev') );`

2.  Define more routing functions that use
    - `req.query` - access the querystring part of the request url
    - `req.params` - access dynamic parts of the url
    - `req.body` - access the request body of a **POST** request
        
        in each routing function you want to pass some values to the server from the client
        and echo those back in the server response

3. return api json response
4. return html markup response
5. return 404 status with a custom response to unsupported routes


*/
