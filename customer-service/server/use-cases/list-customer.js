export default function makeListCustomer({ backendDb }) {
    return async function listCustomer({ customerId } = {}) {
      if (!customerId) {
        throw new Error('Customer ID is required')
      }
      const response = await backendDb.findById({ id: customerId })
      if (!response) {
        throw new RangeError('Customer Not Found');
      }
      return response;
    }
  }