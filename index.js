/* eslint-disable @typescript-eslint/no-var-requires */
const { App } = require('@tinyhttp/app')

const app = new App()

//do

const multer = require('multer')

const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

app.use((_, res) => {
  /*res.sendFile('./index.html',{ root: process.cwd()}, (err) => console.log(err))*/
  res.sendFile(path.join(__dirname + '/views/index.html'), (err) => console.log(err));
})

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file)
  
})

module.exports = (req, res) => {
  app.handler(req, res)
}
