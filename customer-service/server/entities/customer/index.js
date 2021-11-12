import buildMakeCustomer from './customer';
import { isValidEmail, setPassword } from '../../misc/utilities'

const makeCustomer = buildMakeCustomer({ isValidEmail, setPassword });

const customerEntity = Object.freeze({
  makeCustomer
})

export default customerEntity
export { makeCustomer }
