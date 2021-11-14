export default function makeListNotes({ backendDb }) {
    return async function listNotes() {
        const response = await backendDb.findAll()
        if (response.length == 0) {
            throw new RangeError('Notes Not Found')
        }
        return response;
    }
}