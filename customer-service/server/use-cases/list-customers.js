export default function makeListCustomers({ backendDb }) {
    return async function listCustomers() {
        const response = await backendDb.findAll()
        if (response.length == 0) {
            throw new RangeError('Customers Not Found')
        }
        return response;
    }
}