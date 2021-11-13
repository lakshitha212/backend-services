export default function makeEditCustomer({ backendDb, makeCustomer }) {
    return async function editCustomer(payload) {
        if (!payload.customerId) {
            throw new Error('Customer Id is required')
        }

        const check = await backendDb.findById({ id: payload.customerId })
        if (!check) {
            throw new RangeError('Customer Not Found');
        }

        const customerEntity = await makeCustomer({
            email: 'dummy@email.com',
            password: payload.password ? payload.password : 'dummyPassword',
            firstName: payload.firstName ? payload.firstName : 'Dummy First'
        })

        const updatedUser = await backendDb.update({
            id: payload.customerId,
            ...payload.firstName ? { firstName: payload.firstName } : null,
            ...payload.lastName ? { lastName: payload.lastName } : null,
            ...payload.contactNumber ? { contactNumber: payload.contactNumber } : null,
            ...typeof payload.isActive != "undefined" ? { isActive: payload.isActive } : null,
            ...payload.accessToken ? { accessToken: payload.accessToken } : null,
            ...payload.email ? { email: payload.email } : null,
            ...payload.password ? { password: customerEntity.getPassword() } : null
        })
        return updatedUser
    }
}
