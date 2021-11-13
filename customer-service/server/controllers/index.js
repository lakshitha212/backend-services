import {
  createCustomer,
  loginCustomer
} from '../use-cases'

import { setToken, getUserId } from '../misc/utilities.js'

import notFound from './not-found'
import makePostCustomer from './post-customer'
import makePostLogin from './post-login'

const postCustomer = makePostCustomer({ createCustomer })
const postLogin = makePostLogin({ loginCustomer, setToken })

const backendController = Object.freeze({
  notFound,
  postCustomer,
  postLogin
})

export default backendController
export {
  notFound,
  postCustomer,
  postLogin
}
