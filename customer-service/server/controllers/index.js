import {
  createCustomer,
  loginCustomer,
  listCustomers
} from '../use-cases'

import { setToken, getUserId } from '../misc/utilities.js'

import notFound from './not-found'
import makePostCustomer from './post-customer'
import makePostLogin from './post-login'
import makeGetCustomers from './get-cutomers'

const postCustomer = makePostCustomer({ createCustomer })
const postLogin = makePostLogin({ loginCustomer, setToken })
const getCutomers = makeGetCustomers({ listCustomers, getUserId })

const backendController = Object.freeze({
  notFound,
  postCustomer,
  postLogin,
  getCutomers
})

export default backendController
export {
  notFound,
  postCustomer,
  postLogin,
  getCutomers
}
