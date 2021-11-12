import makeBackendDB from './backend-db'
import mongodb from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()
const MongoClient = mongodb.MongoClient

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_PORT, MONGO_DB, MONGO_HOST } = process.env

const mongoUserName = MONGO_USERNAME || "reservation"
const mongoPassword = MONGO_PASSWORD || "g33xegQqJcGTdRyu"
const mongoPort = MONGO_PORT || 27017
const mongoDb = MONGO_DB || "reservation"
const mongoHost = MONGO_HOST || "18.218.196.254"

const client = new MongoClient(`mongodb://${mongoUserName}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDb}`, { useUnifiedTopology: true, useNewUrlParser: true })

export async function makeDb () {
  if (!client.isConnected()) {
    await client.connect()
  }
  return client.db(mongoDb)
}

const backendDb = makeBackendDB({ makeDb })
export default backendDb
