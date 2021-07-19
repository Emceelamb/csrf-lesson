const express = require('express');
const partials = require('express-partials');
const path = require('path');

const app = express();


const PORT = 8000


app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(partials());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));


app.post('/entry', (req, res) => {
  console.log(`Message received: ${req.body.message}`);
  res.send(`Your favorite candy is: ${req.body.message}`);
});


app.get('/', (req, res) => {
  res.render('index')

})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`) );