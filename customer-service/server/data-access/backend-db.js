import Id from '../Id'
const bcrypt = require('bcryptjs')
const CUSTOMER_COLLECTION = 'customers'
export default function makeBackendDB({ makeDb }) {

  async function insert({ id: _id = Id.makeId(), ...customerInfo }) {
    const db = await makeDb()

    // check customer by email
    const customer_result = await db.collection(CUSTOMER_COLLECTION).find({ email: customerInfo.email, isActive: true })
    const found = await customer_result.toArray()
    if (found.length > 0) {
      throw new Error(`Customer ${customerInfo.email} already exists.`);
    }
    const createdAt = Date.now()
    const result = await db
      .collection(CUSTOMER_COLLECTION)
      .insertOne({ _id, ...customerInfo, createdAt, firstLogin: false })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo }
  }

  async function update({ id: _id, ...customerInfo }) {
    const db = await makeDb()
    const result = await db
      .collection(CUSTOMER_COLLECTION)
      .updateOne({ _id }, { $set: { ...customerInfo, firstLogin: true } })
    return result.modifiedCount > 0 ? { id: _id, ...customerInfo } : null
  }

  async function findByEmail(customer) {
    const db = await makeDb()
    const result = await db.collection(CUSTOMER_COLLECTION).find({ email: customer.email })
    const found = await result.toArray()
    if (found.length === 0) {
      throw new Error(`No such user ${customer.email} found.`);
    }
    const { _id: id, ...insertedInfo } = found[0]

    // password match
    const valid = await bcrypt.compare(customer.password, insertedInfo.password);
    if (!valid) {
      throw new Error('Invalid Password');
    }
    return { id, ...insertedInfo }
  }

  async function findAll({ maximumNumberOfResults = Number.MAX_SAFE_INTEGER } = {}) {
    const db = await makeDb()
    const cursor = await db.collection(CUSTOMER_COLLECTION).find().limit(maximumNumberOfResults)
    const result = await cursor.toArray()
    return result
  }

  return Object.freeze({
    insert,
    update,
    findByEmail,
    findAll
  })
}
