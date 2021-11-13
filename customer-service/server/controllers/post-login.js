export default function makePostLogin({ loginCustomer, setToken }) {
    return async function sendResponse(httpRequest) {
        try {
            const { loginInfo } = httpRequest.body;
            const customer = await loginCustomer(loginInfo, httpRequest);
            const token = await setToken(customer);
            
            delete customer['password'];
            delete customer['accessToken'];
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date().toUTCString()
                },
                statusCode: 201,
                body: {
                    customer,
                    token
                }
            }
        } catch (e) {
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}