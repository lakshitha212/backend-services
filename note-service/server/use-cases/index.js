import backendDb from '../data-access'
import { makeNote } from '../entities/note';
import { callRemoteAPI } from '../misc/interface'
import {
    isValidEmail,
    setToken
} from '../misc/utilities'

import makeCreateNote from './create-note'
import makeListNotes from './list-notes'
import makeListNote from './list-note'
import makeEditNote from './edit-note'
import makeRemoveNote from './remove-note'

const createNote = makeCreateNote({ backendDb, makeNote })
const listNotes = makeListNotes({ backendDb })
const listNote = makeListNote({ backendDb })
const editNote = makeEditNote({ backendDb, makeNote })
const removeNote = makeRemoveNote({ backendDb })

const backendService = Object.freeze({
    createNote,
    listNotes,
    listNote,
    editNote,
    removeNote
})

export default backendService

export {
    createNote,
    listNotes,
    listNote,
    editNote,
    removeNote
}