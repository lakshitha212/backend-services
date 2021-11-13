
export default function makePutCustomer({ editCustomer, getUserId }) {
    return async function sendResponse(httpRequest) {
        try {
            const { source = {}, ...customer } = httpRequest.body
            source.ip = httpRequest.ip
            source.browser = httpRequest.headers['User-Agent']
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }
            if (!httpRequest.headers['Authorization']) {
                throw new Error('Not Authorized!')
            }
            const token = httpRequest.headers['Authorization'].replace('Bearer ', '')
            const loggedInUserId = await getUserId(token)
            const customerId = httpRequest.params.customerId

            const response = await editCustomer({ customerId, ...customer })

            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date().toUTCString() // Use actual modified date of the entity
                },
                statusCode: 201,
                body: { response }
            }
        } catch (e) {
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}