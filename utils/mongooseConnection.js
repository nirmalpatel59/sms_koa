const mongoose = require('mongoose')
const config = require('config')
const dbUri = config.mongodb.uri

mongoose.connect(dbUri)

mongoose.connection.on('connected', function () {
  console.log('MongoDB connected')
})

mongoose.connection.on('error', function () {
  console.log('error while connecting to MongoDB')
})

mongoose.connection.on('disconnected', function () {
  console.log('DB disconnected')
})
mongoose.connection.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('DB connection terminated by application')
    process.exit(0)
  })
})
