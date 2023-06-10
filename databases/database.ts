require('dotenv').config()

import mongoose from "mongoose"

import chalk from "chalk"

const dbURL = `mongodb+srv://tuv361089:PIH3NDHjTEBeFy2g@cluster0.tp7sqrb.mongodb.net/`
const connected = chalk.bold.cyan
const error = chalk.bold.yellow
const disconnected = chalk.bold.red
const termination = chalk.bold.magenta

export const connectMongoDB = () =>{
  mongoose.connect(dbURL,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })

  mongoose.connection.on("connected", function () {
    console.log(connected("Mongoose default connection is open to MongoDB Atlas"))
  })

  mongoose.connection.on("error", function (err) {
    console.log(
      error("Mongoose default connection has occured " + err + " error")
    )
  })

  mongoose.connection.on("disconnected", function () {
    console.log(disconnected("Mongoose default connection is disconnected"))
  })

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        termination(
          "Mongoose default connection is disconnected due to application termination"
        )
      )
      process.exit(0)
    })
  })
}

export const isValidId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id)
}