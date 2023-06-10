import express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import helmet from 'helmet'
import path from 'path'
import { connectMongoDB } from './databases/database'
import { FOLDERS } from './constants/config'
import { result } from 'lodash'
require('dotenv').config()

const app: express.Application = express()
connectMongoDB()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const dirNameWithEnv = isProduction ? path.dirname(__dirname) : __dirname
const handlerImage: any = Object.values(FOLDERS).reduce(
  (result: any, current: any) => {
    return [
      ...result,
      express.static(path.join(dirNameWithEnv, `/${FOLDER_UPLOAD}/${current}`)),
    ]
  },
  [express.static(path.join(dirNameWithEnv, `/${FOLDER_UPLOAD}`))]
)

app.use(`${R}`)
