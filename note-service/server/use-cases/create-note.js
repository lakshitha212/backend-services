export default function makeCreateNote({ backendDb, makeNote, setToken }) {
    return async function createNote(noteInfo) {
      const note = await makeNote(noteInfo)

      const note_response = await backendDb.insert({
        title: note.getTitle(),
        description: note.getDescription(),
        customerId: note.getCustomer(),
        isActive: note.getIsActive()
      })

      return note_response
    }
  }
  