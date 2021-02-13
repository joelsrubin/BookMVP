const express = require('express');
const app = express()
const port = 3000;

app.get('/books', (req, res) => {
  console.log("hello")
})

app.listen(port, () => {
  `listening on port ${port}`
})