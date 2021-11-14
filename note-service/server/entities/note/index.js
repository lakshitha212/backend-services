import buildMakeNote from './note';
import { isValidEmail, setPassword } from '../../misc/utilities'

const makeNote = buildMakeNote({ });

const noteEntity = Object.freeze({
  makeNote
})

export default noteEntity
export { makeNote }
