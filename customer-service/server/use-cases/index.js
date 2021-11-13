import backendDb from '../data-access'
import { makeCustomer } from '../entities/customer';
import { callRemoteAPI } from '../misc/interface'
import {
    isValidEmail,
    setToken
} from '../misc/utilities'

import makeCreateCustomer from './create-customer'
import makeLoginCustomer from './login-cutomer'
import makeListCustomers from './list-customers'

const createCustomer = makeCreateCustomer({ backendDb, makeCustomer, setToken })
const loginCustomer = makeLoginCustomer({ backendDb, isValidEmail })
const listCustomers = makeListCustomers({ backendDb })

const backendService = Object.freeze({
    createCustomer,
    loginCustomer,
    listCustomers
})

export default backendService

export {
    createCustomer,
    loginCustomer,
    listCustomers
}