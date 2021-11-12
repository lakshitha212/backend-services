export default function makeCreateCustomer({ backendDb, makeCustomer, setToken }) {
    return async function createCustomer(customerInfo) {
      const customer = await makeCustomer(customerInfo)

      const customer_response = await backendDb.insert({
        firstName: customer.getFirstName(),
        lastName: customer.getLastName(),
        email: customer.getEmail(),
        password: customer.getPassword(),
        isActive: customer.getIsActive(),
        contactNumber: customer.getContactNumber()
      })
      const accessToken = await setToken(customer_response)
      const updatedUser = await backendDb.update({
        id: customer_response.id,
        accessToken
      })
      return customer_response
    }
  }
  