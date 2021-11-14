import {
  createNote,
  listNotes,
  listNote,
  editNote,
  removeNote
} from '../use-cases'

import { setToken, getUserId } from '../misc/utilities.js'

import notFound from './not-found'
import makePostNote from './post-note'
import makeGetNotes from './get-notes'
import makeGetNote from './get-note'
import makePutNote from './put-note'
import makeDeleteNote from './delete-note'

const postNote = makePostNote({ createNote, getUserId })
const getNotes = makeGetNotes({ listNotes, getUserId })
const getNote = makeGetNote({ listNote, getUserId })
const putNote = makePutNote({ editNote, getUserId })
const deleteNote = makeDeleteNote({ removeNote, getUserId })

const backendController = Object.freeze({
  notFound,
  postNote,
  getNotes,
  getNote,
  putNote,
  deleteNote
})

export default backendController
export {
  notFound,
  postNote,
  getNotes,
  getNote,
  putNote,
  deleteNote
}
