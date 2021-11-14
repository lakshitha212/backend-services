export default function makeEditNote({ backendDb, makeNote }) {
    return async function editNote(payload) {
        if (!payload.noteId) {
            throw new Error('Note Id is required')
        }

        const check = await backendDb.findById({ id: payload.noteId })
        if (!check) {
            throw new RangeError('Note Not Found');
        }

        const noteEntity = await makeNote({
            title: payload.title ? payload.title : 'dummyTitle',
            description: payload.description ? payload.description : 'dummyDescription',
            customerId: payload.customerId ? payload.customerId : 'Dummy Customer'
        })

        const updatednote = await backendDb.update({
            id: payload.noteId,
            ...payload.title ? { title: payload.title } : null,
            ...payload.description ? { description: payload.description } : null,
            ...payload.customerId ? { customerId: payload.customerId } : null,
            ...typeof payload.isActive != "undefined" ? { isActive: payload.isActive } : null
        })
        return updatednote
    }
}
