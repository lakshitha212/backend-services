import {
  createCustomer
} from '../use-cases'

import { setToken, getUserId } from '../misc/utilities.js'

import notFound from './not-found'
import makePostCustomer from './post-customer'

const postCustomer = makePostCustomer({ createCustomer })

const backendController = Object.freeze({
  notFound,
  postCustomer
})

export default backendController
export {
  notFound,
  postCustomer
}
