import makeBackendDB from './backend-db'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import { Server } from 'mongodb'

dotenv.config()
const MongoClient = mongodb.MongoClient

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_PORT, MONGO_DB, MONGO_HOST } = process.env

const mongoUserName = MONGO_USERNAME || "reservation"
const mongoPassword = MONGO_PASSWORD || "g33xegQqJcGTdRyu"
const mongoPort = MONGO_PORT || 27017
const mongoDb = MONGO_DB || "reservation"
const mongoHost = MONGO_HOST || "18.218.196.254"

const client = new MongoClient(new Server('18.218.196.254', 27017), { useUnifiedTopology: true, useNewUrlParser: true })
export async function makeDb () {
  if (!client.isConnected()) {
    await client.connect()
  }
  return client.db(mongoDb)
}

const backendDb = makeBackendDB({ makeDb })
export default backendDb
