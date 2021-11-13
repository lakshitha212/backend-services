export default function makeRemoveCustomer({ backendDb }) {
    return async function removeCustomer({ customerId }) {
        if (!customerId) {
            throw new Error("Customer ID is required!")
        }

        const check = await backendDb.findById({ id: customerId })
        if (!check) {
            throw new RangeError('Customer Not Found');
        }

        return await backendDb.remove({
            id: customerId
        })
    }
}