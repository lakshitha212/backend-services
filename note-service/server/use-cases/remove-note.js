export default function makeRemoveNote({ backendDb }) {
    return async function removeNote({ noteId }) {
        if (!noteId) {
            throw new Error("Note ID is required!")
        }

        const check = await backendDb.findById({ id: noteId })
        if (!check) {
            throw new RangeError('Note Not Found');
        }

        return await backendDb.remove({
            id: noteId
        })
    }
}