
export default function makePutNote({ editNote, getUserId }) {
    return async function sendResponse(httpRequest) {
        try {
            const { source = {}, ...note } = httpRequest.body
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
            const noteId = httpRequest.params.noteId

            const response = await editNote({ noteId, ...note })

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