export default function makeRemoveCustomer({ backendDb }) {
    return async function removeCustomer({ customerId }) {
        if (!customerId) {
            throw new Error("Customer ID is required!")
        }

        return await backendDb.remove({
            id: customerId
        })
    }
}