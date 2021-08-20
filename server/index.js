const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema.js')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const bodyParser= require('body-parser')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, './public/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a Image'))
    }
    cb(undefined, true)
  } })

const fs = require('fs')
const path = require('path')
const dir = "public"
const subDirectory = "public/uploads"
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
  fs.mkdirSync(subDirectory)
}
const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const PORT = 3005;

mongoose.connect('mongodb+srv://yevhenii:je1988@cluster0.0jb3p.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false })

app.use(cors())
app.use(express.static("public/uploads"))

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.post('/Upload', upload.single('avatar'), (req, res) => {
  if(req.file) {
    console.log(req.file.path)
  }
})

const dbConnection = mongoose.connection
dbConnection.on('error', err => console.log(`connection error: ${err}`))
dbConnection.once('open', () => console.log('Connected to DB!'))

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
})
