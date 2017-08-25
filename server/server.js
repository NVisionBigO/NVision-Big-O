const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')

mongoose.connect('mongodb://Grant05:jbms05@ds023523.mlab.com:23523/myfirstappgrantkang1')

app.use(bodyParser())
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(8080, () => (
  console.info('Express listening on 8080!')
))
