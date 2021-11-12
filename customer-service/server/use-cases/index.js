import backendDb from '../data-access'
import { makeCustomer } from '../entities/customer';
import { callRemoteAPI } from '../misc/interface'

import makeCreateCustomer from './create-customer'

import {
    isValidEmail,
    setToken
} from '../misc/utilities'

const createCustomer = makeCreateCustomer({ backendDb, makeCustomer, setToken })

const backendService = Object.freeze({
    createCustomer
})

export default backendService

export {
    createCustomer
}