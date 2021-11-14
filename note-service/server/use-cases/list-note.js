export default function makeListNote({ backendDb }) {
    return async function listNote({ noteId } = {}) {
      if (!noteId) {
        throw new Error('Note ID is required')
      }
      const response = await backendDb.findById({ id: noteId })
      if (!response) {
        throw new RangeError('Note Not Found');
      }
      return response;
    }
  }