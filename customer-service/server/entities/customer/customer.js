export default function buildMakeCustomer({ isValidEmail, setPassword }) {
  return async function makeCustomer({
    firstName,
    lastName,
    email,
    password,
    passCode,
    contactNumber,
    isActive
  } = {}) {

    if (email && !await isValidEmail(email)) {
      throw new Error("Invalid email provided")
    }
    if (!password) {
      throw new Error("Customer must have a password")
    }
    if (password.length < 3) {
      throw new Error("Password must be longer than 3 characters.")
    }
    if (!firstName) {
      throw new Error('First name is required')
    }
    if (firstName.length < 2) {
      throw new Error("First name must be longer than 2 characters.")
    }


    const passwordHash = await setPassword(password)

    return Object.freeze({
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getFullName: () => firstName + ' ' + lastName,
      getPassword: () => passwordHash,
      getPassCode: () => passCode,
      getEmail: () => email,
      getIsActive: () => isActive,
      getContactNumber: () => contactNumber
    })
  }
}
