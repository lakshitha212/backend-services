export default function buildMakeNote({ }) {
  return async function makeCustomer({
    title,
    description,
    customerId,
    isActive
  } = {}) {


    if (!title) {
      throw new Error("Title is required")
    }
    if (title.length < 3) {
      throw new Error("Title must be longer than 3 characters.")
    }
    if (!description) {
      throw new Error('Description is required')
    }
    if (description.length < 2) {
      throw new Error("Description must be longer than 2 characters.")
    }
    if (!customerId) {
      throw new Error('Customer ID is required')
    }

    return Object.freeze({
      getTitle: () => title,
      getDescription: () => description,
      getCustomer: () => customerId,
      getIsActive: () => isActive
    })
  }
}
