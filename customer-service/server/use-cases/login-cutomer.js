export default function makeLoginCustomer({ backendDb, isValidEmail }) {
    return async function loginCustomer(loginInfo) {
      const { email, password } = loginInfo
  
      if (!email) {
        throw new Error("Customer email is required")
      }
      if (!password) {
        throw new Error("Customer passowrd is required")
      }
      if (!await isValidEmail(email)) {
        throw new Error("Invalid email")
      }
      if (password < 3) {
        throw new Error("Password must be longer than 3 characters.")
      }
      return await backendDb.findByEmail({
        email: email.trim(),
        password: password
      })
    }
  }