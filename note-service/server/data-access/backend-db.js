import Id from '../Id'
const bcrypt = require('bcryptjs')
const NOTE_COLLECTION = 'notes'
export default function makeBackendDB({ makeDb }) {

  async function insert({ id: _id = Id.makeId(), ...noteInfo }) {
    const db = await makeDb()
    const createdAt = Date.now()
    const result = await db
      .collection(NOTE_COLLECTION)
      .insertOne({ _id, ...noteInfo, createdAt })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo }
  }

  async function update({ id: _id, ...noteInfo }) {
    const db = await makeDb()
    const result = await db
      .collection(NOTE_COLLECTION)
      .updateOne({ _id }, { $set: { ...noteInfo } })
    return result.modifiedCount > 0 ? { id: _id, ...noteInfo } : null
  }

  async function findAll({ maximumNumberOfResults = Number.MAX_SAFE_INTEGER } = {}) {
    const db = await makeDb()
    const cursor = await db.collection(NOTE_COLLECTION).find().limit(maximumNumberOfResults)
    const result = await cursor.toArray()
    return result
  }

  async function findById({ id: _id }) {
    const db = await makeDb()
    return await db.collection(NOTE_COLLECTION).findOne({ _id })
  }

  async function remove({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection(NOTE_COLLECTION).deleteOne({ _id })
    return result.deletedCount
  }

  return Object.freeze({
    insert,
    update,
    findAll,
    findById,
    remove
  })
}
