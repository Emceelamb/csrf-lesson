const express = require('express');
const partials = require('express-partials');
const path = require('path');
const app = express();

const csurf = require('csurf');
const cookieParser = require('cookie-parser');

const PORT = 8000

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(partials());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));



const csrfMiddleware = csurf({
  cookie: true
});
app.use(csrfMiddleware);

app.get('/', csrfMiddleware, (req, res) => {
  res.render('index', {csrfToken: req.csrfToken()})

})

app.post('/entry', csrfMiddleware, (req, res) => {
  console.log(`Message received: ${req.body.message}`);
  res.send(`CSRF token used: ${req.body._csrf}, Your favorite candy is: ${req.body.message}`);
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`) );