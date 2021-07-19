const express = require('express');
const partials = require('express-partials');
const path = require('path');
const app = express();

const csurf = require('csurf');
const cookieParser = require('cookie-parser');


const PORT = 4001;

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(partials());

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "/public")));


const csrfMiddleware = csurf({cookie:true});
app.use(csrfMiddleware);

app.get('/', (req, res) => {
  res.render('form', {csrfToken: req.csrfToken()})
})

app.post('/submit', (req, res) => {
  console.log(`Message received: ${req.body.message}, csrfToken=${req.body._csrf}`);
  res.send(`CSRF token used: ${req.body._csrf}, Your favorite candy is: ${req.body.message}`);
});

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403)
    res.json({err: "CSRF ERROR"}) 
  }
})

app.listen(process.env.PORT || PORT, () => console.log(`Listening on http://localhost:${PORT}`) );