import {
  createCustomer,
  loginCustomer,
  listCustomers,
  listCustomer,
  editCustomer,
  removeCustomer
} from '../use-cases'

import { setToken, getUserId } from '../misc/utilities.js'

import notFound from './not-found'
import makePostCustomer from './post-customer'
import makePostLogin from './post-login'
import makeGetCustomers from './get-cutomers'
import makeGetCustomer from './get-customer'
import makePutCustomer from './put-customer'
import makeDeleteCustomer from './delete-cutomer'

const postCustomer = makePostCustomer({ createCustomer })
const postLogin = makePostLogin({ loginCustomer, setToken })
const getCutomers = makeGetCustomers({ listCustomers, getUserId })
const getCutomer = makeGetCustomer({ listCustomer, getUserId })
const putCutomer = makePutCustomer({ editCustomer, getUserId })
const deleteCutomer = makeDeleteCustomer({ removeCustomer, getUserId })

const backendController = Object.freeze({
  notFound,
  postCustomer,
  postLogin,
  getCutomers,
  getCutomer,
  putCutomer,
  deleteCutomer
})

export default backendController
export {
  notFound,
  postCustomer,
  postLogin,
  getCutomers,
  getCutomer,
  putCutomer,
  deleteCutomer
}
