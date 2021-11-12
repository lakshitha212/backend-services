import Id from '../Id'
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

  return Object.freeze({
    insert,
    update
  })
}
