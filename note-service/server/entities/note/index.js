import buildMakeNote from './customer';
import { isValidEmail, setPassword } from '../../misc/utilities'

const makeNote = buildMakeNote({ });

const noteEntity = Object.freeze({
  makeNote
})

export default noteEntity
export { makeNote }
