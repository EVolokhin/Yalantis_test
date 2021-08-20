const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('../schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
const PORT = 3005;

mongoose.connect('mongodb+srv://yevhenii:je1988@cluster0.0jb3p.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false })

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const dbConnection = mongoose.connection
dbConnection.on('error', err => console.log(`connection error: ${err}`))
dbConnection.once('open', () => console.log('Connected to DB!'))

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
})
